export default function Values() {
  return (
    <>
      <section className="values" id="values" data-screen-label="The symbol" aria-label="What the lighthouse means">
        <div className="container">
          <div className="vpanel reveal">
            <div className="vglow vg1"></div>
            <div className="vglow vg2"></div>
            <div className="vhead">
              <p className="section-label">Why a lighthouse</p>
              <h2>What the lighthouse means.</h2>
              <p className="vsub">It guides ships through dark waters, stands firm through every storm, and shines for anyone who needs it, asking nothing back. Its five lamps spell out our core values. Tap one.</p>
            </div>
            <div className="lamps" id="lamps" role="tablist" aria-label="What the lighthouse means">
              <button className="lamp" type="button" role="tab" aria-selected="false" data-word="Lead" data-desc="We lead by example in our community, and we help young people find the leader in themselves, on stage, in class, and at home.">
                <span className="beam"></span><span className="bulb"></span><span className="letter">L</span><span className="word">Lead</span>
              </button>
              <button className="lamp" type="button" role="tab" aria-selected="false" data-word="Inspire" data-desc="One light lights another. Songs, stories and small wins that make people believe brighter days are possible.">
                <span className="beam"></span><span className="bulb"></span><span className="letter">I</span><span className="word">Inspire</span>
              </button>
              <button className="lamp" type="button" role="tab" aria-selected="false" data-word="Grow" data-desc="Week after week, our programmes help people grow in confidence, skill and self-belief, and ignite the spark within.">
                <span className="beam"></span><span className="bulb"></span><span className="letter">G</span><span className="word">Grow</span>
              </button>
              <button className="lamp" type="button" role="tab" aria-selected="false" data-word="Help" data-desc="Practical, human help. Someone to talk to, somewhere to belong, and no one asked to walk through hard times alone.">
                <span className="beam"></span><span className="bulb"></span><span className="letter">H</span><span className="word">Help</span>
              </button>
              <button className="lamp" type="button" role="tab" aria-selected="false" data-word="Transform" data-desc="A ripple effect of transformation. People who found their light here come back to be the light for someone else.">
                <span className="beam"></span><span className="bulb"></span><span className="letter">T</span><span className="word">Transform</span>
              </button>
            </div>
            <div className="vdetail" id="vdetail" aria-live="polite">
              <p className="vd-word" id="vdWord">Lead</p>
              <p className="vd-desc" id="vdDesc">We lead by example in our community, and we help young people find the leader in themselves, on stage, in class, and at home.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
