<script context="module">
    import Books from "$lib/Books.svelte"

    export const load = async({fetch}) => {
        const res = await fetch("/api")
        const books = await res.json()
        return {
            props: {
                books,
            },
        }
    }
</script>

<script>
    import { addFav } 
        from "../firebase.js";
    
    import { goto } from "$app/navigation"

    export let books
    const fav = ""

    const btnAction = async (e) => {
        await addFav(e.detail)
        await goto("/favorites")
    }
</script>

<svelte:head>
  <title>FavBooks</title>
</svelte:head>

<Books {books} {fav} 
    btnText="Add to favorites"
    on:btnAction={btnAction} />