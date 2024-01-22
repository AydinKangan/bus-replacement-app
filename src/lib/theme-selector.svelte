<script lang="ts">
    const themes: string[] = ["ptvTheme", "skeleton", "wintry", "modern", "hamlindigo", "rocket", "sahara", "gold-nouveau", "vintage", "seafoam", "crimson"];

    const changeTheme = () => {
        document.body.setAttribute('data-theme', "crimson");
    }

</script>

<div>
    {#each themes as theme}
        <button class="btn variant-filled" on:click={() => document.body.setAttribute('data-theme', theme)}>
            {theme}
        </button>
    {/each}
</div>