<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let weather: any;


onMount(async () => {
  try {
    const res = await axios.get("/api/get-weather");

    if (res.data) {
      weather = res.data;

      console.log(weather);

    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    
  }
});

</script>

<div>
    weather bar
</div>