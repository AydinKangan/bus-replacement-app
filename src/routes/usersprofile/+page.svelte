<script lang="ts">
  import Userform from "./userform.svelte";
  import Header from "$lib/header.svelte";
  import ThemeSelector from "$lib/theme-selector.svelte";
  import { onMount } from "svelte";
  import supabase from "../supabase";
  import { goto } from "$app/navigation";

  let user: any;
  let isSmallScreen = false;

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    isSmallScreen = mediaQuery.matches;

    const handleResize = (event: any) => {
      isSmallScreen = event.matches;
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  });

  onMount(async () => {
    const loggedUser = await supabase.auth.getUser();

    if (!loggedUser.data.user) {
      goto(`/`);
    } else {
      user = loggedUser;
      let userTheme: string;
      const userId = user.data.user?.id;
      if (userId) {
        supabase
          .from("user-data")
          .select("*")
          .eq("user_id", userId)
          .then((res) => {
            if (res.data?.length) {
              userTheme = res.data[0].selected_theme;
              document.body.setAttribute("data-theme", userTheme);
            }
          });
      }
    }
  });
</script>

<div>
  <div>
    <Header />
    {#if user}
    <div
        class="flex flex-row justify-evenly items-center {isSmallScreen ? 'flex-col space-y-10 py-6' : 'flex-row space-x-4'}"
        style="{!isSmallScreen ? 'height: calc(100vh - 204px)' : ''}"
    >
        <Userform userId={user.data.user?.id} />
        <ThemeSelector {user} />
      </div>
    {/if}
  </div>
</div>

<style>
</style>
