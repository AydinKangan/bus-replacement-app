<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });


	initializeStores();

</script>

	<Modal />
	<slot />

