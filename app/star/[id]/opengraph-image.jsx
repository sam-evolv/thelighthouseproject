import { ImageResponse } from 'next/og';
import { getStarById, starName, regionPhrase } from '@/lib/registry';

export const alt = 'A star on the Wall of Light, Ballymun';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Deed-style link preview: dark sky, gold hairline frame, the star with its
// cross-flare, the name it carries and its registry number.
export default async function OgImage({ params }) {
  const { id } = await params;
  const star = getStarById(id);
  const nm = star ? starName(star) : null;
  const no = star ? star.no : '—';
  const msg = star ? (star.msg.length > 90 ? star.msg.slice(0, 90) + '…' : star.msg) : 'A light for you on the Wall of Light.';
  const region = star ? regionPhrase(star) : 'the Ballymun sky';
  const by = star ? `Named by ${star.name}` : 'The Light House Project';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(180deg, #182842 0%, #0A1320 45%, #070E19 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1.5px solid rgba(240,185,95,.4)',
            borderRadius: 18,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 34,
            border: '1px solid rgba(240,185,95,.16)',
            borderRadius: 14,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 90,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 420,
              height: 420,
              borderRadius: 420,
              backgroundImage:
                'radial-gradient(circle, rgba(255,247,220,1) 0%, rgba(255,227,163,.5) 14%, rgba(240,185,95,.16) 42%, rgba(240,185,95,0) 68%)',
              display: 'flex',
            }}
          />
        </div>
        <div style={{ display: 'flex', color: 'rgba(159,176,198,.9)', fontSize: 20, letterSpacing: 10, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          The Wall of Light · Ballymun
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 18,
            padding: '8px 26px',
            border: '1.4px solid rgba(240,185,95,.5)',
            borderRadius: 99,
            color: '#FFE3A3',
            fontSize: 22,
            letterSpacing: 6,
            fontFamily: 'sans-serif',
          }}
        >
          STAR No. {no}
        </div>
        <div style={{ display: 'flex', marginTop: 34, color: '#F0B95F', fontSize: 20, letterSpacing: 8, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          {nm ? 'This star is named' : 'A light on the wall'}
        </div>
        {nm ? (
          <div style={{ display: 'flex', marginTop: 8, color: '#FBF3E2', fontSize: 84, fontStyle: 'italic' }}>{nm}</div>
        ) : null}
        <div style={{ display: 'flex', marginTop: 14, color: '#E4DAC6', fontSize: 34, fontStyle: 'italic', maxWidth: 900, textAlign: 'center' }}>
          “{msg}”
        </div>
        <div style={{ display: 'flex', marginTop: 26, color: '#9FB0C6', fontSize: 22, fontFamily: 'sans-serif' }}>
          {by} · in {region} · it burns forever
        </div>
      </div>
    ),
    { ...size }
  );
}
