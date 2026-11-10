export default function Wall() {
  return (
    <>
      <section className="wall" id="wall" data-screen-label="Wall of Light" aria-label="The Wall of Light">
        <div className="container">
          <div className="wall-head">
            <div className="reveal">
              <p className="section-label">The Wall of Light</p>
              <h2>A whole sky of <em>someone special.</em></h2>
              <p className="sub">For the person who brings you home. For the one you miss. For someone who needs to know they matter. There&rsquo;s a light here for them.</p>
            </div>
            <div className="count-pill reveal" id="countPill"><span className="flame"></span><span>Explore our preview sky</span></div>
          </div>

          <div className="lights-field reveal" id="lightsField" role="button" tabIndex="0" aria-label="Open the full Wall of Light to explore every star">
            <svg className="teaser-constellation" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M110 160 270 85 425 190 500 155 650 240 765 110 905 180M500 155 570 340 720 385 840 305" /><circle cx="270" cy="85" r="2"/><circle cx="425" cy="190" r="3"/><circle cx="650" cy="240" r="2"/><circle cx="765" cy="110" r="3"/><circle cx="570" cy="340" r="2"/><circle cx="840" cy="305" r="2"/></svg>
            <div className="field-centre" aria-hidden="true"><span className="celestial-star"><i></i></span><span className="field-eyebrow">Every light is a love story</span><p>Some love deserves<br />a place in the <em>sky.</em></p></div>
            <div className="msg-card msg-a">
              <p>&ldquo;For my nana, who loved to sing.&rdquo;</p>
              <span>AN EXAMPLE DEDICATION</span>
            </div>
            <div className="anchor an-a"></div>
            <div className="msg-card msg-b">
              <p>&ldquo;Keep shining, Ballymun.&rdquo;</p>
              <span>A LITTLE HOPE FOR HOME</span>
            </div>
            <div className="anchor an-b"></div>
            <span className="field-hint"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>Tap to explore the whole sky</span>
          </div>

          <div className="recent-rail reveal" id="recentRail" aria-label="Example dedications"><span className="lbl">Words of light</span></div>

          <div className="giving-intro reveal"><div><p className="section-label">Make it personal</p><h3>One small gesture.<br /><em>So much meaning.</em></h3></div><p>Choose their light, write what&rsquo;s in your heart, and send them a moment they&rsquo;ll want to keep. When donations open, each star will help our community programmes shine.</p></div>

          <div className="tiers reveal" id="tiers" role="radiogroup" aria-label="Choose how you would like to give">
            <button className="tier" type="button" data-tier="spark" data-amt="5" role="radio" aria-checked="false">
              <span className="tier-top"><span className="tier-star spark" aria-hidden="true"></span><span className="tier-amt">&euro;5</span></span>
              <span className="tier-name">Spark</span>
              <span className="tier-desc">A small point of light. A beautiful way to say &ldquo;you matter&rdquo;.</span>
            </button>
            <button className="tier on" type="button" data-tier="star" data-amt="15" role="radio" aria-checked="true">
              <span className="tier-badge">A little extra glow</span>
              <span className="tier-top"><span className="tier-star star" aria-hidden="true"></span><span className="tier-amt">&euro;15</span></span>
              <span className="tier-name">Guiding Star</span>
              <span className="tier-desc">For the person who helps you find your way. A brighter star, just for them.</span>
            </button>
            <button className="tier" type="button" data-tier="beacon" data-amt="50" role="radio" aria-checked="false">
              <span className="tier-top"><span className="tier-star beacon" aria-hidden="true"></span><span className="tier-amt">&euro;50</span></span>
              <span className="tier-name">Beacon</span>
              <span className="tier-desc">An extraordinary glow for someone who makes all the difference.</span>
            </button>
            <button className="tier tier-premium" type="button" data-tier="constellation" data-amt="150" role="radio" aria-checked="false">
              <span className="tier-badge gold">Your people, together</span>
              <span className="tier-top"><span className="tier-star constellation" aria-hidden="true"></span><span className="tier-amt">&euro;150</span></span>
              <span className="tier-name">Constellation</span>
              <span className="tier-desc">Your favourite people, connected. Up to eight named stars in one constellation.</span>
            </button>
          </div>

          <div className="receive-row reveal" aria-label="What every star includes">
            <span className="rlbl">Every star comes with</span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M12 3.5l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6-5-2.9-5 2.9 1.2-5.6L4 9.3l5.6-.6Z"></path></svg><span><b>A personal dedication</b> written in light</span></span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M21.5 3.5 10.2 14.8M21.5 3.5l-7.2 18-3-7.7-7.8-3.1Z"></path></svg><span><b>A note</b> to send to whoever it shines for</span></span>
            <span className="ritem"><svg viewBox="0 0 24 24"><path d="M12 21s-6.5-5.2-6.5-10a6.5 6.5 0 0 1 13 0c0 4.8-6.5 10-6.5 10Z"></path><circle cx="12" cy="10.6" r="2.3"></circle></svg><span><b>A place in the sky</b> you can visit any time</span></span>
          </div>

          <div className="dedication-layout reveal">
          <div className="gift" id="giftForm">
            <p className="form-eyebrow">A name. A few words. A little magic.</p>
            <div className="gift-intent" id="giftIntent" role="radiogroup" aria-label="Who is this star for">
              <button className="gi on" type="button" data-intent="gift" role="radio" aria-checked="true">A gift for someone</button>
              <button className="gi" type="button" data-intent="self" role="radio" aria-checked="false">For myself, or in memory</button>
            </div>
            <div className="gift-fields">
              <label className="fld" id="fldRecipient"><span className="fld-lbl" id="recipientLbl">Who is it for? The star takes their name.</span>
                <input id="recipientInput" maxLength="40" placeholder="e.g. Mam, or Granny May" autoComplete="off" />
              </label>
              <div className="fld" id="fldMembers" hidden>
                <span className="fld-lbl">Add the people in your constellation</span>
                <div className="members" id="members"></div>
                <button type="button" className="add-member" id="addMember"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>Add a name</button>
              </div>
              <label className="fld"><span className="fld-lbl">Your message</span>
                <input id="msgInput" maxLength="80" placeholder="A line of hope, love or memory" aria-describedby="messageHint formError" required />
                <span className="field-help" id="messageHint">Keep it heartfelt. Up to 80 characters.</span>
              </label>
              <label className="fld"><span className="fld-lbl">From</span>
                <input id="whoInput" maxLength="30" placeholder="Your name" autoComplete="given-name" />
              </label>
            </div>
            <p className="form-error" id="formError" role="alert"></p>
            <button className="btn btn-primary btn-lg" type="button" id="toCheckout">Preview their <span id="selectedLight">Guiding Star</span><span className="arr">→</span></button>
            <p className="form-note">Donations opening soon · explore for free</p>
          </div>
          <div className="dedication-preview" id="dedicationPreview" aria-label="Your dedication preview">
            <span className="dp-label">Your little corner of the universe</span>
            <div className="preview-orbits" aria-hidden="true"><i></i><i></i><i></i></div>
            <div className="dp-members" id="dpMembers" aria-hidden="true"></div>
            <span className="celestial-star" aria-hidden="true"><i></i></span>
            <div className="dp-copy"><span className="dp-eye" id="dpTier">A guiding star for</span><p className="dp-name" id="dpName">Someone special</p><p className="dp-message" id="dpMessage">&ldquo;The world is brighter with you in it.&rdquo;</p><span className="dp-from" id="dpFrom">With love, from you</span></div>
            <span className="dp-footer">One light. A thousand things left unsaid.</span>
          </div>
          </div>

          <div className="wall-cta reveal">
            <button className="btn-night" type="button" id="exploreBtn"><span className="stars-ico" aria-hidden="true"><i></i><i></i><i></i></span>Explore the wall of light</button>
            <span className="forever-tag"><svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z"></path><path d="M9 19h6M10 22h4"></path></svg>Every light begins with someone who cares</span>
          </div>

          <p className="wall-note reveal">You&rsquo;re visiting a preview sky with example dedications. Preview stars can be shared and saved, but aren&rsquo;t donations or permanent registry entries. Stars are symbolic lights on this website, not astronomical star names.</p>

          <div className="faq reveal" id="faq">
            <p className="faq-lbl">Good to know</p>
            <details>
              <summary>What happens when I light a preview star?</summary>
              <p>Your dedication appears in this preview sky. Its share link carries the name and message so someone else can open it, even on another device. Save the link or download your keepsake. Preview stars aren&rsquo;t saved to a permanent registry; donations and the public registry will open later.</p>
            </details>
            <details>
              <summary>Where does the money go?</summary>
              <p>No money is collected in this preview. When donations open, the Wall of Light will support The Light House Project&rsquo;s community programmes in Ballymun, including music, writing, wellbeing and volunteering. Confirmed donation and payment details will be published before launch.</p>
            </details>
            <details>
              <summary>Can I share it on Instagram?</summary>
              <p>Yes. Open your star&rsquo;s share card and choose &ldquo;Create an Instagram Story&rdquo;. Save the portrait image and add it to your Story. You can copy the star link and add it with Instagram&rsquo;s Link sticker. Only include names and messages you&rsquo;re happy to share.</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
