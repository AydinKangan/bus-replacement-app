<script lang=ts>
 import LoginSide from './LoginSide.svelte';
 import ImageSide from './ImageSide.svelte';
</script>

<style> 
.split-screen {
    display: flex;
    height: 100vh;  

  }
</style>

  <div class="split-screen justify-between">
	<LoginSide />
	<ImageSide />
  </div>

 