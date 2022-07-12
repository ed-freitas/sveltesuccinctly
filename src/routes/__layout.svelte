<script>
  import { onAuthStateChanged, signOut } from "Firebase/auth"
	import { onMount } from "svelte"
	import { auth } from "../firebase.js"
	import { getStores } from "$app/stores"
  import { goto } from "$app/navigation"

	let { session } = getStores()

	onMount(() => {
		onAuthStateChanged(
			auth,
			(user) => {
				session.set({ user })
			},
			(error) => {
				session.set({ user: null })
				console.log(error)
			}
		);
	});

  const logOut = async () => {
      await signOut(auth)
      await goto('/login')
  }
</script>

<div class="page-wrapper with-navbar">
    <nav class="navbar">
      <a href="/" class="navbar-brand">
        FavBooks
      </a>
      <span class="navbar-text ml-5">
        {#if $session['user'] != null}
          <span class="ml-5 mt-5 badge text-monospace">
              {$session['user'].email}
          </span>
        {/if}
      </span>
  
      <div class="navbar-content ml-auto">
        <button 
            class="btn btn-action mr-5" 
            type="button" 
            onclick="halfmoon.toggleDarkMode()">
            <i class="fa fa-moon-o" 
                aria-hidden="true">
            </i>
            <span 
                class="sr-only">
                Toggle dark mode
            </span>
        </button>
        {#if $session['user'] != null}
          <a href="/favorites" 
            class="mr-5 btn btn-link" 
            role="button"
            >
            Favorites
          </a>
          <a href={null} 
            class="mr-5 btn btn-success" 
            role="button"
            on:click={() => logOut()}
            >
            Sign out
          </a>
        {:else}
          <a href="/login" 
            class="mr-5 btn btn-secondary" 
            role="button">
            Sign in
          </a>
        {/if}
      </div>
    </nav>
    <slot />
  </div>