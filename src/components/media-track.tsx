'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { brand } from '@/data/caelum';

// Adjust this single value after reviewing the motion with approved client media.
export const MEDIA_SPEED_PX_PER_SECOND = 30;
const GAP_PX = 14;

export function MediaTrack() {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const cycleWidth = useRef(0);
  const offset = useRef(0);
  const drag = useRef<{ x: number; offset: number } | null>(null);
  const itemCount = Math.max(1, brand.media.length);
  const copies = Math.max(3, Math.ceil(1700 / (itemCount * 250)) + 2);

  function normalise(value: number) {
    const width = cycleWidth.current;
    return width ? ((value % width) + width) % width : 0;
  }

  function paint() {
    if (rail.current) rail.current.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  }

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateMotion(); updateVisibility();
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    if (viewport.current) observer.observe(viewport.current);
    const resize = new ResizeObserver(() => {
      cycleWidth.current = (firstGroup.current?.getBoundingClientRect().width || 0) + GAP_PX;
      offset.current = normalise(offset.current);
      paint();
    });
    if (firstGroup.current) resize.observe(firstGroup.current);
    return () => {
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect(); resize.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView || !tabVisible) return;
    let frame = 0;
    let previous = 0;
    const advance = (time: number) => {
      if (previous && !drag.current && cycleWidth.current) {
        const elapsed = Math.min(time - previous, 1000);
        offset.current = normalise(offset.current + elapsed * MEDIA_SPEED_PX_PER_SECOND / 1000);
        paint();
      }
      previous = time;
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [paused, reducedMotion, inView, tabVisible]);

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLVideoElement) return;
    drag.current = { x: event.clientX, offset: offset.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function updateDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    offset.current = normalise(drag.current.offset + drag.current.x - event.clientX);
    paint();
  }
  function stopDrag() { drag.current = null; }

  function renderTiles(copy: number) {
    return brand.media.map((item, index) => <div className="media-tile" key={`${copy}-${item.src}-${index}`}>
          {item.type === 'image'
            ? <img src={item.src} alt={copy === 0 ? item.alt : ''} style={{objectPosition:item.position}} loading={index > 1 || copy > 0 ? 'lazy' : 'eager'} />
            : <video muted playsInline loop controls={copy === 0} preload="none" poster={item.poster} aria-label={copy === 0 ? item.alt : undefined}><source src={item.src} /></video>}
        </div>);
  }

  return <section className="media-section" aria-label="Editorial imagery">
    <div className="container media-intro"><span className="sr-only">Illustrative photography</span>
      <button type="button" onClick={() => setPaused(value => !value)} disabled={reducedMotion} aria-label={reducedMotion ? 'Automatic motion disabled by your preference' : paused ? 'Play media carousel' : 'Pause media carousel'} aria-pressed={paused}>
        {paused || reducedMotion ? <Play size={17} /> : <Pause size={17} />}<span>{reducedMotion ? 'Motion off' : paused ? 'Play' : 'Pause'}</span>
      </button>
    </div>
    <div className="media-viewport" ref={viewport} onPointerDown={startDrag} onPointerMove={updateDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
      <div className="media-rail" ref={rail}>
        {Array.from({ length: copies }, (_, copy) => <div className="media-group" key={copy} ref={copy === 0 ? firstGroup : undefined} aria-hidden={copy > 0}>{renderTiles(copy)}</div>)}
      </div>
    </div>
  </section>;
}
