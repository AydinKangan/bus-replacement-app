<script lang="ts">
  import supabase from "../routes/supabase";

  import ptvIcon from "$lib/ptv-icon.jpeg"
  export let user: any
  let selectedTheme: any = {};

  const themes = [
    { name: "ptvTheme", icon: "" },
    { name: "skeleton", icon: "💀" },
    { name: "wintry", icon: "🌨️" },
    { name: "modern", icon: "🤖" },
    { name: "hamlindigo", icon: "👔" },
    { name: "rocket", icon: "🚀" },
    { name: "sahara", icon: "🏜️" },
    { name: "gold-nouveau", icon: "💫" },
    { name: "vintage", icon: "📺" },
    { name: "seafoam", icon: "🧜‍♀️" },
    { name: "crimson", icon: "⭕" },
  ];

    

  const getCurrentTheme = async () => {
    let databaseTheme: string;
    await supabase
      .from("user-data")
      .select("*")
      .eq("user_id", user.data.user?.id)
      .then((res) => {
        if (res.data?.length) {
          databaseTheme = res.data[0].selected_theme;
          if (databaseTheme.length > 0) {
            selectedTheme = themes.find((t) => t.name === databaseTheme);

          } else {
            changeTheme("ptvTheme")
          }
        }
        
      });
  }
     
  if (user) {
    getCurrentTheme();
  }

    const changeTheme = (theme: string) => {
      selectedTheme = themes.find((t) => t.name === theme);
        if (user) {
        const userId = user.data.user?.id;
        supabase
          .from("user-data")
          .select("*")
          .eq("user_id", userId)
          .then((res) => {
            if (res.data?.length) {
              // Update existing row
              supabase
                .from("user-data")
                .update({
                  selected_theme: theme,
                })
                .eq("user_id", userId)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                  } else {
                    console.log(res);
                  }
                });
            } 
          });
        }
        document.body.setAttribute('data-theme', theme);
    }


</script>

<div class="max-w-[50%] max-h-[15rem] grid grid-cols-3 gap-4 mt-[5.25rem]">
    {#each themes as theme}
      <button class="btn {theme.name === selectedTheme.name ? 'variant-filled-surface' : 'variant-soft'} rounded-xl w-16 h-10" on:click={() => changeTheme(theme.name)}>
        <span class="flex items-center my-auto">
          {#if theme.name === "ptvTheme"}
            <img class="w-5 h-5" src={ptvIcon} alt="PTV Logo" />
          {:else}
            {theme.icon}
          {/if}
        </span>
      </button>
    {/each}
</div>