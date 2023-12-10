<script lang='ts'>
  import { goto } from "$app/navigation";
  import { Autocomplete, popup, type AutocompleteOption, type PopupSettings } from "@skeletonlabs/skeleton";
  import axios from "axios";
  import { MousePointerSquare } from "lucide-svelte";
  import { onMount } from "svelte";
  import supabase from "../supabase";

  let allStations: App.Station[];
  let stationOptions: AutocompleteOption<string>[]
  let selectedStation: App.Station | undefined;
  let userId: string | undefined;
  let inputStation = '';

  let firstName = '';

  function handleSubmit() {
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
              first_name: firstName,
              stop_id: selectedStation?.stopId,
              stop_lat: selectedStation?.stopLat,
              stop_lon: selectedStation?.stopLon,
              stop_name: selectedStation?.stopName,
            })
            .eq("user_id", userId)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                goto(`/departures`);
              } else {
                console.log(res);
              }
            });
        } else {
          // Add new row
          supabase
            .from("user-data")
            .insert([
              {
                first_name: firstName,
                user_id: userId,
                stop_id: selectedStation?.stopId,
                stop_lat: selectedStation?.stopLat,
                stop_lon: selectedStation?.stopLon,
                stop_name: selectedStation?.stopName,
              },
            ])
            .then((res) => {
              if (res.status >= 200 && res.status < 300) {
                goto(`/departures`);
              } else {
                console.log(res);
              }
            });
        }
      });
    }
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

    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      goto(`/`);
    
    } else {
      userId = user.data.user?.id;
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    
  }

  if (userId) {
    supabase
      .from("user-data")
      .select("*")
      .eq("user_id", userId)
      .then((res) => {
        if (res.data?.length) {
          const user: any = res.data[0];
          firstName = user.first_name;
          selectedStation = allStations.find((station: App.Station) => station.stopId === user.stop_id);
        }
      })

  }
});

const onStationSelection = async (event: CustomEvent<AutocompleteOption<string>>)  => {
    selectedStation = await allStations.find((station: App.Station) => station.stopId.toString() === event.detail.value);
    // console.log(selectedStation)
    inputStation = "";
}

</script>






<!-- The form -->
<main>
  <div class="old-form">
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

    <button on:click={handleSubmit}>Submit</button>
  </div>
</main>


<style>
  /* Add your styles here */
  .select-station-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    
   padding: 0.5rem 1rem;
   background-color: #000000; /* Example color */
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
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

 .old-form {
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