import { useRef, useEffect, useCallback, useState } from 'react';
import { getSharedAudioContext } from './sharedAudioContext';

export function useAudioLayer(url: string) {
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isReady, setIsReady] = useState(false);

  // Load and decode the audio file once using the shared audio context:
  useEffect(() => {
    const ctx = getSharedAudioContext();
    const audio = new Audio(url);
    audio.src = url;
    audio.loop = true;
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';

    const sourceNode = ctx.createMediaElementSource(audio);
    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    sourceNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    audioRef.current = audio;
    gainNodeRef.current = gainNode;
    sourceNodeRef.current = sourceNode;

    const handleCanPlay = () => setIsReady(true);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener('canplay',handleCanPlay);
      sourceNode.disconnect();
      gainNode.disconnect();
    };
  }, [url]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    const ctx = getSharedAudioContext();

    // Check audio is ready before proceeding.
    if (!audio) return;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    await audio.play();
    setIsPlaying(true);
    
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = level;
    }
    setVolume(level);
  }, []);

  return { isPlaying, volume, play, stop, setVolume: setVolumeLevel, isReady };
}