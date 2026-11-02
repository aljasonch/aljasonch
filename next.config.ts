import type { NextConfig } from "next";

// Only public Firebase configuration is carried across from CRA deployments.
const firebaseFields = [
  "API_KEY",
  "AUTH_DOMAIN",
  "PROJECT_ID",
  "STORAGE_BUCKET",
  "MESSAGING_SENDER_ID",
  "APP_ID",
];
const config: NextConfig = {
  env: Object.fromEntries(
    firebaseFields.map((field) => [
      `NEXT_PUBLIC_FIREBASE_${field}`,
      process.env[`NEXT_PUBLIC_FIREBASE_${field}`] ??
        process.env[`REACT_APP_FIREBASE_${field}`] ??
        "",
    ]),
  ),
  async redirects() {
    return [
      { source: "/projects", destination: "/portfolio", permanent: true },
    ];
  },
};
export default config;
