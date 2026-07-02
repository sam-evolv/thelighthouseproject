export default function Footer() {
  return (
    <>
      <footer data-screen-label="Footer">
        <div className="container">
          <div className="foot-grid">
            <div>
              <a className="brand" href="#top">
                <img className="brand-mark" src="/assets/logo-mark.png" alt="" />
                <span className="brand-name">The Light House Project</span>
              </a>
              <p className="about">A community organisation in Ballymun, sparking a light in people through music, writing, volunteering and self-development.</p>
            </div>
            <div>
              <h4>Programmes</h4>
              <ul>
                <li><a href="#programmes">Music</a></li>
                <li><a href="#programmes">Creative writing</a></li>
                <li><a href="#programmes">Self development</a></li>
                <li><a href="#programmes">Faith &amp; retreats</a></li>
                <li><a href="#programmes">Be The Light</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <a className="wa" href="https://wa.me/353870669858" target="_blank" rel="noopener">WhatsApp · 087 066 9858</a>
              <ul>
                <li><a href="mailto:lighthouseprojectballymun@gmail.com">lighthouseprojectballymun@gmail.com</a></li>
                <li className="social-row">
                  <a href="https://www.instagram.com/lighthouseprojectballymun/" target="_blank" rel="noopener" aria-label="Instagram" title="@lighthouseprojectballymun"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"></rect><circle cx="12" cy="12" r="3.8"></circle><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"></circle></svg></a>
                  <a href="https://www.facebook.com/lighthouseprojectballymun" target="_blank" rel="noopener" aria-label="Facebook" title="@lighthouseprojectballymun"><svg viewBox="0 0 24 24"><path d="M15.5 4.5h-2.2a3.3 3.3 0 0 0-3.3 3.3V10H7.5v3H10v6.5h3V13h2.4l.6-3H13V8.1a1 1 0 0 1 1-1h1.5Z"></path></svg></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <p>The Lighthouse Project Foundation CLG · Ballymun, Dublin</p>
            <div className="foot-links">
              <a href="#story">Child Safeguarding Statement</a>
              <a href="https://www.thelighthouseprojectfoundation.com/_files/ugd/7775c5_8a5fa639eaac49ae9d70c592738f7fbf.pdf" target="_blank" rel="noopener">Strategic Plan 2025-2029</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
