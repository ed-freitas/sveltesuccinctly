<script>
    import { onAuthStateChanged, signOut } from "Firebase/auth"
    import { onMount } from "svelte"
    import { auth } from "../../firebase.js"
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
        await goto('/')
    }
</script>

<div id="page-wrapper" 
    class="page-wrapper with-navbar" 
    data-sidebar-type="overlayed-sm-and-down">

    <nav class="navbar">
        <div class="navbar-content">
        </div>
        <a href="/" 
            class="navbar-brand ml-10 ml-sm-20">
            <span class="d-none d-sm-flex">
                FavBooks
            </span>
        </a>
        <span class="navbar-text ml-5">
            {#if $session['user'] != null}
              <span class="ml-10 mt-5 badge text-monospace">
                  {$session['user'].email}'s favorites
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
