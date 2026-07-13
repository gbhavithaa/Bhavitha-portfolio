import { useEffect, useRef } from 'react'
import './TravelingArtifacts.css'

const artifacts = [
  { id: 'dreams', src: '/images/dreams.png', alt: '' },
  { id: 'paint', src: '/images/Paint.png', alt: '' },
  { id: 'cone', src: '/images/VLC Icon.png', alt: '' },
]

function TravelingArtifacts({ mode }) {
  const itemRefs = useRef({})

  useEffect(() => {
    let frame

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const updateArtifacts = () => {
      frame = undefined
      const isDesktop = window.matchMedia('(min-width: 841px)').matches
      const aboutSection = document.querySelector('.about')
      if (!aboutSection) return

      // Shared trigger for all three artifacts, based on the About section
      // itself scrolling into view — NOT on each artifact's own target
      // position. Individual targets can sit anywhere inside a tall About
      // section (top: 20%, bottom: 9%, whatever); tying opacity to that
      // meant targets positioned low down (like cone's "bottom: 9%") could
      // never scroll high enough into the trigger zone before the page ran
      // out, leaving them permanently semi-transparent. This way, "when do
      // they land" and "where do they land" are decoupled.
      const aboutRect = aboutSection.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.9 - aboutRect.top) / (window.innerHeight * 0.66)),
      )

      artifacts.forEach(({ id }) => {
        const item = itemRefs.current[id]
        const source = document.querySelector(`[data-artifact-source="${id}"]`)
        const target = document.querySelector(`[data-artifact-target="${id}"]`)

        // Reduced motion, mobile, or missing elements: no traveling clone,
        // and the real hero image stays at full opacity (its own CSS
        // handles chaos/clean positioning as normal).
        if (!item || !source || !target || !isDesktop || reduceMotion) {
          if (item) item.style.opacity = '0'
          if (source) source.style.opacity = ''
          return
        }

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
