export const azureConfig = {
  // Free tier connection strings and endpoints
  storage: {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    containerName: 'documents'
  },
  
  cosmos: {
    endpoint: process.env.AZURE_COSMOS_ENDPOINT || '',
    key: process.env.AZURE_COSMOS_KEY || '',
    databaseId: 'egovernance',
    containerId: 'documents'
  },
  
  openai: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    apiKey: process.env.AZURE_OPENAI_KEY || '',
    deploymentId: 'gpt-35-turbo' // Free tier model
  },
  
  b2c: {
    tenantName: process.env.AZURE_AD_B2C_TENANT_NAME || '',
    clientId: process.env.AZURE_AD_B2C_CLIENT_ID || '',
    policyName: process.env.AZURE_AD_B2C_POLICY_NAME || 'B2C_1_SignUpSignIn'
  }
}

// Free tier limits
export const freeTierLimits = {
  storage: {
    maxFileSize: 5 * 1024 * 1024, // 5MB per file
    totalStorage: 5 * 1024 * 1024 * 1024, // 5GB total
  },
  
  cosmos: {
    maxRUPerSecond: 1000, // Free tier RU/s
    maxStorageGB: 25
  },
  
  functions: {
    maxRequestsPerMonth: 1000000, // 1M requests free
    maxExecutionTimeSeconds: 300
  },
  
  openai: {
    maxTokensPerRequest: 1000,
    recommendedRequestsPerDay: 100 // To stay within reasonable costs
  }
}

// Development/Free alternatives
export const devAlternatives = {
  // Use local storage in development
  useLocalStorage: process.env.NODE_ENV === 'development',
  
  // Mock AI responses in development
  useMockAI: !process.env.AZURE_OPENAI_KEY,
  
  // Use in-memory cache instead of Redis
  useMemoryCache: !process.env.REDIS_URL
}
