
<script lang="ts">

import { Autocomplete } from '@skeletonlabs/skeleton';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';
  import axios from "axios";
  import { onMount } from "svelte";

  let allStations: App.Station[];
  let stationOptions: AutocompleteOption<string>[]
  let selectedStation: App.Station;
  let inputStation = '';


const flavorOptions: AutocompleteOption<string>[] = [
	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
];
				


function onStationSelection(event: CustomEvent<AutocompleteOption<string>>): void {
	inputStation = event.detail.label;
}
				


onMount(async () => {
  try {
    const res = await axios.get("/api/get-all-stations");

    if (res.data) {
      allStations = res.data;

      stationOptions = allStations.map((station: App.Station) => {
        return {
          label: station.stopName,
          value: station.stopId.toString(),
          keywords: `${station.stopName}, ${station.stopId}, ${station.stopSuburb}`,
        };
      });

      console.log(stationOptions);
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    // Handle the error as needed, e.g., show a user-friendly message.
  }
});


</script>


<div>
    <input class="input" type="search" name="demo" bind:value={inputStation} placeholder="Search..." />
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
	<Autocomplete bind:input={inputStation} options={stationOptions} on:selection={onStationSelection} />
</div>

</div>