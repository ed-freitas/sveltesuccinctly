// See: https://kit.svelte.dev/docs/hooks#handle

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event, {
      ssr: event.url.pathname.startsWith('/favorites')
    });
   
    return response;
}