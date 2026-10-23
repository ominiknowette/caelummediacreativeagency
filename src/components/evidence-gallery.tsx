'use client';

import { useRef, useState } from 'react';
import { Expand, X } from 'lucide-react';

type EvidenceImage = { src: string; alt: string };

export function EvidenceGallery({ images }: { images: EvidenceImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);

  function open(index: number) {
    setActive(index);
    dialog.current?.showModal();
  }

  return <>
    <div className="evidence-gallery">
      {images.map((image, index) => <button className="evidence-trigger" type="button" key={image.src} onClick={() => open(index)} aria-label={`Enlarge evidence image ${index + 1} of ${images.length}`}>
        <img src={image.src} alt={image.alt} loading={index ? 'lazy' : 'eager'} />
        <span><Expand size={17} aria-hidden="true" /> Enlarge image</span>
      </button>)}
    </div>
    <dialog className="evidence-dialog" ref={dialog} aria-label="Analytics evidence image" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="evidence-dialog-inner">
        <button type="button" className="evidence-close" onClick={() => dialog.current?.close()} aria-label="Close image"><X size={22} aria-hidden="true" /></button>
        <img src={images[active].src} alt={images[active].alt} />
        {images.length > 1 && <div className="evidence-dialog-switcher" aria-label="Evidence images">{images.map((image, index) => <button type="button" key={image.src} onClick={() => setActive(index)} aria-current={active === index ? 'true' : undefined}>Image {index + 1}</button>)}</div>}
      </div>
    </dialog>
  </>;
}
