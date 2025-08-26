/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@azure/storage-blob', '@azure/cosmos'],
  env: {
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY,
    AZURE_COSMOS_ENDPOINT: process.env.AZURE_COSMOS_ENDPOINT,
    AZURE_COSMOS_KEY: process.env.AZURE_COSMOS_KEY,
  }
}

module.exports = nextConfig
