// Intro shown on every load. Pure CSS (see "Splash" in globals.css) plus one tiny inline
// script that measures where the hero globe sits, so the splash globe can fly into it.

// Meridians spaced 30 degrees apart; their staggered delays make the wireframe rotate.
const meridians = [0, 1, 2, 3, 4, 5];

export function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-bg" />

      <svg className="splash-orbit" viewBox="0 0 800 800">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle className="ring" pathLength="1" cx="400" cy="400" r="300" strokeOpacity="0.16" />
          <circle className="ring r2" pathLength="1" cx="400" cy="400" r="360" strokeOpacity="0.12" strokeDasharray="2 7" />
          <circle className="ring r3" pathLength="1" cx="400" cy="400" r="395" strokeOpacity="0.08" />
        </g>
        <g className="spin">
          <ellipse cx="400" cy="400" rx="380" ry="130" transform="rotate(-24 400 400)" fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.2" />
          <circle cx="780" cy="400" r="6" fill="var(--accent)" transform="rotate(-24 400 400)" />
        </g>
      </svg>

      {/* Same geometry as the canvas globe: radius = width / 2 - 6. Centered on the Philippines. */}
      <svg className="splash-globe" viewBox="0 0 312 312">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="156" cy="156" r="150" strokeOpacity="0.5" />
          <g strokeOpacity="0.18">
            <line x1="6" y1="156" x2="306" y2="156" />
            <line x1="26" y1="81" x2="286" y2="81" />
            <line x1="26" y1="231" x2="286" y2="231" />
            <line x1="81" y1="26" x2="231" y2="26" />
            <line x1="81" y1="286" x2="231" y2="286" />
            {meridians.map((i) => (
              <ellipse
                key={i}
                className="mer"
                style={{ animationDelay: `${-i}s` }}
                cx="156"
                cy="156"
                rx="150"
                ry="150"
              />
            ))}
          </g>
        </g>
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
          <path className="splash-arc" pathLength="1" style={{ animationDelay: "0.7s" }} d="M156 156 Q152 136 139 135" />
          <path className="splash-arc" pathLength="1" style={{ animationDelay: "0.82s" }} d="M156 156 Q96 62 28 83" />
          <path className="splash-arc" pathLength="1" style={{ animationDelay: "0.94s" }} d="M156 156 Q76 150 8 132" />
        </g>
        <g fill="var(--accent)">
          <circle className="splash-ping" cx="156" cy="156" r="5" />
          <circle className="splash-pin" style={{ animationDelay: "0.55s" }} cx="156" cy="156" r="5" />
          <circle className="splash-pin" style={{ animationDelay: "1.25s" }} cx="139" cy="135" r="3.5" />
          <circle className="splash-pin" style={{ animationDelay: "1.4s" }} cx="28" cy="83" r="3.5" />
        </g>
      </svg>

      <div className="splash-core">
        <div className="splash-name">
          Art Dela <span>Cruz.</span>
        </div>
        <p className="splash-role">Full-stack &amp; mobile developer</p>
      </div>
    </div>
  );
}

// Runs right after the page markup: finds the hero globe and tells the splash globe where
// to land. The values go on <html>, never on the splash, so React hydration is untouched. Re-measured just before the exit in case fonts shifted the layout. If the hero
// globe is off screen (phones), the splash globe zooms through and fades instead.
const handoff =
  "(function(){var s=document.documentElement;function m(){var t=document.querySelector('[data-hero-globe]');if(!t)return;var r=t.getBoundingClientRect(),W=innerWidth,H=innerHeight,w=Math.min(1.25*Math.min(W,H),980)*.39,cy=r.top+r.height/2;if(!r.width||cy>H||cy<0){s.style.removeProperty('--gx');s.style.removeProperty('--gy');s.style.removeProperty('--gs');return}s.style.setProperty('--gx',(r.left+r.width/2-W/2)+'px');s.style.setProperty('--gy',(cy-H/2)+'px');s.style.setProperty('--gs',String(r.width/w))}m();setTimeout(m,1800)})()";

export function SplashHandoff() {
  return <script dangerouslySetInnerHTML={{ __html: handoff }} />;
}
