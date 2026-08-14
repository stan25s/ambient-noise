export interface SoundProps {
    name:string,
    soundUrl:string,
    iconUrl:string,
}

export type soundArray = SoundProps[];

const base = import.meta.env.VITE_CLOUDFLARE_BASE_URL

const rainSound : SoundProps = {
    name : "rain",
    soundUrl : base + "/rain-long-loop.wav",
    iconUrl : "icons/rain.png"
}
const rain1Sound : SoundProps = {
    name : "tropical rain",
    soundUrl : base + "/tropical-rain.wav",
    iconUrl : "icons/rain.png"
}
const rain2Sound : SoundProps = {
    name : "rain on a metal roof",
    soundUrl : base + "/rain-metal-roof.wav",
    iconUrl : "icons/rain.png"
}
const fireplaceSound : SoundProps = {
    name : "crackling fire",
    soundUrl : base + "/fireplace.wav",
    iconUrl : "icons/campfire.png"
}
const pondSound : SoundProps = {
    name : "pond",
    soundUrl : base + "/pond-ambience.wav",
    iconUrl : "icons/pond-outline.png"
}
const forestSound : SoundProps = {
    name : "forest",
    soundUrl : base + "/forest-ambience.wav",
    iconUrl : "icons/forest.png"
}
const thunderSound : SoundProps = {
    name : "thunder",
    soundUrl : base + "/thunder.wav",
    iconUrl : "icons/thunder.png"
}
const oceanSound : SoundProps = {
    name : "ocean",
    soundUrl : base + "/sea-waves.wav",
    iconUrl : "icons/waves.png"
}

// combine into a group
export const natureSounds : soundArray = [
    rainSound,
    rain1Sound,
    rain2Sound,
    pondSound,
    fireplaceSound,
    forestSound,
    thunderSound,
    oceanSound
]

const whiteNoiseSound : SoundProps = {
    name : "white noise",
    soundUrl : base + "/white-noise.wav",
    iconUrl : "icons/white-noise.png"
}
const pinkNoiseSound : SoundProps = {
    name : "pink noise",
    soundUrl : base + "/pink-noise.wav",
    iconUrl : "icons/white-noise.png"
}
const brownNoiseSound : SoundProps = {
    name : "brown noise",
    soundUrl : base + "/brown-noise.wav",
    iconUrl : "icons/white-noise.png"
}
// combine into a group
export const noiseSounds : soundArray = [
    whiteNoiseSound,
    pinkNoiseSound,
    brownNoiseSound
]

const cafeSound : SoundProps = {
    name : "cafe",
    soundUrl : base + "/cafe.wav",
    iconUrl : "icons/coffee_shop.png"
}
// combine into a group
export const environmentSounds : soundArray = [
    cafeSound
]