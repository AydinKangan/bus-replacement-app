<script lang="ts">

    import Userform from "./userform.svelte";
    import Header from "$lib/header.svelte";
    import ThemeSelector from "$lib/theme-selector.svelte";
    import { onMount } from "svelte";
    import supabase from "../supabase";
    import { goto } from "$app/navigation";

    let user: any;

    onMount(async () => {
        const loggedUser = await supabase.auth.getUser();

        if (!loggedUser.data.user) {
        goto(`/`);

        } else {
        user = loggedUser
        }
        document.body.setAttribute('data-theme', "ptvTheme");
    })

</script>

<div> 
    <div>
        <Header />
        {#if user}
            <div class="flex flex-row justify-evenly">
                    <Userform userId={user.data.user?.id}/> 
                    <ThemeSelector />
            </div>
        {/if}
    </div>
</div>

 
