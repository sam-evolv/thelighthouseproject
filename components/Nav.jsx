export default function Nav() {
  return (
    <>
      <a className="skip-link" href="#mainContent">Skip to content</a>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <img decoding="async" width={320} height={434} className="brand-mark" src="/assets/logo-mark.webp" alt="" />
            <span className="brand-name">The Light House Project</span>
          </a>
          <ul className="nav-links">
            <li><a href="#programmes">What we do</a></li>
            <li><a href="#story">Our story</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#gallery">Community</a></li>
            <li><a href="#wall">The Wall of Light</a></li>
          </ul>
          <a className="btn btn-primary btn-sm" href="#wall">Light a star<span className="arr">→</span></a>
          <button className="menu-toggle" type="button" id="menuToggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span></button>
        </div>
        <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" hidden>
          <a href="#wall">The Wall of Light</a><a href="#programmes">What we do</a><a href="#story">Our story</a><a href="#team">Meet the team</a><a href="#gallery">Our community</a>
        </nav>
      </header>
    </>
  );
}
