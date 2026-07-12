// Generates a short mechanical "tick" (like a typewriter key) using the
// Web Audio API, so we don't need to ship/host an actual audio file.
// A tiny noise burst gives the percussive "clack", and a short square-wave
// blip gives it a bit of pitch. Both decay in under 60ms.

let ctx

function getAudioContext() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function playTone(audio, { type = 'sine', start = 440, end = start, gain = 0.08, duration = 0.12, delay = 0 }) {
  const now = audio.currentTime + delay
  const osc = audio.createOscillator()
  const amp = audio.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(start, now)
  if (end !== start) osc.frequency.exponentialRampToValueAtTime(end, now + duration)

  amp.gain.setValueAtTime(0.001, now)
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.012)
  amp.gain.exponentialRampToValueAtTime(0.001, now + duration)

  osc.connect(amp).connect(audio.destination)
  osc.start(now)
  osc.stop(now + duration + 0.02)
}

function playNoise(audio, { filter = 'bandpass', frequency = 900, gain = 0.12, duration = 0.08, delay = 0 }) {
  const now = audio.currentTime + delay
  const bufferSize = Math.floor(audio.sampleRate * duration)
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }

  const source = audio.createBufferSource()
  const tone = audio.createBiquadFilter()
  const amp = audio.createGain()

  source.buffer = buffer
  tone.type = filter
  tone.frequency.value = frequency
  amp.gain.setValueAtTime(gain, now)
  amp.gain.exponentialRampToValueAtTime(0.001, now + duration)

  source.connect(tone).connect(amp).connect(audio.destination)
  source.start(now)
  source.stop(now + duration)
}

export function playTypewriterTick() {
  try {
    const audio = getAudioContext()
    const now = audio.currentTime

    // --- percussive "clack" (filtered noise burst) ---
    const bufferSize = Math.floor(audio.sampleRate * 0.03)
    const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = audio.createBufferSource()
    noise.buffer = buffer

    const noiseFilter = audio.createBiquadFilter()
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.value = 1800

    const noiseGain = audio.createGain()
    noiseGain.gain.setValueAtTime(0.3, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    noise.connect(noiseFilter).connect(noiseGain).connect(audio.destination)
    noise.start(now)
    noise.stop(now + 0.05)

    // --- short tonal blip (the "key" pitch) ---
    const osc = audio.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(1400, now)
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.04)

    const oscGain = audio.createGain()
    oscGain.gain.setValueAtTime(0.06, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)

    osc.connect(oscGain).connect(audio.destination)
    osc.start(now)
    osc.stop(now + 0.05)
  } catch (e) {
    // Web Audio unavailable (older browser, autoplay policy, etc.) — fail silently
  }
}

export function playElementSound(sound) {
  try {
    const audio = getAudioContext()

    switch (sound) {
      case 'dreams':
        playTone(audio, { type: 'triangle', start: 660, end: 990, gain: 0.055, duration: 0.16 })
        playTone(audio, { type: 'triangle', start: 990, end: 1320, gain: 0.04, duration: 0.14, delay: 0.07 })
        break
      case 'book':
        playNoise(audio, { filter: 'highpass', frequency: 1200, gain: 0.08, duration: 0.11 })
        playTone(audio, { type: 'sine', start: 220, end: 180, gain: 0.025, duration: 0.1 })
        playNoise(audio, { filter: 'lowpass', frequency: 420, gain: 0.035, duration: 0.1, delay: 0.04 })
        break
      case 'paint':
        playTone(audio, { type: 'sine', start: 587, end: 587, gain: 0.045, duration: 0.18 })
        playTone(audio, { type: 'triangle', start: 740, end: 740, gain: 0.038, duration: 0.18, delay: 0.035 })
        playTone(audio, { type: 'sine', start: 988, end: 880, gain: 0.032, duration: 0.16, delay: 0.08 })
        break
      case 'folder':
        playTone(audio, { type: 'sine', start: 260, end: 380, gain: 0.06, duration: 0.1 })
        playNoise(audio, { filter: 'lowpass', frequency: 500, gain: 0.055, duration: 0.07, delay: 0.03 })
        break
      case 'page':
        playNoise(audio, { filter: 'bandpass', frequency: 1900, gain: 0.075, duration: 0.13 })
        break
      case 'vlc':
        playTone(audio, { type: 'sawtooth', start: 330, end: 660, gain: 0.04, duration: 0.11 })
        playTone(audio, { type: 'sine', start: 880, end: 880, gain: 0.035, duration: 0.08, delay: 0.08 })
        break
      case 'cursor':
        playNoise(audio, { filter: 'highpass', frequency: 3200, gain: 0.075, duration: 0.018 })
        playTone(audio, { type: 'square', start: 1450, end: 1180, gain: 0.028, duration: 0.026 })
        break
      case 'mode-chaos':
        playNoise(audio, { filter: 'highpass', frequency: 2400, gain: 0.08, duration: 0.045 })
        playTone(audio, { type: 'triangle', start: 880, end: 660, gain: 0.04, duration: 0.08 })
        break
      case 'mode-clean':
        playNoise(audio, { filter: 'bandpass', frequency: 1500, gain: 0.07, duration: 0.13 })
        playTone(audio, { type: 'sine', start: 520, end: 760, gain: 0.035, duration: 0.12, delay: 0.03 })
        break
      default:
        playTypewriterTick()
    }
  } catch (e) {
    // Web Audio unavailable — keep the UI quiet instead of breaking interaction.
  }
}
