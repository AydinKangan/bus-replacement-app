<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import supabase from "$lib/supabase";

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    goto("/");
  };

  const toProfile = async () => {
    goto("/user");
  };

  let isSmallScreen = false;

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 780px)");
    isSmallScreen = mediaQuery.matches;

    const handleResize = (event: any) => {
      isSmallScreen = event.matches;
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  });
</script>

<div class="page-container">
  <!-- LOGO MANAGEMENT -->
  <div class="top-bar">
    <a href="https://www.ptv.vic.gov.au/">
      <img
        src="/images/Public_Transport_Victoria_logo.png"
        alt="PTV logo"
        class="logo {isSmallScreen ? 'w-[8rem]' : 'w-[12rem]'}"
      />
    </a>
    {#if !isSmallScreen}
      <img
        src="/images/Melbournecity.jpeg"
        alt="melbourne city"
        class="melb-image"
      />
    {/if}

    <!-- Profile and Log Out buttons -->
    <div
      class="flex items-center {isSmallScreen
        ? 'flex-col-reverse space-x-0 gap-4'
        : 'flex-row space-x-2'}"
    >
      <div class="flex flex-row space-x-2 items-center">
        <button on:click={toProfile} class="profile-button">Profile</button>
        <div class="icon-container">
          <img
            src="/images/profile_icon.png"
            alt="profile icon"
            class="profile-icon"
          />
        </div>
      </div>
      <button on:click={logout} class="logout-button">LOG OUT</button>
    </div>
  </div>

  <!-- the black divider -->
  <div class="bottom-bar"></div>
</div>

<style>
  /* TOP BAR */
  .top-bar {
    background-color: hsl(0, 0%, 100%);
    padding: 0px 16px;
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
  }

  /* melbourne banner */
  .melb-image {
    width: 50%;
    height: 100%;
    margin-left: 50px;
    margin-right: 100px;
    clip-path: polygon(10% 0, 100% 0, 50% 600%, 0% 100%);
    object-fit: cover;
  }

  /* Profile and Log Out buttons */

  .profile-icon {
    width: 25px;
    height: auto;
  }

  .profile-button {
    text-decoration: underline;
    cursor: pointer;
  }

  .logout-button {
    padding: 5px;
    width: 130px;
    background-color: rgb(0, 0, 0); /* Adjust the color */
    color: #fff;
    font-size: small;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .logout-button:hover {
    background-color: #cc3434;
  }
</style>
