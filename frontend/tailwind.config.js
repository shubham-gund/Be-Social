import daisyui from "daisyui";
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';


/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      colors: {
        primary: "rgb(29, 155, 240)",
				secondary: "rgb(24, 24, 24)",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
	},
	plugins: [daisyui,addVariablesForColors],

	daisyui: {
		themes: [
			"light",
			"dark"
		],
	},
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}