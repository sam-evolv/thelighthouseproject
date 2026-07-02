'use client';

import { useEffect } from 'react';
import { initSite } from '@/lib/boot';

/** Boots the imperative page engine (hero scene, wall, sky, overlays) after hydration. */
export default function Boot({ starId = null }) {
  useEffect(() => {
    initSite({ starId });
  }, [starId]);
  return null;
}
