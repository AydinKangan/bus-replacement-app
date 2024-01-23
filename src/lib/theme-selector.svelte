<script lang="ts">
  import supabase from "../routes/supabase";

    export let user: any

    const themes: string[] = ["ptvTheme", "skeleton", "wintry", "modern", "hamlindigo", "rocket", "sahara", "gold-nouveau", "vintage", "seafoam", "crimson"];

    const changeTheme = (theme: string) => {
        if (user) {
        const userId = user.data.user?.id;
    supabase
      .from("user-data")
      .select("*")
      .eq("user_id", userId)
      .then((res) => {
        // console.log(res.data?.length);
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

<div class="max-w-[50%]">
    {#each themes as theme}
        <button class="btn variant-filled" on:click={() => changeTheme(theme)}>
            {theme}
        </button>
    {/each}
</div>