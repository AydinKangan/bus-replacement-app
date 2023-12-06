<script>
  import { onMount } from 'svelte';
  import supabase from './supabase.js';

  let email = '';
  let password = '';

  // Function for traditional email/password login
  async function emailLogin() {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      console.log('User logged in:', user);
      // Add redirect or further actions here
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Add user feedback for error
    }
  }

  // Function for GitHub OAuth login
  async function loginWithGitHub() {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github'
      });

      if (error) throw error;
      console.log('User logged in:', user);
      // Add redirect or further actions here
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Add user feedback for error
    }
  }

  // Function to handle user sign up
  async function signUp() {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;
      console.log('User signed up:', user);
      // Add redirect or further actions here
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Add user feedback for error
    }
  }

  onMount(() => {
    // Additional onMount actions if necessary
  });
</script>

<div class="login-side">
  <!-- Image logo and other elements... -->
  
  <div class="login-form-container">
    <!-- Email and password input fields... -->

    <!-- Red Button group -->
    <div class="button-group">
      <button class="red-button" on:click={signUp}>Sign up</button>
      <button class="red-button" on:click={emailLogin}>Login</button>
    </div>

    <!-- GitHub button with icon -->
    <div class="centered-button">
      <button class="github-button" on:click={loginWithGitHub}>
        <!-- GitHub button content... -->
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
</style>