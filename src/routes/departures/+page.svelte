
<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let stations: App.Station;
  let selectedStation: App.Station;


onMount( async () => {
    const res = await axios.get("/api/get-all-stations");
    
    
    if (res.data.success) {
      stations = res.data.stations;
    }
})

</script>


<div>
    
</div>