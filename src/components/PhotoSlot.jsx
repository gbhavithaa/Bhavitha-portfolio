import { playElementSound } from '../utils/playTick.js'

function PhotoSlot({ positionClass, src, alt, sound, overlay, travelId }) {
  const playSound = () => playElementSound(sound)

  return (
    <button
      type="button"
      className={`photo-artifact ${positionClass} ${travelId ? 'travel-source' : ''}`}
      aria-label={alt || 'Portfolio artifact'}
      data-artifact-source={travelId}
      data-artifact-rotation={positionClass === 'slot-1' ? -8 : positionClass === 'slot-3' ? -5 : 10}
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
