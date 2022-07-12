<script>
    import { createEventDispatcher,
        onMount } from "svelte"
    import { getStores } from "$app/stores"
    import { getFavs } from "../firebase.js"

    const dispatch = createEventDispatcher()
	let { session } = getStores()

    export let books = []
    export let fav = ""
    export let btnText

    onMount(async () => {
      if (fav !== "") {
        books = []
        books = await getFavs()
      }
    })

    const emitBtnAction = (book) => {
        dispatch("btnAction", book)
        
        if (fav !== "") {
            books = books.filter(item => item.title != book.title)
        }
    }
 </script>

{#if books?.length > 0}
    <div class="content-wrapper">
        <div class="container-fluid">
        <div class="content">
            <h2 class="content-title">
            Books
            </h2>
        </div>
        <div class="row row-eq-spacing">
            {#each books as book}
                <div class="col-6 col-lg-3">
                    <div class="mb-20 card">
                        <a target="_blank" href={book.url}>
                        <img src={book.cover} 
                            class="img-fluid rounded" 
                            alt="book cover" />
                        </a>
                        <div 
                            class=  
                                "{fav === 'fav' ? 
                                'alert-secondary ' :
                                'alert-primary '} 
                                text-center alert"
                            role="alert">
                            {book.description}
                            {#if $session['user'] != null}
                                <a href={null} 
                                    class= 
                                    "{fav === 'fav' ? 
                                    'btn-danger ' :
                                    'btn-primary '} 
                                    mt-10 btn
                                    btn-block" 
                                    role="button"
                                    on:click={() => emitBtnAction(book)}>
                                    {btnText}
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        </div>
    </div>
{:else}
    <div class="content-wrapper">
    <div class="row row-eq-spacing">
      <div class="col-sm"></div>
      <div class="col-sm">
        <div class="text-center alert alert-primary" role="alert">
            <h4 class="text-center alert-heading">
                No {fav !== "" ? 'favorites' : 'books'} found
            </h4>
            Click <a href="/" class="alert-link">here</a> to add one :).
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
{/if}