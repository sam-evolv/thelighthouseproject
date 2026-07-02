export default function Voices() {
  return (
    <>
      <section className="log" data-screen-label="Voices" aria-label="What people tell us">
        <div className="container">
          <div className="log-head reveal">
            <div>
              <p className="section-label">Voices from the project</p>
              <h2>What people tell us.</h2>
            </div>
            <a href="https://www.instagram.com/lighthouseprojectballymun/" target="_blank" rel="noopener">More on Instagram →</a>
          </div>
          <div className="log-grid">
            <article className="entry reveal">
              <div className="meta-line">
                <svg viewBox="0 0 24 24"><path d="M9 18.5V5.8l10-2v12.2"></path><circle cx="6.6" cy="18.5" r="2.6"></circle><circle cx="16.6" cy="16" r="2.6"></circle></svg>
                Adult Ballad Group
              </div>
              <h3>&ldquo;The sense of togetherness through music is both motivating and encouraging.&rdquo;</h3>
              <p>A member of our adult ballad singing group, on the weekly sessions and performing at community events.</p>
            </article>
            <article className="entry reveal">
              <div className="meta-line">
                <svg viewBox="0 0 24 24"><path d="M12 20.5s-7-4.8-9.2-9A5.2 5.2 0 0 1 12 6.4a5.2 5.2 0 0 1 9.2 5.1c-2.2 4.2-9.2 9-9.2 9Z"></path></svg>
                A parent
              </div>
              <h3>&ldquo;I see The Light House Project bringing her out of her shell. She wouldn&rsquo;t miss it for the world.&rdquo;</h3>
              <p>A parent, on what the weekly sessions have done for their daughter&rsquo;s self esteem.</p>
            </article>
            <article className="entry reveal">
              <div className="meta-line">
                <svg viewBox="0 0 24 24"><path d="M5 19 16.5 7.5a2.3 2.3 0 0 1 3.2 3.2L8.2 22.2 4 23l.8-4.2Z" transform="translate(0 -2.4)"></path><path d="m14.6 9.4 3.2 3.2" transform="translate(0 -2.4)"></path></svg>
                Journaling Circle
              </div>
              <h3>&ldquo;It has really helped me find a piece of myself again and has boosted my confidence.&rdquo;</h3>
              <p>A member of our adults journaling group, who found new friends along the way.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
