const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) throw new Error('VITE_API_BASE_URL is not defined')

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  params?: Record<string, string | number>
  body?: unknown
}

async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', params, body } = options

  const queryString = params
    ? new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
          acc[key] = String(value)
          return acc
        }, {}),
      ).toString()
    : ''

  const url = queryString ? `${BASE_URL}${path}?${queryString}` : `${BASE_URL}${path}`

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}

export { apiRequest }
