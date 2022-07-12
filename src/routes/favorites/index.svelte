<script context="module">
	import Books from "$lib/Books.svelte"
    import { auth,
        delFav } from "../../firebase.js"

    export const load = async () => {
		  if (auth?.currentUser == null) {
			  return {
				  status: 302,
				  redirect: "/login",
			  }
		  }
		
		  return {
			  status: 200
		  }
    }
</script>

<script>
	import { navigating } from '$app/stores'
	
	const fav = "fav"

	const btnAction = async (event) => {
		await delFav(event.detail.uuid)
	}
</script>

{#if $navigating}
	<p>Fetching favorites...</p>
{:else}
	<Books books=favorites {fav} 
		btnText="Remove"
		on:btnAction={btnAction} />
{/if}