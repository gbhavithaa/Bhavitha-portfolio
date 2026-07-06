import { playTypewriterTick } from '../utils/playTick.js'
import './ModeToggle.css'

/**
 * Two-state pill switch that rearranges the photo collage between
 * "chaos" (scattered, rotated, pinned) and "clean" (aligned, no
 * rotation, tape removed). Plays a short typewriter-key tick on change.
 */
function ModeToggle({ mode, setMode }) {
  const choose = (next) => {
    if (next === mode) return
    playTypewriterTick()
    setMode(next)
  }

  return (
    <div className="mode-toggle" role="group" aria-label="Arrange photos">
      <button
        type="button"
        className={mode === 'chaos' ? 'active' : ''}
        aria-pressed={mode === 'chaos'}
        onClick={() => choose('chaos')}
      >
        Chaos
      </button>
      <button
        type="button"
        className={mode === 'clean' ? 'active' : ''}
        aria-pressed={mode === 'clean'}
        onClick={() => choose('clean')}
      >
        Clean
      </button>
    </div>
  )
}

export default ModeToggle
