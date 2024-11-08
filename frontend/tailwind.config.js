import daisyui from "daisyui";
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class'],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
    },
  },
  plugins: [daisyui, addVariablesForColors],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "rgb(29, 155, 240)",          // Your primary blue
          "secondary": "rgb(24, 24, 24)",          // Your secondary color
          "base-100": "#ffffff",                   // Main background
          "base-200": "#e9ecef",                   // Secondary background
          "base-300": "#e9ecef",                   // Tertiary background
          "base-content": "#000000",               // Main text color
          "neutral": "#f3f4f6",                    // Neutral background
          "neutral-content": "#1f2937",            // Text on neutral background
          "border-color": "#e5e7eb",              // Border color
        },
        dark: {
          "primary": "rgb(29, 155, 240)",          // Keep primary blue
          "secondary": "rgb(24, 24, 24)",          // Keep secondary
          "base-100": "#15202B",                   // Dark mode main background
          "base-200": "#1E2732",                   // Dark mode secondary background
          "base-300": "#2C3640",                   // Dark mode tertiary background
          "base-content": "#ffffff",               // Dark mode text color
          "neutral": "#283340",                    // Dark neutral background
          "neutral-content": "#e5e7eb",            // Dark mode text on neutral
          "border-color": "#2F3336",              // Dark mode border color
        }
      }
    ],
    defaultTheme: "dark",
  },
};

// Keep your existing addVariablesForColors function
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}