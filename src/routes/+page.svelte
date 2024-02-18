<script lang=ts>
 import LoginSide from '$lib/home-page/login-side.svelte';
 import ImageSide from '$lib/home-page/image-side.svelte';
 import { onMount } from 'svelte';

 let isSmallScreen = false;

 onMount(() => {
   const mediaQuery = window.matchMedia('(max-width: 850px)');
   isSmallScreen = mediaQuery.matches;

   const handleResize = (event: any) => {
     isSmallScreen = event.matches;
   };

   mediaQuery.addEventListener('change', handleResize);

   return () => {
     mediaQuery.removeEventListener('change', handleResize);
   };
 });
</script>

{#if !isSmallScreen}
  <div class="split-screen justify-between">
    <LoginSide />
    <ImageSide />
  </div>
{:else}
  <div class="split-screen">
    <LoginSide />
  </div>
{/if}

<style> 
  .split-screen {
    display: flex;
    height: 100vh;  
  }
</style>
