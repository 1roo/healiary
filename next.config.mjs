/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // app 디렉터리 기반 라우팅을 활성화
  },
  reactStrictMode: true, // React Strict Mode 활성화 (선택 사항)
};

export default nextConfig;
