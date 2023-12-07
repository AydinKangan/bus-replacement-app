<script lang='ts'>
  import { goto } from "$app/navigation";
  import { Autocomplete, popup, type AutocompleteOption, type PopupSettings } from "@skeletonlabs/skeleton";
  import axios from "axios";
  import { MousePointerSquare } from "lucide-svelte";
  import { onMount } from "svelte";

  let allStations: App.Station[];
  let stationOptions: AutocompleteOption<string>[]
  let selectedStation: App.Station | undefined;
  let inputStation = '';

  let firstName = '';

  function handleSubmit() {
    console.log('Submitted:', { firstName, selectedStation });

    goto(`/departures`);
  }


  const popupClick: PopupSettings = {
  event: 'click',
  target: 'popupClick',
  placement: 'bottom'
};



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

const onStationSelection = async (event: CustomEvent<AutocompleteOption<string>>)  => {
    selectedStation = await allStations.find((station: App.Station) => station.stopId.toString() === event.detail.value);
    console.log(selectedStation)
    inputStation = "";
}
</script>




<style>
  /* Add your styles here */
  label {
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 200;
    color: black;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>

<!-- The form -->
<main>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" bind:value={firstName} />

    <label for="stationName">Station Name</label>
    <div class="pl-[4rem] pt-[2rem]">
      <button class="btn variant-filled" use:popup={popupClick}>
        <span class="mr-2">
          {selectedStation ? selectedStation.stopName : "Select a station"}
        </span>
        <MousePointerSquare class="w-5 h-5" /></button>
      <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupClick">
        <input class="input h-8 pl-3" type="search" name="demo" bind:value={inputStation} placeholder="Search..." />
        <Autocomplete bind:input={inputStation} options={stationOptions} on:selection={onStationSelection} />
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
</main>
