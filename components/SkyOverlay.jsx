export default function SkyOverlay() {
  return (
    <>
      <div className="sky-ov" id="skyOv" role="dialog" aria-modal="true" aria-label="The Wall of Light">
        <div className="sky-bar">
          <div className="ttl">
            <b>The Wall of Light</b>
            <span><b id="skyCount">412</b> named stars · every one burns forever</span>
          </div>
          <div className="sky-search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
            <input id="skySearch" type="search" placeholder="Search a name or message..." aria-label="Search the wall of light" />
          </div>
          <button className="sky-close" id="skyClose" type="button" aria-label="Close the wall of light">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>
          </button>
        </div>
        <div className="sky-stage" id="skyStage">
          <div className="sky-title" id="skyTitle" aria-hidden="true"><b>The Ballymun sky</b><span>Every light here is somebody&rsquo;s someone</span></div>
          <div className="sky-canvas" id="skyCanvas">
            <div className="sky-bgstars" id="skyBg"></div>
          </div>
          <div className="sky-card" id="skyCard" role="status">
            <p className="sc-tier" id="skyCardTier"></p>
            <p className="sc-msg" id="skyCardMsg"></p>
            <div className="sc-meta">
              <div className="sc-who" id="skyCardWho"></div>
              <div className="sc-date" id="skyCardDate"></div>
            </div>
            <div className="sc-place" id="skyCardPlace"></div>
            <p className="sc-note" id="skyCardNote" hidden></p>
            <button className="sc-share" id="skyCardShare" type="button">
              <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"></path></svg>
              Share this light
            </button>
          </div>
          <div className="zoom-ctl">
            <button type="button" id="zoomIn" aria-label="Zoom in"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg></button>
            <button type="button" id="zoomOut" aria-label="Zoom out"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path></svg></button>
            <button type="button" id="zoomReset" aria-label="Reset view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"></path></svg></button>
          </div>
          <div className="delivery-banner" id="deliveryBanner" aria-live="polite">
            <span className="db-eye">A gift for you</span>
            <span className="db-name" id="dbName">Mam</span>
            <span className="db-msg" id="dbMsg"></span>
            <span className="db-by" id="dbBy"></span>
          </div>
        </div>
        <div className="sky-foot">
          <span className="forever">
            <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path><path d="M9 19h6M10 22h4"></path></svg>
            Every light here burns forever
          </span>
          <span className="sky-hintdrag">Drag to move · scroll or pinch to zoom · tap a star to read it</span>
          <button className="pill-btn" type="button" id="skyDrift" title="Let the sky choose a light for you">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"></circle><path d="M14.8 9.2l-1.6 4-4 1.6 1.6-4Z"></path></svg>
            Drift
          </button>
          <button className="btn btn-primary btn-sm" type="button" id="skyLight">Light your own<span className="arr">→</span></button>
        </div>
      </div>
    </>
  );
}
