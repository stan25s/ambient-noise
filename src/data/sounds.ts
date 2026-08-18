export interface SoundProps {
    name:string, //must be unique!
    soundUrl:string,
    iconUrl:string,
    categories:number[]
}

export type soundArray = SoundProps[];

const base = import.meta.env.VITE_CLOUDFLARE_BASE_URL


export interface categoryProps {
    name:string,
    id:number,
    active:boolean
}

export type categoryArray = categoryProps[];

export const allCategories : categoryArray = [
    {
        id:0,
        name:"nature",
        active:false
    },
    {
        id:1,
        name:"noise",
        active:false
    },
    {
        id:2,
        name:"ambience",
        active:false
    },
    {
        id:3,
        name:"rain",
        active:false
    }
]


const rainSound : SoundProps = {
    name : "rain",
    soundUrl : base + "/rain-long-loop.wav",
    iconUrl : "icons/rain.png",
    categories : [0, 3]
}
const rain1Sound : SoundProps = {
    name : "tropical rain",
    soundUrl : base + "/tropical-rain.wav",
    iconUrl : "icons/rain.png",
    categories : [0, 3]
}
const rain2Sound : SoundProps = {
    name : "rain on a metal roof",
    soundUrl : base + "/rain-metal-roof.wav",
    iconUrl : "icons/rain.png",
    categories : [0, 3]
}
const fireplaceSound : SoundProps = {
    name : "crackling fire",
    soundUrl : base + "/fireplace.wav",
    iconUrl : "icons/campfire.png",
    categories : [0]
}
const pondSound : SoundProps = {
    name : "pond",
    soundUrl : base + "/pond-ambience.wav",
    iconUrl : "icons/pond-outline.png",
    categories : [0]
}
const forestSound : SoundProps = {
    name : "forest",
    soundUrl : base + "/forest-ambience.wav",
    iconUrl : "icons/forest.png",
    categories : [0]
}
const thunderSound : SoundProps = {
    name : "thunder",
    soundUrl : base + "/thunder.wav",
    iconUrl : "icons/thunder.png",
    categories : [0]
}
const oceanSound : SoundProps = {
    name : "ocean",
    soundUrl : base + "/sea-waves.wav",
    iconUrl : "icons/waves.png",
    categories : [0]
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
    categories : [1]
}
const pinkNoiseSound : SoundProps = {
    name : "pink noise",
    soundUrl : base + "/pink-noise.wav",
    iconUrl : "icons/white-noise.png",
    categories : [1]
}
const brownNoiseSound : SoundProps = {
    name : "brown noise",
    soundUrl : base + "/brown-noise.wav",
    iconUrl : "icons/white-noise.png",
    categories : [1]
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
    categories : [2]
}
// combine into a group
export const environmentSounds : soundArray = [
    cafeSound
]

export const allSounds : soundArray = natureSounds.concat(noiseSounds,environmentSounds);