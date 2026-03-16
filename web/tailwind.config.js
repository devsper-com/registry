/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ds: {
          bg: "#0a0a0a",
          surface: "#111111",
          border: "#1f1f1f",
          muted: "#666666",
          "muted-light": "#555555",
          error: "#ef4444",
          text: "#fafafa",
          "text-passive": "#e8e8e8",
          accent: "#e5e5e5",
          violet: "#8A2BE2",
          lilac: "#E0B0FF",
          "code-bg": "#0f0f0f",
          "terminal-bg": "#0d0d0d",
          "terminal-header": "#161616",
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
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
