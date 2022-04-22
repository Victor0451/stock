module.exports = {

  // webpack: (config) => {
  //   return {
  //     ...config,
  //     node: {
  //       fs:
  //         'empty'
  //     }
  //   }
  // },

  // webpack: (config) => {
  //   config.resolve = {
  //     ...config.resolve,
  //     fallback: {
  //       // "fs": false,
  //       // "path": false,
  //       // "os": false,
  //       "process": false,
  //        "crypto": false,
  //       "stream": false,
  //     }
  //   }
  //   return config
  // },

  reactStrictMode: true,

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },


  env: {
    'MYSQL_HOST': '190.231.67.172',
    'MYSQL_PORT': '5506',
    'MYSQL_DATABASE': "stock",
    'MYSQL_USER': "vlongo",
    'MYSQL_PASSWORD': "nokia5800",
  },

  images: {
    domains: ['stock-seven.vercel.app', '190.231.67.172', 'sgi.werchow.com'],
    // formats: ['image/avif', 'image/webp'],
  },


}


