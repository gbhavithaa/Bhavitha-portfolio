/**
 * A single scattered photo in the hero collage.
 *
 * To use your own image, pass a `src` (and `alt`) prop — see the
 * `slots` array in Hero.jsx. Leave `src` empty to keep showing the
 * dashed placeholder while you're still gathering images.
 *
 * `positionClass` controls the size/rotation/placement and is defined
 * in Hero.css (.slot-1, .slot-2, ...). `tape` adds a washi-tape strip
 * across the top corner.
 */
function PhotoSlot({ positionClass, tab, tape, src, alt }) {
  return (
    <div className={`photo-slot ${positionClass}`}>
      {tape && <div className="tape-piece" />}
      <div className="frame">
        {src ? <img src={src} alt={alt || ''} /> : <span>+ photo</span>}
      </div>
      <div className="tab">{tab}</div>
    </div>
  )
}

export default PhotoSlot
