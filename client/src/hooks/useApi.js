const API_URL = import.meta.env.VITE_API_URL || 'https://skvoshop.skvo-space.workers.dev';
export const useApi = async (endpoint, options) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        ...options
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API error');
    }
    const result = await response.json();
    return result.data;
};
//# sourceMappingURL=useApi.js.map