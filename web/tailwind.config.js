/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020204",
        orchid: "#E0AAFF",
        cyan: "#B9F2FF",
        ds: {
          bg: "#020204",
          surface: "#0a0a0c",
          border: "rgba(255,255,255,0.08)",
          "border-hex": "#1a1a1e",
          muted: "#9ca3af",
          "muted-light": "#6b7280",
          error: "#ef4444",
          text: "#e5e5e7",
          "text-passive": "#d1d5db",
          accent: "#E0AAFF",
          violet: "#E0AAFF",
          lilac: "#E0AAFF",
          "code-bg": "#0a0a0c",
          "terminal-bg": "#0a0a0c",
          "terminal-header": "#111114",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "65ch",
        content: "80ch",
      },
      spacing: {
        "ds-xs": "0.25rem",
        "ds-sm": "0.5rem",
        "ds-md": "0.75rem",
        "ds-lg": "1rem",
        "ds-xl": "1.25rem",
      },
      transitionDuration: { DEFAULT: "100ms" },
    },
  },
  plugins: [],
};
