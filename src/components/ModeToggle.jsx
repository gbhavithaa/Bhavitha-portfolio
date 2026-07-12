import { playElementSound } from '../utils/playTick.js'
import './ModeToggle.css'

const MODES = [
  { id: 'chaos', label: 'Chaos', icon: '☕' },
  { id: 'clean', label: 'Clean', icon: '🧹' },
]

/**
 * Two tactile buttons that rearrange the photo collage between
 * "chaos" (scattered and rotated) and "clean" (aligned and level).
 * Plays a short typewriter-key tick on change.
 */
function ModeToggle({ mode, setMode }) {
  const choose = (next) => {
    if (next === mode) return
    playElementSound(`mode-${next}`)
    setMode(next)
  }

  return (
    <div className="mode-toggle" role="group" aria-label="Arrange photos">
      {MODES.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          className={mode === id ? 'mode-button active' : 'mode-button'}
          aria-pressed={mode === id}
          onClick={() => choose(id)}
        >
          <span className="mode-icon" aria-hidden="true">
            {icon}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

export default ModeToggle
