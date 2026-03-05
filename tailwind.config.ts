import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--color-void)",
        bg: "var(--color-bg)",
        panel: "var(--color-panel)",
        card: "var(--color-card)",
        "card-2": "var(--color-card-2)",
        cyan: "var(--color-cyan)",
        amber: "var(--color-amber)",
        red: "var(--color-red)",
        green: "var(--color-green)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
      },
    },
  },
  plugins: [],
};

export default config;
