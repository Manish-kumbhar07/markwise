export async function cookies() {
  return {
    get(name: string) {
      if (typeof document === 'undefined') return undefined;
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? { name, value: decodeURIComponent(match[3]) } : undefined;
    },
    getAll() {
      if (typeof document === 'undefined') return [];
      return document.cookie.split(';').map((c) => {
        const [name, ...val] = c.trim().split('=');
        return { name, value: decodeURIComponent(val.join('=')) };
      });
    },
    has(name: string) {
      return !!this.get(name);
    },
    set(name: string | { name: string; value: string }, value?: string, _options?: any) {
      if (typeof document === 'undefined') return;
      if (typeof name === 'object') {
        document.cookie = `${name.name}=${encodeURIComponent(name.value)}; path=/`;
      } else {
        document.cookie = `${name}=${encodeURIComponent(value || '')}; path=/`;
      }
    },
    delete(name: string) {
      if (typeof document === 'undefined') return;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    },
  };
}

export async function headers() {
  return new Headers();
}

