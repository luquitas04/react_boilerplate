export async function fetchWithConfig<T>(
  apiUrl: string,
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiUrl.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}
