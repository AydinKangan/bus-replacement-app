<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import supabase from "$lib/supabase";


  let weather: any;
  let userId: string | undefined;
  let firstName = '';


onMount(async () => {
  try {
    const res = await axios.get("/api/get-weather");

    if (res.data) {
      weather = res.data;

    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    
  }
});

$: {
  const getUser = async () => {
    const user = await supabase.auth.getUser();

    
      userId = user.data.user?.id;
    
    
  };
  getUser();
  if (userId) {
    supabase
      .from("user-data")
      .select("*")
      .eq("user_id", userId)
      .then((res) => {
        if (res.data?.length) {
          const user: any = res.data[0];
          firstName = user.first_name;
          
        }
      })

  }
}

</script>

<div>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .navbar {
            background-color: #000000;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .weather-time {
            display: flex;
            align-items: center;
        }

        .weather-time-text {
            margin-left: 20px;
        }
    </style>
    <title>Custom Bar</title>
</head>
<body>

    <div class="navbar">
        <div>{firstName ? `Welcome ${firstName}`: ""}</div>
        <div class="weather-time">
            <div class="weather-time-text">{weather ? weather.main.temp : "Loading..."} °C</div>
            <div class="weather-time-text" id="time"></div>
        </div>
    </div>

    <script>
        function updateTime() {
            var currentTime = new Date();
            var hours = currentTime.getHours() % 12 || 12;
            var minutes = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
            var ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

            var timeString = hours + ':' + minutes + ' ' + ampm;
            document.getElementById('time').textContent = timeString;
        }

        updateTime();

        setInterval(updateTime, 1000);
    </script>

</body>

</div>