 
<div class="page-container">
    <!-- LOGO MANAGEMENT -->
    <div class="top-bar">
      <a href="https://www.ptv.vic.gov.au/">
        <img src="/images/Public_Transport_Victoria_logo.png" alt="PTV logo" class="logo" />
      </a>
      <img src="/images/Melbournecity.jpeg" alt="melbourne city" class="melb-image" />
  
      <!-- Profile and Log Out buttons -->
      <div class="profile-buttons">
        <button class="profile-button">Profile</button>
        <div class="icon-container">
            <img src="/images/profile_icon.png" alt="profile icon" class="profile-icon">
          </div>
        <button class="logout-button">LOG OUT</button>
      </div>
    </div>
      <span></span>
    </div>
  </div>
  
  <style>
    /* TOP BAR */
    .top-bar {
      background-color: hsl(0, 0%, 100%);
      padding: 0px 20px;
      color: #333;
      display: flex;
      flex-direction: row;
      justify-content: space-between; /* Align buttons to the right */
      align-items: center; /* Center items vertically */
      height: 10rem;
    }
  
    /* LOGO SPACE */
    .logo {
      margin-top: -10px;
      margin-right: 10px;
      height: auto;
      width: 400px;
    }
  
    /* melbourne banner */
    .melb-image {
      width: 100%;
      height: 100%;
      margin-left: 50px;
      margin-right: 100px;
      clip-path: polygon(10% 0, 100% 0, 50% 600%, 0% 100%);
      object-fit: cover;
    }
  
    /* Profile and Log Out buttons */
    .profile-buttons {
      display: flex;
      gap: 10px;
      margin-top: -100px;
    }
    .profile-icon{
        width: 25px;  
        height:20px; 
        margin-top:10px;
    }

    .profile-button{
     text-decoration: underline;
     cursor: pointer;
     margin-top:-15px;
    }

    .logout-button {
      padding: 5px;
      margin-bottom: 20px;
      width: 130px;
      background-color: rgb(0, 0, 0); /* Adjust the color */
      color: #fff;
      font-size: small;
      border: none;
      border-radius: 10px;

      cursor: pointer;
    }
  
     
  </style>
  