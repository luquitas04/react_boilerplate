export async function fetchWithConfig(apiUrl, path, options) {
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
    return res.json();
}
