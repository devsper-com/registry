export function BlobBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ds-blob-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="120" />
          </filter>
        </defs>
        <g filter="url(#ds-blob-blur)">
          <circle cx="15%" cy="20%" r="220" fill="rgba(138, 43, 226, 0.15)">
            <animate
              attributeName="cx"
              values="15%;30%;15%"
              dur="25s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="20%;35%;20%"
              dur="28s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80%" cy="70%" r="180" fill="rgba(224, 176, 255, 0.08)">
            <animate
              attributeName="cx"
              values="80%;65%;80%"
              dur="30s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="70%;50%;70%"
              dur="26s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50%" cy="85%" r="160" fill="rgba(88, 28, 135, 0.12)">
            <animate
              attributeName="cx"
              values="50%;65%;50%"
              dur="22s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="85%;70%;85%"
              dur="24s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
