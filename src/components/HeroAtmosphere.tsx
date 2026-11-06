export function HeroAtmosphere() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none" aria-hidden="true">
      <svg
        className="w-full h-full object-cover min-w-[1200px]"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle warm architectural sepia-olive gradient */}
          <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C8BCAB" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#B5A995" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FAF6EF" stopOpacity="0" />
          </linearGradient>

          {/* Forest hill primary gradient */}
          <linearGradient id="hillDark" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#123B2F" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0B261E" stopOpacity="1" />
          </linearGradient>

          {/* Forest hill secondary gradient */}
          <linearGradient id="hillSoft" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#225A4A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#164336" stopOpacity="0.95" />
          </linearGradient>

          {/* Compass rose glow */}
          <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D5CDBD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F7F2E8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Classical Neoclassical Dome / Architectural Portico (Left Background) */}
        <g transform="translate(-40, 110)" opacity="0.65">
          {/* Lantern and Spire */}
          <rect x="189" y="80" width="6" height="35" rx="3" fill="url(#domeGrad)" />
          <path d="M186 115 H198 L195 125 H189 Z" fill="url(#domeGrad)" />
          {/* Dome Cupola */}
          <path
            d="M135 220 C135 140 160 120 192 120 C224 120 249 140 249 220 Z"
            fill="url(#domeGrad)"
          />
          {/* Drum with Columns */}
          <rect x="125" y="218" width="134" height="18" fill="url(#domeGrad)" />
          {/* Colonnade */}
          <rect x="132" y="236" width="120" height="42" fill="url(#domeGrad)" opacity="0.5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={`col-${i}`}
              x={137 + i * 15}
              y="236"
              width="5"
              height="42"
              rx="1.5"
              fill="#9D917E"
              opacity="0.4"
            />
          ))}
          {/* Base Cornice */}
          <path d="M110 278 H274 L264 290 H120 Z" fill="url(#domeGrad)" />
          <rect x="100" y="290" width="184" height="20" fill="url(#domeGrad)" opacity="0.6" />

          {/* Surrounding Soft Silhouetted Trees (Left) */}
          <path
            d="M30 460 C20 380 70 320 110 350 C130 330 170 340 180 380 C200 360 240 370 250 420 C270 410 300 430 310 480 Z"
            fill="#B1A796"
            opacity="0.25"
          />
        </g>

        {/* 2. Compass Rose & Navigational Celestial Rings (Center-Right Background) */}
        <g transform="translate(1000, 280)">
          {/* Compass soft glow */}
          <circle cx="0" cy="0" r="280" fill="url(#compassGlow)" />

          {/* Outer dashed rings */}
          <circle cx="0" cy="0" r="260" stroke="#879585" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
          <circle cx="0" cy="0" r="210" stroke="#7A8A78" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="150" stroke="#879585" strokeWidth="1" strokeDasharray="6 6" opacity="0.25" />
          <circle cx="0" cy="0" r="80" stroke="#7A8A78" strokeWidth="1" opacity="0.3" />

          {/* Compass Axis Lines */}
          <line x1="-300" y1="0" x2="300" y2="0" stroke="#879585" strokeWidth="0.8" opacity="0.3" />
          <line x1="0" y1="-300" x2="0" y2="300" stroke="#879585" strokeWidth="0.8" opacity="0.3" />
          <line x1="-212" y1="-212" x2="212" y2="212" stroke="#879585" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.25" />
          <line x1="-212" y1="212" x2="212" y2="-212" stroke="#879585" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.25" />

          {/* Central 8-Point Compass Star */}
          <g opacity="0.35">
            {/* North Point */}
            <path d="M0 0 L-14 -20 L0 -90 Z" fill="#4B6353" />
            <path d="M0 0 L14 -20 L0 -90 Z" fill="#8EA394" />
            {/* South Point */}
            <path d="M0 0 L14 20 L0 90 Z" fill="#4B6353" />
            <path d="M0 0 L-14 20 L0 90 Z" fill="#8EA394" />
            {/* East Point */}
            <path d="M0 0 L20 -14 L90 0 Z" fill="#4B6353" />
            <path d="M0 0 L20 14 L90 0 Z" fill="#8EA394" />
            {/* West Point */}
            <path d="M0 0 L-20 14 L-90 0 Z" fill="#4B6353" />
            <path d="M0 0 L-20 -14 L-90 0 Z" fill="#8EA394" />
            {/* Diagonal Points */}
            <path d="M0 0 L0 -15 L50 -50 Z" fill="#698172" opacity="0.7" />
            <path d="M0 0 L15 0 L50 -50 Z" fill="#99AEA1" opacity="0.7" />
            <path d="M0 0 L0 15 L-50 50 Z" fill="#698172" opacity="0.7" />
            <path d="M0 0 L-15 0 L-50 50 Z" fill="#99AEA1" opacity="0.7" />
            <path d="M0 0 L-15 0 L-50 -50 Z" fill="#698172" opacity="0.7" />
            <path d="M0 0 L0 -15 L-50 -50 Z" fill="#99AEA1" opacity="0.7" />
            <path d="M0 0 L15 0 L50 50 Z" fill="#698172" opacity="0.7" />
            <path d="M0 0 L0 15 L50 50 Z" fill="#99AEA1" opacity="0.7" />
          </g>
        </g>

        {/* 3. Rolling Deep Forest Hills (Right Background) */}
        {/* Soft Background Ridge */}
        <path
          d="M740 680 C820 480 960 380 1140 370 C1300 360 1380 440 1480 490 L1480 680 Z"
          fill="url(#hillSoft)"
        />
        {/* Foreground Rich Deep Forest Green Ridge */}
        <path
          d="M860 680 C980 520 1100 430 1260 410 C1380 395 1420 440 1500 460 L1500 680 Z"
          fill="url(#hillDark)"
        />
        {/* Hilltop foliage accents */}
        <path
          d="M1360 360 C1340 330 1370 300 1400 320 C1420 290 1460 300 1470 340 C1490 320 1520 330 1530 370 Z"
          fill="#0B261E"
          opacity="0.9"
        />

        {/* 4. Elegant Curved Trajectory Line with Anchor Nodes */}
        <path
          d="M210 180 C 420 200, 560 350, 740 345"
          stroke="#123B2F"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="2 6"
          opacity="0.4"
        />
        {/* Trajectory node dot on the left */}
        <circle cx="210" cy="180" r="3" fill="#123B2F" opacity="0.5" />
        {/* Trajectory node dot on the connecting curve */}
        <circle cx="560" cy="340" r="3.5" fill="#123B2F" opacity="0.6" />
        <circle cx="740" cy="345" r="4" fill="#123B2F" opacity="0.8" />

        {/* 5. Whimsical 3-Radiant Spark Accent (Top Right of Mockup Window) */}
        <g transform="translate(1330, 115)" stroke="#123B2F" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
          <line x1="-12" y1="-8" x2="-22" y2="-18" />
          <line x1="0" y1="-12" x2="0" y2="-26" />
          <line x1="12" y1="-8" x2="22" y2="-18" />
        </g>
      </svg>
    </div>
  );
}

