/** @type {import('next').NextConfig} */
const nextConfig = {
    // Activer les source maps en mode développement
    webpack(config, { dev }) {
      if (dev) {
        config.devtool = 'source-map';
      }
      return config;
    },
    
    // Configuration des images
    images: {
      remotePatterns: [
        {
            protocol: "https", // Ajoutez les domaines autorisés pour les images externes
            hostname: "images.pexels.com"
        }
        ]
    },
  
    // Mode strict pour React
    reactStrictMode: true, // Active les vérifications supplémentaires en mode développement
  
    // Minification SWC
    swcMinify: true, // Active la minification SWC pour des builds plus rapides
  
    // Ajoutez d'autres configurations si nécessaire
  };
  
  export default nextConfig;
  