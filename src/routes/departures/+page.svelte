
<script lang="ts">

import { Autocomplete } from '@skeletonlabs/skeleton';
import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
import axios from "axios";
import { onMount } from "svelte";
import { popup } from '@skeletonlabs/skeleton';

let allStations: App.Station[];
let stationOptions: AutocompleteOption<string>[]
let selectedStation: App.Station | undefined;
let inputStation = '';
let departureRoutes: any[];
let nextDepartures: any[];

const popupClick: PopupSettings = {
  event: 'click',
  target: 'popupClick',
  placement: 'bottom'
};

const getDepartures = async () => {
  if (selectedStation) {
    try {
      const request = await axios.post("/api/get-departures", {
        stopId: selectedStation.stopId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      departureRoutes = request.data.uniqueDirections;
      const nextDeparturesRes = request.data.nextDepartures;

      const currentTime = new Date().getTime();
      const departuresWithTime = nextDeparturesRes.map((departure: any) => {
        const scheduledDepartureTime = new Date(departure.scheduled_departure_utc).getTime();
        const timeUntilDeparture = Math.floor((scheduledDepartureTime - currentTime) / 60000); // Convert to minutes

        return {
          platform_number: departure.platform_number,
          time_until_departure: timeUntilDeparture,
          direction_id: departure.direction_id,
        };
      });

      nextDepartures = departuresWithTime;
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  }
}



			

const onStationSelection = async (event: CustomEvent<AutocompleteOption<string>>)  => {
    selectedStation = await allStations.find((station: App.Station) => station.stopId.toString() === event.detail.value);

   await getDepartures();
    inputStation = "";
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

    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    
  }
});


</script>


<div>
    <button class="btn variant-filled" use:popup={popupClick}>{selectedStation ? selectedStation.stopName : "Select a station"}</button>
    
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupClick">
    <input class="input" type="search" name="demo" bind:value={inputStation} placeholder="Search..." />

	<Autocomplete bind:input={inputStation} options={stationOptions} on:selection={onStationSelection} />
</div>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Destination</th>
   
          <th>Departing</th>
          <th>Departing</th>
          <th>Departing</th>
          <th>Departing</th>
          <th>Departing</th>

    
			
			</tr>
		</thead>
    {#if departureRoutes}
    {#each departureRoutes as route}
      <tbody>
        <tr>
          <td>{route.direction_name}</td>
          {#each nextDepartures.filter(dep => dep.direction_id === route.direction_id).sort((a, b) => a.time_until_departure - b.time_until_departure) as departure}
            <td>
              <span class="flex flex-col text-center">
              {departure.time_until_departure !== 0 ? `${departure.time_until_departure} min` : "Now"}
              <p>Platform: {departure.platform_number}</p>
              </span>
            </td>
          {/each}
        </tr>
      </tbody>
    {/each}
  {/if}
		
 
	
	</table>
</div>



</div>