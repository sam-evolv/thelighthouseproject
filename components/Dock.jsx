export default function Dock() {
  return (
    <>
      <div className="share-toast" id="shareToast" role="status"></div>

      <a className="dock" id="dock" href="#wall" aria-label="Light a light for Ballymun, from 5 euro">
        <span className="lamp-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path></svg>
        </span>
        <span className="dock-txt">
          <b>Light a light</b>
          <span><b id="dockCount">412</b> lit · from &euro;5</span>
        </span>
        <span className="dock-cta" aria-hidden="true">→</span>
      </a>
    </>
  );
}
