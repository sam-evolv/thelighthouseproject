export default function ShareOverlay() {
  return (
    <>
      <div className="share-ov" id="shareOv" role="dialog" aria-modal="true" aria-label="Your gift of light">
        <div className="share-motes" id="shareMotes" aria-hidden="true"></div>
        <button className="share-close" id="shareClose" type="button" aria-label="Close">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>
        <p className="share-head" id="shareHead">Your gift is lit. Now send it.</p>
        <div className="share-card" id="shareCard">
          <div className="sc-aura" aria-hidden="true"></div>
          <div className="sc-stars" id="shareStars" aria-hidden="true"></div>
          <div className="sc-frame" aria-hidden="true"></div>
          <div className="sc-rays" aria-hidden="true"></div>
          <div className="sc-hero" aria-hidden="true"><i></i></div>
          <div className="sc-top" aria-hidden="true"><span>The Wall of Light · Ballymun</span><b id="shareNo">Star No. 413</b></div>
          <div className="sc-sheen" aria-hidden="true"></div>
          <div className="sc-body">
            <p className="sc-eye" id="shareEye">This star is named</p>
            <p className="sc-to" id="shareTo"><b>Mam</b></p>
            <p className="sc-line" id="shareLine">&ldquo;Keep shining.&rdquo;</p>
            <p className="sc-by" id="shareBy">Named by Anne · forever</p>
            <div className="sc-map" id="shareMap" aria-hidden="true">
              <span className="mapbox" id="shareMapBox"><span className="you" id="shareMapYou"></span><span className="ring" id="shareMapRing"></span></span>
              <span className="maptxt"><b id="shareMapTitle">In the Ballymun sky</b><span>Visit it any time. It will be lit.</span></span>
            </div>
            <div className="sc-seal">
              <span className="sc-rule"></span>
              <svg viewBox="0 0 26 30" aria-hidden="true">
                <path d="M9 28 L11 9 L15 9 L17 28 Z" fill="#F0B95F"></path>
                <rect x="10.2" y="4.6" width="5.6" height="4" rx="1" fill="#FFE3A3"></rect>
                <path d="M9.6 4.6 L13 1.4 L16.4 4.6 Z" fill="#F0B95F"></path>
                <path d="M7 6.5 L3 5" stroke="#F0B95F" strokeWidth="1.4" strokeLinecap="round"></path>
                <path d="M19 6.5 L23 5" stroke="#F0B95F" strokeWidth="1.4" strokeLinecap="round"></path>
              </svg>
              <span className="sc-rule"></span>
            </div>
            <p className="sc-mark">The Light House Project · The Wall of Light, Ballymun</p>
          </div>
        </div>
        <button className="preview-arrival" type="button" id="previewArrival">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="2.6"></circle></svg>
          Preview what they&rsquo;ll see
        </button>
        <div className="share-actions">
          <a className="sa wa" id="saWa" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.6-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.1.2-.3.3-.1.6.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z"></path></svg>
            WhatsApp
          </a>
          <a className="sa" id="saEmail">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E9EEF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>
            Email
          </a>
          <a className="sa" id="saFb" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="#E9EEF5"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"></path></svg>
            Facebook
          </a>
          <button className="sa" type="button" id="saCopy">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E9EEF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9Z"></path><path d="M5 15a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2"></path></svg>
            Copy gift link
          </button>
          <button className="sa" type="button" id="saDownload">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E9EEF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 4 5-4"></path><path d="M5 21h14"></path></svg>
            Save image
          </button>
          <button className="sa" type="button" id="saNative" hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="#E9EEF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"></path></svg>
            Share
          </button>
          <a className="sa" id="saX" target="_blank" rel="noopener" hidden>
            <svg viewBox="0 0 24 24" fill="#E9EEF5"><path d="M18.2 3h3.3l-7.2 8.2L22.8 21h-6.6l-5.2-6.8L4.9 21H1.6l7.7-8.8L1.2 3h6.8l4.7 6.2Zm-1.2 16h1.8L7.1 4.8H5.2Z"></path></svg>
            X
          </a>
        </div>
      </div>
    </>
  );
}
