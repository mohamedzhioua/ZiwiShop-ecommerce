export function createQueryString(searchParams, params) {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
  
    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    }
  
    return newSearchParams.toString();
  }