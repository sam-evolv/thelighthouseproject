export default function Hero() {
  return (
    <>
      <section className="container hero-shell" id="top" data-screen-label="Hero" aria-label="The Light House Project, a community organisation in Ballymun">
        <div className="hero-panel" id="heroPanel">
          <div className="galaxy" aria-hidden="true"></div>
          <div className="stars" id="stars" aria-hidden="true"></div>
          <div className="meteor m1" aria-hidden="true"></div>
          <div className="meteor m2" aria-hidden="true"></div>
          <div className="meteor m3" aria-hidden="true"></div>
          <div className="moon" aria-hidden="true"></div>
          <div className="sun" aria-hidden="true"></div>
          <div className="wisp" aria-hidden="true"></div>
          <div className="mist m1" aria-hidden="true"></div>
          <div className="mist m2" aria-hidden="true"></div>

          <div className="sea" aria-hidden="true">
            <div className="waves"></div>
            <div className="glints"></div>
            <span className="refl-spot"></span>
            <div className="glade"></div>
            <div className="beam-glade"></div>
          </div>

          <svg className="city" viewBox="0 0 230 30" aria-hidden="true">
            <path d="M0 30 V20 h8 v-5 h6 v8 h10 v-11 h7 v6 h9 v-3 h6 v9 h12 v-14 h6 v7 h8 v-4 h10 v10 h9 v-7 h7 v4 h11 v-9 h6 v6 h9 v-3 h13 v8 h8 v-5 h9 v3 h12 v-6 h7 v8 h10 v-4 h9 v6 h12 v-3 h6 v5 h10 V30 Z" fill="#050C17"></path>
          </svg>
          <div id="cityLights" aria-hidden="true"></div>
          <div className="ridge" aria-hidden="true"></div>
          <div className="scene-flash" aria-hidden="true"></div>
          <div className="cursor-glow" id="cursorGlow" aria-hidden="true"></div>

          <div className="lh-wrap" aria-hidden="true">
            <div className="lightfx">
              <div className="beamL"><i></i></div>
              <div className="beamR"><i></i></div>
              <div className="halo"></div>
              <div className="streak"></div>
            </div>

            <svg viewBox="0 0 140 320" id="lhSvg">
              <defs>
                <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#3D4E68"></stop><stop offset=".16" stopColor="#8CA0BC"></stop>
                  <stop offset=".44" stopColor="#DDE5EF"></stop><stop offset=".76" stopColor="#90A4C0"></stop>
                  <stop offset="1" stopColor="#34445C"></stop>
                </linearGradient>
                <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6B431C"></stop><stop offset=".2" stopColor="#C08436"></stop>
                  <stop offset=".46" stopColor="#F0BE74"></stop><stop offset=".78" stopColor="#A86F2C"></stop>
                  <stop offset="1" stopColor="#5C3917"></stop>
                </linearGradient>
                <linearGradient id="plinth" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2A3850"></stop><stop offset=".45" stopColor="#9AACC4"></stop>
                  <stop offset="1" stopColor="#243248"></stop>
                </linearGradient>
                <linearGradient id="dome" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#1E2A3E"></stop><stop offset=".5" stopColor="#54677F"></stop>
                  <stop offset="1" stopColor="#16202F"></stop>
                </linearGradient>
                <radialGradient id="glass" cx=".5" cy=".45" r=".7">
                  <stop offset="0" stopColor="#5C4A1E"></stop><stop offset=".55" stopColor="#241F12"></stop>
                  <stop offset="1" stopColor="#101B2E"></stop>
                </radialGradient>
                <radialGradient id="warmcap" cx=".5" cy="0" r="1">
                  <stop offset="0" stopColor="rgba(245,195,107,.5)"></stop><stop offset=".7" stopColor="rgba(245,195,107,0)"></stop>
                </radialGradient>
                <radialGradient id="doorglow" cx=".5" cy=".5" r=".5">
                  <stop offset="0" stopColor="rgba(240,185,95,.5)"></stop><stop offset="1" stopColor="rgba(240,185,95,0)"></stop>
                </radialGradient>
                <linearGradient id="rockL" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1A2A42"></stop><stop offset="1" stopColor="#081120"></stop>
                </linearGradient>
                <linearGradient id="rockR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#22334E"></stop><stop offset="1" stopColor="#0A1424"></stop>
                </linearGradient>
                <linearGradient id="litgrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFE3A3" stopOpacity=".85"></stop>
                  <stop offset=".5" stopColor="#FFE3A3" stopOpacity=".18"></stop>
                  <stop offset="1" stopColor="#FFE3A3" stopOpacity="0"></stop>
                </linearGradient>
                <clipPath id="towclip"><path d="M56 266 Q58 175 61 96 L79 96 Q82 175 84 266 Z"></path></clipPath>
              </defs>
              <path d="M2 320 L14 296 L34 302 L48 286 L70 292 L92 282 L112 294 L128 288 L140 300 L140 320 Z" fill="#050B15"></path>
              <path d="M4 320 L16 302 L34 307 L46 297 L58 305 L58 320 Z" fill="url(#rockL)"></path>
              <path d="M80 320 L90 292 L104 299 L118 290 L132 299 L140 308 L140 320 Z" fill="url(#rockR)"></path>
              <path d="M90 292 L104 299 L118 290 L132 299" fill="none" stroke="rgba(240,185,95,.34)" strokeWidth="1"></path>
              <path d="M16 302 L34 307 L46 297" fill="none" stroke="rgba(190,205,228,.22)" strokeWidth="1"></path>
              <path d="M92 282 L112 294 L128 288 L140 300" fill="none" stroke="#2A4160" strokeWidth="1.1" opacity=".6"></path>
              <rect x="20" y="272" width="28" height="20" rx="1.5" fill="url(#plinth)"></rect>
              <path d="M17.5 272 L34 260 L50.5 272 Z" fill="url(#dome)"></path>
              <rect x="40" y="262.5" width="4" height="9" fill="#22344C"></rect>
              <ellipse className="winpulse" cx="29" cy="282" rx="6" ry="5.6" fill="#FFE3A3" opacity="0"></ellipse>
              <rect x="26" y="279" width="6" height="6.5" rx="1" fill="#F2B95F"></rect>
              <rect x="26" y="279" width="6" height="6.5" rx="1" fill="none" stroke="#0B1626" strokeWidth="1.1"></rect>
              <rect x="46" y="266" width="48" height="26" rx="2" fill="url(#plinth)"></rect>
              <ellipse cx="70" cy="266" rx="24" ry="4.4" fill="#AFC0D6"></ellipse>
              <ellipse cx="70" cy="294" rx="34" ry="5" fill="url(#doorglow)"></ellipse>
              <path d="M63 292 v-12 a7 7 0 0 1 14 0 v12 Z" fill="#F2B95F"></path>
              <path d="M63 292 v-12 a7 7 0 0 1 14 0 v12" fill="none" stroke="#0B1626" strokeWidth="2"></path>
              <rect x="58" y="292" width="24" height="2.6" rx="1.3" fill="#141F32"></rect>
              <rect x="55" y="294.6" width="30" height="2.6" rx="1.3" fill="#0E1728"></rect>
              <path d="M56 266 Q58 175 61 96 L79 96 Q82 175 84 266 Z" fill="url(#tower)"></path>
              <g clipPath="url(#towclip)" stroke="#0B1626" strokeWidth=".8" opacity=".12">
                <line x1="50" y1="112" x2="90" y2="112"></line>
                <line x1="50" y1="126" x2="90" y2="126"></line>
                <line x1="50" y1="140" x2="90" y2="140"></line>
                <line x1="50" y1="178" x2="90" y2="178"></line>
                <line x1="50" y1="192" x2="90" y2="192"></line>
                <line x1="50" y1="232" x2="90" y2="232"></line>
                <line x1="50" y1="246" x2="90" y2="246"></line>
                <line x1="50" y1="258" x2="90" y2="258"></line>
              </g>
              <path id="towerLit" d="M56 266 Q58 175 61 96 L79 96 Q82 175 84 266 Z" fill="url(#litgrad)"></path>
              <ellipse cx="70" cy="96" rx="9.2" ry="2.6" fill="#E6ECF4"></ellipse>
              <path d="M58 162 L60.6 96 L79.4 96 L82 162 Z" fill="url(#warmcap)"></path>
              <path d="M58.45 148 L81.55 148 L82.1 168 L57.9 168 Z" fill="url(#band)"></path>
              <path d="M57.35 204 L82.65 204 L83.25 224 L56.75 224 Z" fill="url(#band)"></path>
              <line x1="58.45" y1="148.6" x2="81.55" y2="148.6" stroke="#3A2510" strokeWidth=".7" opacity=".5"></line>
              <line x1="57.9" y1="167.4" x2="82.1" y2="167.4" stroke="#3A2510" strokeWidth=".7" opacity=".5"></line>
              <ellipse className="winpulse" cx="70" cy="185.8" rx="5.6" ry="5" fill="#FFE3A3" opacity="0"></ellipse>
              <path d="M66 190 v-7 a4 4 0 0 1 8 0 v7 Z" fill="#E8AE54"></path>
              <path d="M66 190 v-7 a4 4 0 0 1 8 0 v7" fill="none" stroke="#0B1626" strokeWidth="1.6"></path>
              <path d="M67 246 v-5.4 a3 3 0 0 1 6 0 v5.4 Z" fill="#D89A44"></path>
              <path d="M67 246 v-5.4 a3 3 0 0 1 6 0 v5.4" fill="none" stroke="#0B1626" strokeWidth="1.4"></path>
              <g fill="#1A2A40">
                <rect x="58" y="95.4" width="1.9" height="3.2"></rect><rect x="61.5" y="95.8" width="1.9" height="3.2"></rect>
                <rect x="65" y="96" width="1.9" height="3.2"></rect><rect x="68.5" y="96.1" width="1.9" height="3.2"></rect>
                <rect x="72" y="96" width="1.9" height="3.2"></rect><rect x="75.5" y="95.8" width="1.9" height="3.2"></rect>
                <rect x="79" y="95.4" width="1.9" height="3.2"></rect>
              </g>
              <rect x="56" y="90" width="28" height="6" rx="2" fill="#7E92AE"></rect>
              <ellipse cx="70" cy="90" rx="21" ry="4.6" fill="#101C2E"></ellipse>
              <ellipse cx="70" cy="87.4" rx="21" ry="4.2" fill="#22344C"></ellipse>
              <ellipse cx="70" cy="96.5" rx="13" ry="2.8" fill="#0A1320" opacity=".45"></ellipse>
              <g stroke="#1A2A40" strokeWidth="1.2">
                <line x1="50.5" y1="74" x2="50.5" y2="86"></line><line x1="55.4" y1="73" x2="55.4" y2="86.6"></line>
                <line x1="60.3" y1="72.4" x2="60.3" y2="87"></line><line x1="65.1" y1="72" x2="65.1" y2="87.4"></line>
                <line x1="70" y1="71.8" x2="70" y2="87.6"></line><line x1="74.9" y1="72" x2="74.9" y2="87.4"></line>
                <line x1="79.7" y1="72.4" x2="79.7" y2="87"></line><line x1="84.6" y1="73" x2="84.6" y2="86.6"></line>
                <line x1="89.5" y1="74" x2="89.5" y2="86"></line>
              </g>
              <ellipse cx="70" cy="80" rx="20.4" ry="4" fill="none" stroke="#243A56" strokeWidth="1" opacity=".8"></ellipse>
              <ellipse cx="70" cy="72.6" rx="20" ry="3.9" fill="none" stroke="#283C58" strokeWidth="1.7"></ellipse>
              <rect x="57.5" y="49" width="25" height="25" rx="2" fill="url(#glass)"></rect>
              <g stroke="rgba(255,227,163,.5)" strokeWidth=".7">
                <line x1="65.5" y1="55.5" x2="74.5" y2="55.5"></line>
                <line x1="64.5" y1="59.5" x2="75.5" y2="59.5"></line>
                <line x1="64.5" y1="63.5" x2="75.5" y2="63.5"></line>
                <line x1="65.5" y1="67.5" x2="74.5" y2="67.5"></line>
              </g>
              <ellipse cx="70" cy="61.5" rx="5" ry="8.2" fill="rgba(255,227,163,.26)" stroke="rgba(255,227,163,.55)" strokeWidth=".6"></ellipse>
              <circle cx="70" cy="61.5" r="2.3" fill="#FFF6DC"></circle>
              <g stroke="#0B1626">
                <line x1="64" y1="49" x2="64" y2="74" strokeWidth="1.5"></line>
                <line x1="70" y1="49" x2="70" y2="74" strokeWidth="1.5"></line>
                <line x1="76" y1="49" x2="76" y2="74" strokeWidth="1.5"></line>
                <line x1="57.5" y1="61.5" x2="82.5" y2="61.5" strokeWidth="1.1"></line>
                <line x1="57.5" y1="49" x2="57.5" y2="74" strokeWidth="2.2"></line>
                <line x1="82.5" y1="49" x2="82.5" y2="74" strokeWidth="2.2"></line>
              </g>
              <rect x="66.5" y="64" width="7" height="10" fill="#0B1626"></rect>
              <rect x="55" y="44.6" width="30" height="5" rx="2.2" fill="#22344C"></rect>
              <path d="M56 44.6 Q70 22 84 44.6 Z" fill="url(#dome)"></path>
              <path d="M63.5 40.5 Q66.5 27 70 24" fill="none" stroke="#16202F" strokeWidth="1" opacity=".85"></path>
              <path d="M76.5 40.5 Q73.5 27 70 24" fill="none" stroke="#16202F" strokeWidth="1" opacity=".85"></path>
              <path d="M59.5 38.5 Q70 32.5 80.5 38.5" fill="none" stroke="#16202F" strokeWidth=".9" opacity=".7"></path>
              <line x1="70" y1="23.5" x2="70" y2="13" stroke="#22344C" strokeWidth="2"></line>
              <path d="M70 10.6 L76 10.6 M73.8 8.8 L76 10.6 L73.8 12.4" fill="none" stroke="#22344C" strokeWidth="1.3" strokeLinecap="round"></path>
              <circle cx="70" cy="13.4" r="2.8" fill="#22344C"></circle>
              <circle cx="69.2" cy="12.6" r=".9" fill="#54677F"></circle>
            </svg>

            <div className="lens"><i></i></div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">The Wall of Light · Ballymun</p>
            <h1>Light a star that shines <em>forever</em>.</h1>
            <p className="lede">Name a star for someone you love and it joins the night sky over Ballymun. Numbered, written with your message, and lit forever in support of The Light House Project.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#wall"><span className="flame"></span>Light your star<span className="arr">→</span></a>
              <button className="btn btn-ghost-night btn-lg" type="button" id="heroExplore">Explore the Wall</button>
            </div>
            <p className="hero-badge"><span className="flame"></span><strong id="heroCount">412</strong> lights burning forever</p>
            <p className="trust">Founded by <strong>Caoimhe Lynch</strong> in January 2024 · for hope, for memory, for Ballymun.</p>
          </div>

          <div className="tonight quiet" id="tonight" aria-live="polite">
            <span className="live"></span><span id="tonightText">Checking the timetable...</span>
          </div>

          <span className="verse" id="verse" aria-hidden="true"></span>
          <div className="star-tip" id="starTip" role="status"></div>

          <div className="plaque" aria-hidden="true">
            <b>The Ballymun Light</b>
            <span>The sky above matches the real time in Ballymun.</span>
            <span>Solas do Bhaile Munna · burning <b id="daysLit" style={{display:'inline',color:'rgba(240,185,95,.85)'}}>···</b> days and counting</span>
          </div>

          <div className="panel-controls">
            <div className="skybar" role="group" aria-label="Preview the sky at a different time of day">
              <button data-sky="sky-dawn" aria-label="Dawn" title="Dawn">
                <svg viewBox="0 0 24 24"><path d="M4 16h16"></path><path d="M7.5 15.5a4.5 4.5 0 0 1 9 0"></path><path d="M12 5.5V8M6.2 8.7l1.5 1.5M17.8 8.7l-1.5 1.5"></path><path d="M9 19.5h6"></path></svg>
              </button>
              <button data-sky="sky-day" aria-label="Day" title="Day">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 3.5V6M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M7.7 16.3 6 18"></path></svg>
              </button>
              <button data-sky="sky-dusk" aria-label="Dusk" title="Dusk">
                <svg viewBox="0 0 24 24"><path d="M4 16h16"></path><path d="M7.5 16a4.5 4.5 0 0 1 9 0"></path><path d="M12 8.5V11"></path><path d="M9 19.5h6"></path></svg>
              </button>
              <button data-sky="sky-night" aria-label="Night" title="Night">
                <svg viewBox="0 0 24 24"><path d="M19.5 14.5A7.8 7.8 0 0 1 9.5 4.5a7.8 7.8 0 1 0 10 10Z"></path><path d="m16.8 5.2.45 1.25 1.25.45-1.25.45-.45 1.25-.45-1.25-1.25-.45 1.25-.45Z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
