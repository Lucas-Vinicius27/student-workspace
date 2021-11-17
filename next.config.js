/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
