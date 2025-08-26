'use client'

import React from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // This would integrate with Azure AD B2C in production
  return (
    <div>
      {children}
    </div>
  )
}
