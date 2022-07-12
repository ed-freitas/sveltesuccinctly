<script context="module">
  export const load = async ({ session }) =>{
        let { user } = session
        if (user != null) {
            return {
                status: 302,
                redirect: "/favorites",
            }
        }
        return {
            status: 200,
        }
  }
</script>

<script>
    import { registerChecks, fbRegisterChecks } 
      from "$lib/utils.js"

    import { createUserWithEmailAndPassword, 
      updateProfile } from "Firebase/auth"
    import { goto } from "$app/navigation"
    import { auth, userDoc } from "../firebase.js"
    import { setDoc } from "Firebase/firestore/lite"

    export let 
      error = undefined, 
      username = "", pwd = "", pwd2 = ""

    const checkFields = () => {
      if (username === "" && 
          pwd === "" && 
          pwd2 === "") {
          error = undefined  
      }
    }

    const signUp = async (email, pwd, pwd2) => {
      if (email !== undefined && 
          pwd !== undefined && 
          pwd2 !== undefined) {

        error = registerChecks(email, pwd, pwd2)
        if (error === undefined) {
          try {
            let user = await 
              createUserWithEmailAndPassword(
                auth,
                email,
                pwd
            );
            await updateProfile(user.user, 
              { displayName: username });
            await setDoc(
              userDoc(auth.currentUser.uid), {
                username: user.user.displayName,
                email: user.user.email
            });
            await goto("/favorites")
          } 
          catch (e) {
            error = fbRegisterChecks(e)
          }
        }
      }
    }
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<div class="content-wrapper">
  <div class="container-fluid">
    <div class="content">
      <div class="row">
        <div class="col-sm"></div>
        <div class="card col-sm">
          <h2 class="text-center content-title">
            Sign up
          </h2>
          {#if error !== undefined}
            <div class="mb-15 alert {error.alertType}" 
              role="alert">
              <h4 class="alert-heading">{error.title}</h4>
              {error.content}
            </div>
          {/if}
          <form on:submit|preventDefault=
            {() => signUp(username, pwd, pwd2)}>
            <div>
              <label for="username" 
                class="required">User name:</label>
              <div class="form-row row-eq-spacing-md">
                <div class="col-md-12">
                  <input type="text" 
                    class="form-control" 
                    id="username" 
                    placeholder=
                    "Please type in your user name" 
                    required="required"
                    bind:value={username}
                    on:keyup={() => checkFields()}
                    >
                </div>
              </div>
            </div>

            <div>
              <label for="pwd" 
                class="required">Password:</label>
              <div 
                class="form-row row-eq-spacing-md">
                <div class="col-md-12">
                  <input type="password" 
                    class="form-control" 
                    id="pwd" 
                    placeholder=
                    "Please type in your password" 
                    required="required"
                    bind:value={pwd}
                    on:keyup={() => checkFields()}
                    >
                </div>
              </div>
            </div>

            <div>
              <label for="pwd2" 
                class="required">Password again:</label>
              <div 
                class="form-row row-eq-spacing-md">
                <div class="col-md-12">
                  <input type="password" 
                    class="form-control" 
                    id="pwd2" 
                    placeholder=
                    "Please retype your password" 
                    required="required"
                    bind:value={pwd2}
                    on:keyup={() => checkFields()}
                    >
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <input 
                class="btn btn-primary" 
                type="submit" 
                value="Submit"
              >
            </div>

            <div class="pt-10 text-center">
              <a href="/login">
              Already have an account?
              </a>
            </div>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</div>