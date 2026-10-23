'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export function AboutContentVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [intent, setIntent] = useState<'auto' | 'play' | 'pause'>('auto');
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(query.matches);
    const updateVisibility = () => setTabActive(!document.hidden);
    updateMotion();
    updateVisibility();
    query.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay = visible && tabActive && (intent === 'play' || (intent === 'auto' && !reducedMotion));
    if (shouldPlay) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [visible, tabActive, reducedMotion, intent]);

  function togglePlayback() {
    setIntent(playing ? 'pause' : 'play');
  }

  function toggleSound() {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  if (!src || !poster) return null;
  return <figure className="about-content-video" ref={frameRef}>
    <video ref={videoRef} src={src} poster={poster} muted={muted} playsInline loop preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Rachael's content creation video" />
    <div className="about-video-controls">
      <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause video' : 'Play video'} aria-pressed={playing}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
      <button type="button" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Mute video'} aria-pressed={!muted}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
    </div>
  </figure>;
}
