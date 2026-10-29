/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // Avatares das contas Google (photoURL do Firebase Auth)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/ranking",
        has: [
          {
            type: "cookie",
            key: "sessao",
            value: "true"
          }
        ],
        destination: "/home",
        permanent: false
      },
      {
        source: "/ranking",
        has: [
          {
            type: "cookie",
            key: "sessao",
            value: "false"
          }
        ],
        destination: "/",
        permanent: false
      },
      {
        source: "/home",
        has: [
          {
            type: "cookie",
            key: "sessao",
            value: "false"
          }
        ],
        destination: "/",
        permanent: false
      }
    ];
  },
}
