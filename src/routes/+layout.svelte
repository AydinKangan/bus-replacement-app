<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { theme } from '../theme';
  	import { onDestroy } from 'svelte';

	let themeContent = ""

	const unsubscribe = theme.subscribe(value => {
		themeContent = value
	})

	onDestroy(unsubscribe)
	
	console.log(themeContent)
			
</script>


<body class="h-[100vh]" data-theme={themeContent}>
	<slot />
</body>