export default function Story() {
  return (
    <>
      <section className="story" id="story" data-screen-label="Our story" aria-label="A message from the founder">
        <div className="container">
          <div className="story-inner reveal">
            <div className="story-photo">
              <img src="/assets/founder.jpg" alt="Caoimhe Lynch, founder of The Light House Project" />
            </div>
            <div>
              <p className="section-label">From the founder</p>
              <blockquote>I set up The Light House Project to be a safe space where people can come as they are and feel a sense of belonging, where they feel seen and valued. We want every person to leave feeling uplifted.</blockquote>
              <p className="who"><b>Caoimhe Lynch</b>Founder &amp; CEO · Ballymun</p>
              <p className="mission">The Light House Project was set up in January 2024 to spark a light in people. Through music, writing, volunteering and self-development, we make room for people of all ages to grow, heal and connect.</p>
              <span className="motto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A87B2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Our motto: &ldquo;How can we help?&rdquo;
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
