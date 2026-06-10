import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリの lockfile 誤検出を防ぎ、このプロジェクトを workspace root とする
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
