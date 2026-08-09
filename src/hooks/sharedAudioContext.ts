let sharedAudioContext: AudioContext | null = null;

export function getSharedAudioContext() {
  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContext();
  }
  return sharedAudioContext;
}
