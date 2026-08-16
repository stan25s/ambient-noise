export interface SoundProps {
    name:string, //must be unique!
    soundUrl:string,
    iconUrl:string,
    category:number
}

export type soundArray = SoundProps[];

const base = import.meta.env.VITE_CLOUDFLARE_BASE_URL

// categories:
const nature = 0;
const noise = 1;
const environments = 2;

const rainSound : SoundProps = {
    name : "rain",
    soundUrl : base + "/rain-long-loop.wav",
    iconUrl : "icons/rain.png",
    category : nature
}
const rain1Sound : SoundProps = {
    name : "tropical rain",
    soundUrl : base + "/tropical-rain.wav",
    iconUrl : "icons/rain.png",
    category : nature
}
const rain2Sound : SoundProps = {
    name : "rain on a metal roof",
    soundUrl : base + "/rain-metal-roof.wav",
    iconUrl : "icons/rain.png",
    category : nature
}
const fireplaceSound : SoundProps = {
    name : "crackling fire",
    soundUrl : base + "/fireplace.wav",
    iconUrl : "icons/campfire.png",
    category : nature
}
const pondSound : SoundProps = {
    name : "pond",
    soundUrl : base + "/pond-ambience.wav",
    iconUrl : "icons/pond-outline.png",
    category : nature
}
const forestSound : SoundProps = {
    name : "forest",
    soundUrl : base + "/forest-ambience.wav",
    iconUrl : "icons/forest.png",
    category : nature
}
const thunderSound : SoundProps = {
    name : "thunder",
    soundUrl : base + "/thunder.wav",
    iconUrl : "icons/thunder.png",
    category : nature
}
const oceanSound : SoundProps = {
    name : "ocean",
    soundUrl : base + "/sea-waves.wav",
    iconUrl : "icons/waves.png",
    category : nature
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
    iconUrl : "icons/white-noise.png",
    category : noise
}
const pinkNoiseSound : SoundProps = {
    name : "pink noise",
    soundUrl : base + "/pink-noise.wav",
    iconUrl : "icons/white-noise.png",
    category : noise
}
const brownNoiseSound : SoundProps = {
    name : "brown noise",
    soundUrl : base + "/brown-noise.wav",
    iconUrl : "icons/white-noise.png",
    category : noise
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
    iconUrl : "icons/coffee_shop.png",
    category : environments
}
// combine into a group
export const environmentSounds : soundArray = [
    cafeSound
]

export const allSounds : soundArray = natureSounds.concat(noiseSounds,environmentSounds);