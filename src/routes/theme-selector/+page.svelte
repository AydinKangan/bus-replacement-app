<script>
    import { theme } from "../../theme";


    const skeletonTheme = () => {
        theme.update(val => val = "skeleton")
    }
</script>

<div>
    <button on:click={skeletonTheme} data-theme={themeContent}>
        skeleton Theme
    </button>
</div>