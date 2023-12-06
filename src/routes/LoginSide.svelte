<script>
import github_icon from '$lib/images/github_icon.png';
</script>

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




<div class="login-side">
  <!-- Image logo -->
  <img class="logo" src="https://puffingbilly.com.au/wp-content/uploads/PTV.jpeg" alt="PTV Logo" />
<br>
  <!-- Header -->
  <h2 class="header" style="text-align: center;">TRAIN DEPARTURE <br><br> ASSISTANCE </h2>
<br>
  <div class="login-form-container">
    <label class="username-label" for="username">USERNAME:</label>
    <div class="input-field">
      <input type="text" id="username" name="username" placeholder="Enter your username" class="rounded-input">
    </div>

    <div class="login-form-container"> 
      <label class="password-label" for="password">PASSWORD:</label>
      <div class="input-field">
        <input type="password" id="password" name="password" placeholder="Enter your password" class="rounded-input">
      </div>
    </div>
    

    <!-- Red Button group -->
    <div class="button-group">
      <button class="red-button">Sign Up</button>
      <button class="red-button">Login</button>
    </div>

<!-- GitHub button with icon -->
<div class="centered-button">
  <button class="github-button">
    <div class="icon-container">
      <img src={github_icon} alt="GitHub Icon" class="icon">
    </div>
    Login with GitHub
  </button>
</div>

</div>
</div>
