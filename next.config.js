/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL:
      "mongodb+srv://aydinsanoz1976:090519Ay@cluster0.377duaw.mongodb.net/Employee?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
