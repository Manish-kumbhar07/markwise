export function BackgroundDecoration() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Subtle organic blob 1 - Top Right - Warm Coral tint */}
      <div
        className="absolute -top-32 -right-32 w-[620px] h-[620px] rounded-full blur-[140px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #F47745 0%, #F7F2E8 70%)',
        }}
      />

      {/* Subtle organic blob 2 - Middle Left - Deep Forest Green tint */}
      <div
        className="absolute top-[35%] -left-48 w-[720px] h-[720px] rounded-full blur-[160px] opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #174C3B 0%, #F7F2E8 70%)',
        }}
      />

      {/* Subtle organic blob 3 - Bottom Right - Warm Ivory & Forest */}
      <div
        className="absolute -bottom-48 right-12 w-[800px] h-[800px] rounded-full blur-[180px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #174C3B 0%, #F47745 40%, transparent 80%)',
        }}
      />

      {/* Subtle hairline geometric grid texture with high transparency */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="markwise-subtle-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#174C3B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#markwise-subtle-grid)" />
      </svg>
    </div>
  );
}
