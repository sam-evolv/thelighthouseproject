export default function Wall() {
  return (
    <>
      <section className="wall" id="wall" data-screen-label="Wall of Light" aria-label="The Wall of Light">
        <div className="container">
          <div className="wall-head">
            <div className="reveal">
              <p className="section-label">The Wall of Light</p>
              <h2>Light a star that shines forever.</h2>
              <p className="sub">Name one for someone you love and leave a message of hope. Every star gets its own number and its own place in the Ballymun sky, and it never goes out. From &euro;5.</p>
            </div>
            <div className="count-pill reveal" id="countPill"><span className="flame"></span><span><b id="lightCount">412</b> lights burning forever</span></div>
          </div>

          <div className="lights-field reveal" id="lightsField" role="button" tabIndex="0" aria-label="Open the full Wall of Light to explore every star">
            <div className="msg-card msg-a">
              <p>&ldquo;For my nana, who loved to sing.&rdquo;</p>
              <span>MARY · POPPINTREE</span>
            </div>
            <div className="anchor an-a"></div>
            <div className="msg-card msg-b">
              <p>&ldquo;Keep shining, Ballymun.&rdquo;</p>
              <span>DECLAN · SANTRY</span>
            </div>
            <div className="anchor an-b"></div>
            <span className="field-hint"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>Tap to explore the whole sky</span>
          </div>

          <div className="recent-rail reveal" id="recentRail" aria-label="Recently lit"><span className="lbl">Just lit</span></div>

          <div className="tiers reveal" id="tiers" role="radiogroup" aria-label="Choose how you would like to give">
            <button className="tier" type="button" data-tier="spark" data-amt="5" role="radio" aria-checked="false">
              <span className="tier-top"><span className="tier-star spark" aria-hidden="true"></span><span className="tier-amt">&euro;5</span></span>
              <span className="tier-name">Spark</span>
              <span className="tier-desc">A real star on the Wall, named, numbered and lit forever.</span>
            </button>
            <button className="tier on" type="button" data-tier="star" data-amt="15" role="radio" aria-checked="true">
              <span className="tier-badge">Most loved</span>
              <span className="tier-top"><span className="tier-star star" aria-hidden="true"></span><span className="tier-amt">&euro;15</span></span>
              <span className="tier-name">Guiding Star</span>
              <span className="tier-desc">Their name on a brighter star, with a gift note to send and a page to visit.</span>
            </button>
            <button className="tier" type="button" data-tier="beacon" data-amt="50" role="radio" aria-checked="false">
              <span className="tier-top"><span className="tier-star beacon" aria-hidden="true"></span><span className="tier-amt">&euro;50</span></span>
              <span className="tier-name">Beacon</span>
              <span className="tier-desc">Among the brightest lights in the sky, with a keepsake certificate to save.</span>
            </button>
            <button className="tier tier-premium" type="button" data-tier="constellation" data-amt="150" role="radio" aria-checked="false">
              <span className="tier-badge gold">Most special</span>
              <span className="tier-top"><span className="tier-star constellation" aria-hidden="true"></span><span className="tier-amt">&euro;150</span></span>
              <span className="tier-name">Constellation</span>
              <span className="tier-desc">A named family of linked stars, one for each person, glowing together forever.</span>
            </button>
          </div>

          <div className="receive-row reveal" aria-label="What every star includes">
            <span className="rlbl">Every star comes with</span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M12 3.5l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6-5-2.9-5 2.9 1.2-5.6L4 9.3l5.6-.6Z"></path></svg><span><b>A name and number</b> in the registry of the sky</span></span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M21.5 3.5 10.2 14.8M21.5 3.5l-7.2 18-3-7.7-7.8-3.1Z"></path></svg><span><b>A note</b> to send to whoever it shines for</span></span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M12 21s-6.5-5.2-6.5-10a6.5 6.5 0 0 1 13 0c0 4.8-6.5 10-6.5 10Z"></path><circle cx="12" cy="10.6" r="2.3"></circle></svg><span><b>A place in the sky</b> you can visit any time</span></span>
          </div>

          <div className="gift reveal" id="giftForm">
            <div className="gift-intent" id="giftIntent" role="radiogroup" aria-label="Who is this star for">
              <button className="gi on" type="button" data-intent="gift" role="radio" aria-checked="true">A gift for someone</button>
              <button className="gi" type="button" data-intent="self" role="radio" aria-checked="false">For myself, or in memory</button>
            </div>
            <div className="gift-fields">
              <label className="fld" id="fldRecipient"><span className="fld-lbl" id="recipientLbl">Who is it for? The star takes their name.</span>
                <input id="recipientInput" maxLength="40" placeholder="e.g. Mam, or Granny May" />
              </label>
              <div className="fld" id="fldMembers" hidden>
                <span className="fld-lbl">Add the people in your constellation</span>
                <div className="members" id="members"></div>
                <button type="button" className="add-member" id="addMember"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>Add a name</button>
              </div>
              <label className="fld"><span className="fld-lbl">Your message</span>
                <input id="msgInput" maxLength="80" placeholder="A line of hope, love or memory" />
              </label>
              <label className="fld"><span className="fld-lbl">From</span>
                <input id="whoInput" maxLength="30" placeholder="Your name" />
              </label>
            </div>
            <button className="btn btn-primary btn-lg" type="button" id="toCheckout">Continue · <span id="lightAmt">&euro;15</span><span className="arr">→</span></button>
          </div>

          <div className="wall-cta reveal">
            <button className="btn-night" type="button" id="exploreBtn"><span className="stars-ico" aria-hidden="true"><i></i><i></i><i></i></span>Explore the wall of light</button>
            <span className="forever-tag"><svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path><path d="M9 19h6M10 22h4"></path></svg>Once lit, your star never goes out</span>
          </div>

          <p className="wall-note reveal">Working preview: name a star and watch it ignite in the sky, then send the note to whoever it shines for. On the live site every star is saved forever and gently reviewed, and every cent goes to programmes in Ballymun.</p>

          <div className="faq reveal" id="faq">
            <p className="faq-lbl">Good to know</p>
            <details>
              <summary>Is my star really forever?</summary>
              <p>Yes. Once a star is lit it is never taken down. Its name, number, message and place in the sky stay on the Wall for as long as the project shines. On the date it was lit, it flares brighter for the whole night, every year.</p>
            </details>
            <details>
              <summary>Where does the money go?</summary>
              <p>Every cent funds our free programmes in Ballymun: the choirs and ballad groups, the writing clubs, Be The Light and the rest. Nothing is spent on the wall itself.</p>
            </details>
            <details>
              <summary>Can I change or re-dedicate it later?</summary>
              <p>Yes. Message us any time and we will rename or re-dedicate your star. Its light never goes out.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
