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
   .select-station-btn {
    padding: 0.5rem 1rem;
    background-color: #000000; /* Example color */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
    margin-left: -35px;
    margin-bottom: 50px;
  }

  .select-station-btn:hover {
    background-color: #b92929; /* Example color on hover */
  }
  /* Add your styles here */
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  form {
    width: 300px; /* Adjust the width as needed */
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 200px;
  }

  label {
    margin-bottom: 0.5rem;
    display: block;
    color:black;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%; /* Make the input boxes full width */
    border: 1px solid #000000;
    border-radius: 5px; /* Rounded corners */
    color: rgb(7, 7, 7)  }

  button {
    padding: 0.5rem 1rem;
    background-color: rgb(141, 11, 8);
    color: white;
    border: none;
    border-radius: 5px; /* Rounded corners */
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(220, 16, 16);
  }
</style>

<!-- The form -->
<main>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" bind:value={firstName} />

    <label for="stationName">Station Name</label>
    <div class="pl-[4rem] pt-[2rem]">
      <button class="select-station-btn" use:popup={popupClick}>
        <span class="mr-2">
          {selectedStation ? selectedStation.stopName : "Select a station"}
        </span>
        <MousePointerSquare class="w-5 h-5" />
      </button>
      <div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupClick">
        <input class="input h-8 pl-3" type="search" name="demo" bind:value={inputStation} placeholder="Search..." />
        <Autocomplete bind:input={inputStation} options={stationOptions} on:selection={onStationSelection} />
      </div>
    </div>

    <button type="submit">Submit</button>
  </form>
</main>
