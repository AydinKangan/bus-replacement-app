<script lang="ts">
  import { goto } from '$app/navigation';
  import supabase from './supabase.js';

  let email = '';
  let password = '';
  let loginErrorMessage = '';

  const login = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Login error:', error.message);
        loginErrorMessage = error.message; 
      } else {
        console.log('User logged in:', user);
        loginErrorMessage = '';
        goto("/usersprofile")
      }
    } catch (err: any) {
      console.error('An error occurred:', err.message);
      loginErrorMessage = err.message;
    }
  };

  const register = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Registration error:', error.message);
      } else {
        console.log('User registered:', user);
        goto("/usersprofile")
      }
    } catch (err) {
      console.error('An error occurred during registration:', err);
    }
  };

	async function signInGitHub() {
    console.log("signInGitHub");
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
        redirectTo: "http://localhost:5173/usersprofile",
      },
    });
    if(data) {
        console.log("data:", data);
        const user = await supabase.auth.getUser();
        console.log("user:", user);
        goto("/usersprofile")
    }
    if(error) {
        console.log("error:", error);
    }
	}
</script>


<div class="login-side">
  <!-- Image logo -->
  <img class="logo" src="https://puffingbilly.com.au/wp-content/uploads/PTV.jpeg" alt="PTV Logo" />
  <br>

  <!-- Header -->
  <h2 class="header" style="text-align: center;">TRAIN DEPARTURE <br><br> ASSISTANCE </h2>
  <br>

  <div class="login-form-container">
    <label class="email-label" for="email">EMAIL:</label>
    <div class="input-field">
      <input type="text" id="email" bind:value={email} placeholder="Enter your email" class="rounded-input">
    </div>
    <!-- Display error message -->
    

    <div class="login-form-container">
      <label class="password-label" for="password">PASSWORD:</label>
      <div class="input-field">
        <input type="password" id="password" bind:value={password} placeholder="Enter your password" class="rounded-input">
      </div>
    </div>

    {#if loginErrorMessage}
      <p class="error-message">{loginErrorMessage}</p>
    {/if}

  <!-- Red Button group -->
<div class="button-group">
  <button class="red-button" on:click={register}>Sign up</button>
  <button class="red-button" on:click={login}>Login</button>
</div>


    <!-- GitHub button with icon -->
    <div class="centered-button">
      <button class="github-button" on:click={()=>signInGitHub()}>
        <div class="icon-container">
          <img src="/images/github_icon.png" alt="GitHub Icon" class="icon">
        </div>
        Login with GitHub
      </button>
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: 'Quicksand';
    src: url('./fonts/Quicksand-Regular.ttf') format('truetype');  
    font-weight: normal;
    font-style: normal;
  }

  
  .header {
    margin-bottom: 10px;  
    font-size: xx-large;
  }
  .login-side {
    font-family: 'Quicksand', sans-serif; 
    flex: 1;
    background-color: rgb(37, 37, 37);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;  
  }

  .logo {
    font-family: 'Quicksand', sans-serif; 
    height: 25%;
    width: 25%;
    max-width: 100%;  
  }

  input {
    margin: 5px 0;
    padding: 8px;
    width: 100%;  
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 14px;
    color:black;
  }

  .button-group {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    margin: 5px;
    padding: 10px;
    box-sizing: border-box;
    min-width: 150px;
  }

  .red-button {
    background-color: rgb(151, 14, 14);
    color: white;
  }

  .centered-button {
    flex: 1; 
    text-align: center;
  }

  .github-button {
    background-color: rgb(26, 26, 27); 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 70px;
  }

  .icon-container {
    margin-right: 8px;  
  }

  .icon {
    width: 20px;  
    height: 20px; 
  }

  .error-message {
  color: red;
  margin-top: 10px;
  margin-left: 75px;
}
</style>