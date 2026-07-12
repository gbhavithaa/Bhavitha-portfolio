import { playElementSound } from '../utils/playTick.js'

function PhotoSlot({ positionClass, src, alt, sound, overlay }) {
  const playSound = () => playElementSound(sound)

  return (
    <button
      type="button"
      className={`photo-artifact ${positionClass}`}
      aria-label={alt || 'Portfolio artifact'}
      onClick={playSound}
      onPointerEnter={playSound}
    >
      <img src={src} alt={alt || ''} />
      {overlay && (
        <img
          className={`artifact-overlay ${overlay.className || ''}`}
          src={overlay.src}
          alt={overlay.alt || ''}
          aria-hidden={overlay.alt ? undefined : 'true'}
        />
      )}
    </button>
  )
}

export default PhotoSlot
