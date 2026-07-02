export default function Nav() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top">
            <img className="brand-mark" src="/assets/logo-mark.png" alt="" />
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
        </div>
      </header>
    </>
  );
}
