// Generates a short mechanical "tick" (like a typewriter key) using the
// Web Audio API, so we don't need to ship/host an actual audio file.
// A tiny noise burst gives the percussive "clack", and a short square-wave
// blip gives it a bit of pitch. Both decay in under 60ms.

let ctx

export function playTypewriterTick() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()

    const now = ctx.currentTime

    // --- percussive "clack" (filtered noise burst) ---
    const bufferSize = Math.floor(ctx.sampleRate * 0.03)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.value = 1800

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.3, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.05)

    // --- short tonal blip (the "key" pitch) ---
    const osc = ctx.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(1400, now)
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.04)

    const oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(0.06, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)

    osc.connect(oscGain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.05)
  } catch (e) {
    // Web Audio unavailable (older browser, autoplay policy, etc.) — fail silently
  }
}
