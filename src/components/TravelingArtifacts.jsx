import { useEffect, useRef } from 'react'
import './TravelingArtifacts.css'

const artifacts = [
  { id: 'dreams', src: '/images/dreams.png', section: '.about', alt: '' },
  { id: 'paint', src: '/images/Paint.png', section: '.about', alt: '' },
  { id: 'cone', src: '/images/VLC Icon.png', section: '.about', alt: '' },
  // The folder has three visible rest stops before it opens at Tech Stack.
  {
    id: 'folder',
    src: '/images/folder.png',
    section: '.tech-stack',
    stops: [
      '[data-artifact-stop="folder-about"]',
      '[data-artifact-stop="folder-work"]',
      '[data-artifact-target="folder"]',
    ],
    alt: '',
  },
]

function TravelingArtifacts({ mode }) {
  const itemRefs = useRef({})

  useEffect(() => {
    let frame

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateArtifacts = () => {
      frame = undefined
      const isDesktop = window.matchMedia('(min-width: 841px)').matches
      artifacts.forEach(({ id, start, section, stops }) => {
        const item = itemRefs.current[id]
        const source = document.querySelector(`[data-artifact-source="${id}"]`)
        const target = document.querySelector(`[data-artifact-target="${id}"]`)
        const destination = document.querySelector(section)
        const stopElements = stops?.map((selector) => document.querySelector(selector))

        // Reduced motion, mobile, or missing elements: no traveling clone,
        // and the real hero image stays at full opacity (its own CSS
        // handles chaos/clean positioning as normal).
        if (!item || !source || !target || !destination || (stops && stopElements.some((stop) => !stop)) || !isDesktop || reduceMotion) {
          if (item) item.style.opacity = '0'
          if (source) source.style.opacity = ''
          return
        }

        const destinationRect = destination.getBoundingClientRect()

        if (stops) {
          const sourceRect = source.getBoundingClientRect()
          const stopRects = stopElements.map((stop) => stop.getBoundingClientRect())
          const sectionSelectors = ['.about', '.work', '.tech-stack']
          const milestones = sectionSelectors.map((selector) => document.querySelector(selector))
          const scrollY = window.scrollY
          const startPoints = milestones.map((milestone) => milestone.getBoundingClientRect().top + scrollY - window.innerHeight * 0.9)
          const endPoints = milestones.map((milestone) => milestone.getBoundingClientRect().top + scrollY - window.innerHeight * 0.15)
          const aspectRatio = item.naturalWidth && item.naturalHeight
            ? item.naturalHeight / item.naturalWidth
            : sourceRect.height / sourceRect.width
          const rotations = [
            Number(source.dataset.artifactRotation || 0),
            ...stopElements.map((stop) => Number(stop.dataset.artifactRotation || 0)),
          ]
          let fromRect = sourceRect
          let toRect = stopRects[0]
          let fromRotation = rotations[0]
          let toRotation = rotations[1]
          let travelProgress = 0
          let opacity = 0

          for (let index = 0; index < stopRects.length; index += 1) {
            if (scrollY < startPoints[index]) break

            fromRect = index === 0 ? sourceRect : stopRects[index - 1]
            toRect = stopRects[index]
            fromRotation = rotations[index]
            toRotation = rotations[index + 1]
            travelProgress = Math.min(1, Math.max(0, (scrollY - startPoints[index]) / (endPoints[index] - startPoints[index])))
            opacity = 1

            if (scrollY <= endPoints[index]) break
            travelProgress = 1
          }

          // Once the folder reaches its final stop, fade out the travelling
          // copy so the opened folder in Tech Stack can take over.
          if (scrollY > endPoints[2]) {
            opacity = Math.max(0, 1 - (scrollY - endPoints[2]) / 120)
          }

          const fromWidth = fromRect.width || sourceRect.width
          const toWidth = toRect.width || sourceRect.width
          const width = fromWidth + (toWidth - fromWidth) * travelProgress
          const height = width * aspectRatio
          const left = fromRect.left + (toRect.left - fromRect.left) * travelProgress
          const top = fromRect.top + (toRect.top - fromRect.top) * travelProgress
          const rotation = fromRotation + (toRotation - fromRotation) * travelProgress

          Object.assign(item.style, {
            opacity: String(opacity),
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${left}px, ${top}px) rotate(${rotation}deg)`,
          })
          source.style.opacity = scrollY < endPoints[0] ? String(1 - travelProgress) : '0'
          return
        }

        const startSection = start && document.querySelector(start)
        const progress = startSection
          ? (() => {
              const scrollY = window.scrollY
              const startY = startSection.getBoundingClientRect().top + scrollY - window.innerHeight * 0.9
              const endY = destinationRect.top + scrollY - window.innerHeight * 0.25
              return Math.min(1, Math.max(0, (scrollY - startY) / (endY - startY)))
            })()
          : Math.min(
              1,
              Math.max(0, (window.innerHeight * 0.9 - destinationRect.top) / (window.innerHeight * 0.66)),
            )

        const sourceRect = source.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        // The target is an empty placeholder <span> with only a "width" set
        // in CSS — it has no content, so its real rendered height is 0.
        // Interpolating straight from targetRect.height would shrink the
        // image to nothing by the time it lands. Instead, keep the image's
        // true aspect ratio and only ever interpolate width; height follows
        // from that ratio, at both the source end and the target end.
        const aspectRatio = item.naturalWidth && item.naturalHeight
          ? item.naturalHeight / item.naturalWidth
          : sourceRect.height / sourceRect.width

        const targetWidth = targetRect.width || sourceRect.width
        const targetHeight = targetWidth * aspectRatio

        const left = sourceRect.left + (targetRect.left - sourceRect.left) * progress
        const top = sourceRect.top + (targetRect.top - sourceRect.top) * progress
        const width = sourceRect.width + (targetWidth - sourceRect.width) * progress
        const height = sourceRect.height + (targetHeight - sourceRect.height) * progress
        const rotation = Number(source.dataset.artifactRotation || 0) * (1 - progress) +
          Number(target.dataset.artifactRotation || 0) * progress

        Object.assign(item.style, {
          opacity: String(progress),
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${left}px, ${top}px) rotate(${rotation}deg)`,
        })

        // The real hero image fades out exactly as the clone fades in, so
        // there's a continuous handoff instead of the image just vanishing.
        source.style.opacity = String(1 - progress)
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateArtifacts)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [mode])

  return (
    <div className="traveling-artifacts" aria-hidden="true">
      {artifacts.map(({ id, src, alt }) => (
        <img
          key={id}
          ref={(element) => {
            itemRefs.current[id] = element
          }}
          className="traveling-artifact"
          src={src}
          alt={alt}
        />
      ))}
    </div>
  )
}

export default TravelingArtifacts
