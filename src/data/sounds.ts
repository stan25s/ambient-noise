export interface SoundProps {
    name:string,
    soundUrl:string,
    iconUrl:string,
}

export type soundArray = SoundProps[];

const base = import.meta.env.VITE_CLOUDFLARE_BASE_URL

export const rainSound : SoundProps = {
    name : "rain",
    soundUrl : base + "/rain-long-loop.wav",
    iconUrl : "icons/rain.png"
}

export const rain1Sound : SoundProps = {
    name : "tropical rain",
    soundUrl : base + "/tropical-rain.wav",
    iconUrl : "icons/rain.png"
}

export const rain2Sound : SoundProps = {
    name : "rain on a metal roof",
    soundUrl : base + "/rain-metal-roof.wav",
    iconUrl : "icons/rain.png"
}

export const fireplaceSound : SoundProps = {
    name : "crackling fire",
    soundUrl : base + "/fireplace.wav",
    iconUrl : "icons/campfire.png"
}

export const pondSound : SoundProps = {
    name : "pond",
    soundUrl : base + "/pond-ambience.wav",
    iconUrl : "icons/pond-outline.png"
}

export const forestSound : SoundProps = {
    name : "forest",
    soundUrl : base + "/forest-ambience.wav",
    iconUrl : "icons/forest.png"
}

export const whiteNoiseSound : SoundProps = {
    name : "white noise",
    soundUrl : base + "/white-noise.wav",
    iconUrl : "icons/white-noise.png"
}
export const pinkNoiseSound : SoundProps = {
    name : "pink noise",
    soundUrl : base + "/pink-noise.wav",
    iconUrl : "icons/white-noise.png"
}
export const brownNoiseSound : SoundProps = {
    name : "brown noise",
    soundUrl : base + "/brown-noise.wav",
    iconUrl : "icons/white-noise.png"
}

export const thunderSound : SoundProps = {
    name : "thunder",
    soundUrl : base + "/thunder.wav",
    iconUrl : "icons/thunder.png"
}
export const cafeSound : SoundProps = {
    name : "cafe",
    soundUrl : base + "/cafe.wav",
    iconUrl : "icons/coffee_shop.png"
}
// Declare some arrays of sounds to create separate menus:
export const noiseSounds : soundArray = [
    whiteNoiseSound,
    pinkNoiseSound,
    brownNoiseSound
]
export const natureSounds : soundArray = [
    rainSound,
    rain2Sound,
    rainSound,
    pondSound,
    fireplaceSound,
    forestSound,
    thunderSound
]
export const environmentSounds : soundArray = [
    cafeSound
]