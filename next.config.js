/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configuração para GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Descomente e ajuste o basePath se seu repositório não for a raiz
  // basePath: '/POC-PLANEJAMENTO_ESTRATEGICO',
};

module.exports = nextConfig;
