<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    Autocomplete,
    popup,
    type AutocompleteOption,
    type PopupSettings,
  } from "@skeletonlabs/skeleton";
  import axios from "axios";
  import { MousePointerSquare } from "lucide-svelte";
  import { onMount } from "svelte";
  import supabase from "$lib/supabase";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  let allStations: App.Station[];
  let stationOptions: AutocompleteOption<string>[];
  let selectedStation: App.Station | undefined;
  export let userId: string | undefined;
  let inputStation = "";
  let error = false;
  let firstName = "";
  let loading = false;

  let isSmallScreen = false;

  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    isSmallScreen = mediaQuery.matches;

    const handleResize = (event: any) => {
      isSmallScreen = event.matches;
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  });

  function handleSubmit() {
    if (!firstName || !selectedStation) {
      error = true;
    } else {
      error = false;
      if (userId) {
        loading = true;
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
        loading = false;
      }
    }
  }

  const popupClick: PopupSettings = {
    event: "click",
    target: "popupClick",
    placement: "bottom",
  };

  onMount(async () => {
    try {
      loading = true;
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
    } finally {
      loading = false;
    }

    if (userId) {
      loading = true;
      supabase
        .from("user-data")
        .select("*")
        .eq("user_id", userId)
        .then((res) => {
          if (res.data?.length) {
            const user: any = res.data[0];
            firstName = user.first_name;
            selectedStation = allStations.find(
              (station: App.Station) => station.stopId === user.stop_id
            );
          }
        });
      loading = false;
    }
  });

  const onStationSelection = async (
    event: CustomEvent<AutocompleteOption<string>>
  ) => {
    selectedStation = await allStations.find(
      (station: App.Station) => station.stopId.toString() === event.detail.value
    );
    // console.log(selectedStation)
    inputStation = "";
  };
</script>

<!-- The form -->
<div class="old-form">
  <label
    class={firstName === "" && error ? "text-red-600" : "text-black"}
    for="firstName">First Name</label
  >
  <div class="flex w-[full] justify-center items-center">
    {#if loading}
      <div class="flex w-4 h-auto">
        <ProgressRadial />
      </div>
    {:else}
      <input
        class="border-2 text-black outline-none {firstName === '' && error
          ? 'border-red-600'
          : 'border-black'}"
        type="text"
        id="firstName"
        bind:value={firstName}
      />
    {/if}
  </div>
  <label
    class={selectedStation === undefined && error
      ? "text-red-600"
      : "text-black"}
    for="stationName">Station Name</label
  >

  <div>
    <button
      disabled={loading}
      class="select-station-btn w-full {loading
        ? '!cursor-not-allowed opacity-50'
        : ''}"
      use:popup={popupClick}
    >
      {#if loading}
        <div class="flex w-4 h-auto">
          <ProgressRadial />
        </div>
      {:else}
        <span class="mr-2">
          {selectedStation ? selectedStation.stopName : "Select a station"}
        </span>
        <MousePointerSquare class="w-5 h-5 " />
      {/if}
    </button>
    <div
      class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto rounded"
      tabindex="-1"
      data-popup="popupClick"
    >
      <input
        class="input h-8 pl-3"
        type="search"
        name="demo"
        bind:value={inputStation}
        placeholder="Search..."
      />
      <Autocomplete
        bind:input={inputStation}
        options={stationOptions}
        on:selection={onStationSelection}
      />
    </div>
  </div>
  <button
    disabled={loading}
    class=" {loading ? '!cursor-not-allowed opacity-50' : ''} {isSmallScreen
      ? 'w-full'
      : ''}"
    on:click={handleSubmit}>Submit</button
  >
</div>

<style>
  /* Add your styles here */
  .select-station-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #000000; /* Example color */
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .select-station-btn:hover {
    background-color: #b92929; /* Example color on hover */
  }

  .old-form {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    width: 17rem;
  }

  label {
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%; /* Make the input boxes full width */
    border-radius: 5px; /* Rounded corners */
  }

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
