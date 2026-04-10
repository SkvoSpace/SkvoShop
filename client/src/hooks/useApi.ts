const API_URL = import.meta.env.VITE_API_URL || 'https://skvoshop.skvo-space.workers.dev'

interface ApiResponse<T> {
  data?: T
  error?: string
}

export const useApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json() as ApiResponse<never>
    throw new Error(error.error || 'API error')
  }

  const result = await response.json() as ApiResponse<T>
  return result.data as T
}
