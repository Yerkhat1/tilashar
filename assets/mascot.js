/* Tілашар — Barys the snow leopard. Shared by the landing page and the app. */
function MASCOT_SVG(){ return `<svg viewBox="0 0 100 104" width="100%" height="100%" aria-hidden="true">
  <defs><radialGradient id="mg" cx="50%" cy="36%" r="68%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e7edf7"/></radialGradient></defs>
  <ellipse cx="50" cy="99" rx="25" ry="4.5" fill="rgba(0,0,0,.14)"/>
  <g class="mbob">
   <path d="M66 86 Q90 82 86 60 Q84 50 76 53" fill="none" stroke="#e7edf7" stroke-width="11" stroke-linecap="round"/>
   <circle cx="77" cy="52" r="6" fill="#d7e0ef"/>
   <ellipse cx="50" cy="82" rx="21" ry="18" fill="url(#mg)" stroke="#cdd8ea" stroke-width="1.5"/>
   <ellipse cx="40" cy="96" rx="8" ry="5.5" fill="#fff" stroke="#cdd8ea" stroke-width="1.2"/>
   <ellipse cx="60" cy="96" rx="8" ry="5.5" fill="#fff" stroke="#cdd8ea" stroke-width="1.2"/>
   <path d="M40 94v4M60 94v4" stroke="#cdd8ea" stroke-width="1"/>
   <circle cx="42" cy="80" r="2" fill="none" stroke="#c6d2e6" stroke-width="1.4"/>
   <circle cx="58" cy="80" r="2" fill="none" stroke="#c6d2e6" stroke-width="1.4"/>
   <path d="M28 30 L22 8 L44 24 Z" fill="#dbe3f0"/><path d="M72 30 L78 8 L56 24 Z" fill="#dbe3f0"/>
   <path d="M30 28 L26 14 L40 25 Z" fill="#f6a6b6"/><path d="M70 28 L74 14 L60 25 Z" fill="#f6a6b6"/>
   <circle cx="50" cy="46" r="27" fill="url(#mg)" stroke="#cdd8ea" stroke-width="1.6"/>
   <path d="M31 34q3-3 6 0" stroke="#c6d2e6" stroke-width="1.4" fill="none"/>
   <path d="M63 34q3-3 6 0" stroke="#c6d2e6" stroke-width="1.4" fill="none"/>
   <circle cx="30" cy="48" r="1.7" fill="#c6d2e6"/><circle cx="70" cy="48" r="1.7" fill="#c6d2e6"/>
   <circle cx="36" cy="55" r="5" fill="#f6a6b6" opacity=".35"/><circle cx="64" cy="55" r="5" fill="#f6a6b6" opacity=".35"/>
   <g class="meyes"><ellipse cx="40" cy="46" rx="6" ry="8" fill="#26303f"/><ellipse cx="60" cy="46" rx="6" ry="8" fill="#26303f"/>
     <circle cx="42" cy="43" r="2" fill="#fff"/><circle cx="62" cy="43" r="2" fill="#fff"/></g>
   <path d="M46.5 53 L53.5 53 L50 57 Z" fill="#e78ba0"/>
   <path d="M50 57V60M50 60Q45 63 42 60M50 60Q55 63 58 60" stroke="#26303f" stroke-width="1.5" fill="none" stroke-linecap="round"/>
   <path d="M24 52 L34 53M24 57 L34 56M76 52 L66 53M76 57 L66 56" stroke="#cdd8ea" stroke-width="1.2" stroke-linecap="round"/>
   <path d="M34 68 Q50 76 66 68" stroke="#FFC53D" stroke-width="3.2" fill="none" stroke-linecap="round"/>
   <circle cx="50" cy="73" r="3.2" fill="#FFC53D"/>
  </g></svg>`; }
const MASCOT_CSS = `<style>.mbob{transform-origin:50px 70px;animation:mb 3.2s ease-in-out infinite}
@keyframes mb{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-3px) rotate(1deg)}}
.meyes{transform-origin:50px 46px;animation:blink 4.5s infinite}
@keyframes blink{0%,95%,100%{transform:scaleY(1)}97.5%{transform:scaleY(.1)}}</style>`;

