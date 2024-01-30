
<script lang="ts">
import { Autocomplete, ProgressRadial } from '@skeletonlabs/skeleton';
import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
import axios from "axios";
import { onMount } from "svelte";
import { popup } from '@skeletonlabs/skeleton';
import { MousePointerSquare } from 'lucide-svelte';
 


let allStations: App.Station[];
let stationOptions: AutocompleteOption<string>[]
let selectedStation: App.Station | undefined;
let inputStation = '';
let departureRoutes: any[];
let nextDepartures: any[];
let loading = false;

let userId: string | undefined;

  import Header from '$lib/header.svelte';
  import supabase from '../supabase';
  import { goto } from '$app/navigation';



const popupClick: PopupSettings = {
  event: 'click',
  target: 'popupClick',
  placement: 'bottom'
};

const getDepartures = async () => {
  if (selectedStation) {
    try {
      loading = true;
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
    } finally {
      loading = false;
    }
  } 
}



			

const onStationSelection = async (event: CustomEvent<AutocompleteOption<string>>)  => {
    try {
    loading = true;

    selectedStation = await allStations.find((station: App.Station) => station.stopId.toString() === event.detail.value);

    if (userId) {
    supabase
      .from("user-data")
      .select("*")
      .eq("user_id", userId)
      .then((res) => {
        // console.log(res.data?.length);
        if (res.data?.length) {
          // Update existing row
          supabase
            .from("user-data")
            .update({
              stop_id: selectedStation?.stopId,
              stop_lat: selectedStation?.stopLat,
              stop_lon: selectedStation?.stopLon,
              stop_name: selectedStation?.stopName,
            })
            .eq("user_id", userId)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
              } else {
                console.log(res);
              }
            });
        } 
      });
    }

    await getDepartures();
    inputStation = "";
  } catch (error) {
    console.error("Error while making the request:", error);
  } finally {
    loading = false;
  }
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
    await getUser();
  
    
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    
  }
});

const getUser = async () => {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      goto(`/`);
    } else {
      userId = user.data.user?.id;
      if (userId) {
      await supabase
      .from("user-data")
      .select("*")
      .eq("user_id", userId)
      .then((res) => {
        if (res.data?.length) {
          const user: any = res.data[0];          
          selectedStation = allStations.find((station: App.Station) => station.stopId === user.stop_id);
          getDepartures();
        }
      })

      let userTheme: string;
      await supabase
            .from("user-data")
            .select("*")
            .eq("user_id", userId)
            .then((res) => {
                if (res.data?.length) {
                userTheme = res.data[0].selected_theme
                document.body.setAttribute('data-theme', userTheme);
                }
            })
      }
    }
    
  
}

</script>


<div>
  <Header />
  {#if userId}
  <div class="pl-[4rem] pt-[2rem]">
    <button class="btn variant-filled rounded" use:popup={popupClick}>
      <span class="mr-2">
        {selectedStation ? selectedStation.stopName : "Select a station"}
      </span>
      <MousePointerSquare class="w-5 h-5" /></button>
    <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupClick">
      <input class="input h-8 pl-3" type="search" name="demo" bind:value={inputStation} placeholder="Search..." />
      <Autocomplete bind:input={inputStation} options={stationOptions} on:selection={onStationSelection} />
    </div>
  </div>
    <div class="table-container px-[4rem] py-[2rem]">
      {#if departureRoutes}
        <table class="table table-hover rounded">
          <thead>
            <tr class="">
              <th class="text-center">Destination</th>
              <th class="text-center">Departing</th>
              <th class="text-center">Departing</th>
              <th class="text-center">Departing</th>
              <th class="text-center">Departing</th>
              <th class="text-center">Departing</th>
            </tr>
          </thead>
          {#if !loading}
            {#each departureRoutes as route}
              {#if nextDepartures.filter(dep => dep.direction_id === route.direction_id).length > 0}
                <tbody>
                  <tr>
                      <td class="flex flex-col text-center justify-center"><span class="mt-3">{route.direction_name}</span></td>
                    {#each nextDepartures.filter(dep => dep.direction_id === route.direction_id).sort((a, b) => a.time_until_departure - b.time_until_departure) as departure}
                      <td>
                        <span class="flex flex-col text-center">
                          {departure.time_until_departure !== 0 ? `${departure.time_until_departure} min` : "Now"}
                          <p>Platform: {departure.platform_number === null ? "Not Found" : departure.platform_number}</p>
                        </span>
                      </td>
                    {/each}
                  </tr>
                </tbody>
              {/if}
            {/each}
          {/if}
        </table>
      {:else}
        <div class="flex justify-center items-center h-[50vh]">
          <ProgressRadial />
        </div>
      {/if}
      
    </div>
  {/if }
  
</div>
