export default function Programmes() {
  return (
    <>
      <section className="programmes" id="programmes" data-screen-label="What we do" aria-label="What we do">
        <div className="container">
          <div className="prog-head reveal">
            <p className="section-label">What we do</p>
            <h2>Five projects. One mission: spark a light in people.</h2>
            <p className="sub">Weekly programmes for children, teens, adults and families, free or as close to free as we can make them.</p>
          </div>

          <div className="rows">
            <div className="row reveal">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M9 18.5V5.8l10-2v12.2"></path><circle cx="6.6" cy="18.5" r="2.6"></circle><circle cx="16.6" cy="16" r="2.6"></circle></svg></div>
              <div>
                <h3>The Music Project</h3>
                <p>Four choirs and ballad groups meet every week, from the Children&rsquo;s Choir to the Adult Ballad Group, performing across the community.</p>
              </div>
              <span className="meta">Weekly · All ages</span>
            </div>

            <div className="row reveal">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M5 19 16.5 7.5a2.3 2.3 0 0 1 3.2 3.2L8.2 22.2 4 23l.8-4.2Z" transform="translate(0 -2.4)"></path><path d="m14.6 9.4 3.2 3.2" transform="translate(0 -2.4)"></path></svg></div>
              <div>
                <h3>The Creative Writing Project</h3>
                <p>A Teens Poetry Club publishing a real book of poems, plus journaling circles for young people and adults.</p>
              </div>
              <span className="meta">Weekly · Teens &amp; adults</span>
            </div>

            <div className="row reveal">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M12 21v-8"></path><path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z"></path><path d="M12 10C12 7 9.5 4.5 6.5 4.5 6.5 7.5 9 10 12 10Z"></path><path d="M5 21h14"></path></svg></div>
              <div>
                <h3>The Self Development Project</h3>
                <p>Psychologist-led workshops on self-compassion, resilience and wellbeing for teens and adults.</p>
              </div>
              <span className="meta">Through the year</span>
            </div>

            <div className="row reveal">
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M12 20.5a5 5 0 0 1-5-5c0-2.4 1.4-3.7 2.4-5.4.6-1 1-2.2 1-3.6 2.2 1.2 3.4 3 3.2 5.2 1-.4 1.6-1.1 1.9-2.1 1 1.4 1.5 2.9 1.5 4.4a5 5 0 0 1-5 5Z"></path></svg></div>
              <div>
                <h3>The Faith Project</h3>
                <p>Retreats, a monthly prayer group, and two pilgrimages each year, including Medjugorje.</p>
              </div>
              <span className="meta">Monthly · 2 pilgrimages</span>
            </div>

            <div className="row reveal">
              <div className="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.4"></circle><circle cx="5.4" cy="11.2" r="2.6"></circle><circle cx="18.6" cy="11.2" r="2.6"></circle><path d="M12 13.4c-3 0-5.2 1.7-5.8 4.3M12 13.4c3 0 5.2 1.7 5.8 4.3"></path><path d="M2.6 17.7c.4-1.8 1.5-3 3.1-3.6M21.4 17.7c-.4-1.8-1.5-3-3.1-3.6"></path></svg></div>
              <div>
                <h3>The Community Project</h3>
                <p>Showing up for local events, supporting local organisations, and building the bonds that bring Ballymun closer.</p>
              </div>
              <span className="meta">All year round</span>
            </div>
          </div>

          <div className="feature reveal">
            <div>
              <p className="section-label">Be The Light · Volunteering</p>
              <h3>12 weeks. 12 leadership lessons. 12 acts of service.</h3>
              <p>Our flagship programme for teens, finishing with a graduation where every young person presents the difference they made. They leave as young leaders for Ballymun.</p>
              <a className="btn btn-primary btn-lg" href="https://wa.me/353870669858" target="_blank" rel="noopener">Volunteer with us<span className="arr">→</span></a>
            </div>
            <div className="photo-slot"><img src="/assets/community-3.jpg" alt="Young people at a Light House Project celebration" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
