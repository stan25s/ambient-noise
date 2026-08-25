import { useRef, useEffect, useCallback, useState } from 'react';
import { getSharedAudioContext } from './sharedAudioContext';

type AudioLayerInstance = {
  audio: HTMLAudioElement;
  sourceNode: MediaElementAudioSourceNode;
  gainNode: GainNode;
  owners: Set<symbol>;
  isPlaying: boolean;
  volume: number;
};

const audioLayerRegistry = new Map<string, AudioLayerInstance>();

function getOrCreateAudioLayer(url: string, initialVolume: number): AudioLayerInstance {
  const existing = audioLayerRegistry.get(url);
  if (existing) {
    existing.gainNode.gain.value = initialVolume;
    return existing;
  }

  const ctx = getSharedAudioContext();
  const audio = new Audio(url);
  audio.src = url;
  audio.loop = true;
  audio.preload = 'metadata';
  audio.crossOrigin = 'anonymous';

  const sourceNode = ctx.createMediaElementSource(audio);
  const gainNode = ctx.createGain();
  gainNode.gain.value = initialVolume;
  sourceNode.connect(gainNode);
  gainNode.connect(ctx.destination);

  const instance: AudioLayerInstance = {
    audio,
    sourceNode,
    gainNode,
    owners: new Set(),
    isPlaying: false,
    volume: initialVolume,
  };

  audioLayerRegistry.set(url, instance);
  return instance;
}

export function useAudioLayer(url: string) {
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ownerIdRef = useRef(Symbol('audio-owner'));
  const layerRef = useRef<AudioLayerInstance | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const layer = getOrCreateAudioLayer(url, volume);
    layerRef.current = layer;
    layer.owners.add(ownerIdRef.current);
    audioRef.current = layer.audio;
    gainNodeRef.current = layer.gainNode;

    const handleCanPlay = () => setIsReady(true);
    layer.audio.addEventListener('canplay', handleCanPlay);

    if (layer.audio.readyState >= 2) {
      setIsReady(true);
    }

    return () => {
      layer.audio.removeEventListener('canplay', handleCanPlay);
      layer.owners.delete(ownerIdRef.current);

      // Do not destroy the actual Audio node here.
      // Reordering a card should not stop playback for the same sound.
      // The audio layer remains alive until the app is truly torn down.
    };
  }, [url]);

  const play = useCallback(async () => {
    const layer = layerRef.current;
    const ctx = getSharedAudioContext();

    if (!layer) return;

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    await layer.audio.play();
    layer.isPlaying = true;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;

    layer.audio.pause();
    layer.isPlaying = false;
    setIsPlaying(false);
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    const layer = layerRef.current;
    if (layer) {
      layer.gainNode.gain.value = level;
      layer.volume = level;
    }
    setVolume(level);
  }, []);

  return { isPlaying, volume, play, stop, setVolume: setVolumeLevel, isReady };
}