<script>

    import Userform from "./userform.svelte";
    import Header from "$lib/header.svelte";
    import ThemeSelector from "$lib/theme-selector.svelte";
  import { onMount } from "svelte";

    onMount(() => {
        document.body.setAttribute('data-theme', "ptvTheme");
    })

</script>

<div> 
    <div>
        <Header />
        <div class="flex flex-row justify-evenly">
            <Userform />
            <ThemeSelector />
        </div>
    </div>
</div>

 
