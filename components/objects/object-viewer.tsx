"use client";

import Image from "next/image";
import { useState } from "react";

export function ObjectViewer({ image, name }: { image: string; name: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`object-viewer ${isExpanded ? "object-viewer--expanded" : ""}`}>
      <button
        aria-label={isZoomed ? `Zoom out ${name}` : `Zoom in ${name}`}
        className={`object-viewer__media ${isZoomed ? "object-viewer__media--zoomed" : ""}`}
        onClick={() => setIsZoomed((zoomed) => !zoomed)}
        type="button"
      >
        <Image alt={`${name}, inspected at high resolution`} fill priority sizes="(max-width: 768px) 100vw, 65vw" src={image} />
      </button>
      <button className="object-viewer__expand" onClick={() => setIsExpanded((expanded) => !expanded)} type="button">
        {isExpanded ? "Exit full screen" : "Full screen inspection"}
      </button>
    </div>
  );
}
