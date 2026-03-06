import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default config;
