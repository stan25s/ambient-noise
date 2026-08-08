import { useRef, useEffect, useCallback, useState } from 'react';

export function useAudioLayer(url: string) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isBufferLoaded, setIsBufferLoaded] = useState(false);

  // Load and decode the audio file once:
  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    fetch(url)
        .then((res) => res.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((decoded) => {
            bufferRef.current = decoded;
            setIsBufferLoaded(true);
        });

    return () => {
        sourceRef.current?.stop();
        ctx.close();
    };
  }, [url]);

  const play = useCallback(() => {
    const ctx = audioCtxRef.current;
    const buffer = bufferRef.current;
    const gainNode = gainNodeRef.current;
    
    // Only proceed if all dependencies are ready
    if (!ctx || !buffer || !gainNode) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gainNode);
    source.start();

    sourceRef.current = source;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    sourceRef.current?.stop();
    sourceRef.current = null;
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = level;
    }
    setVolume(level);
  }, []);

  return { isPlaying, volume, play, stop, setVolume: setVolumeLevel, isBufferLoaded };
}