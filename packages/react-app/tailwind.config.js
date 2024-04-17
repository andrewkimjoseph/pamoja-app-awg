/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      "pa_one": "#1E3148",
      "pa_two": "#F0FBFE",
      "pa_three": "#FCF8FF",
    }
  },
};
export const plugins = [];
