<script lang="ts">
    const themes: string[] = ["ptvTheme", "skeleton", "wintry", "modern", "hamlindigo", "rocket", "sahara", "gold-nouveau", "vintage", "seafoam", "crimson"];

    const changeTheme = (theme: string) => {
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