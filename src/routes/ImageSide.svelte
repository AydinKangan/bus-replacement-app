<!-- ImageSide.svelte -->
<script>
    import team_busreplacements from '$lib/images/team_busreplacements.png';
    // Your component logic here
  </script>
  
  <style>
    .image-side {
      position: relative; /* Set position to relative */
      background-color: #070707;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      width: 50%;
    }
  
    .image-side img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  
    .icon {
      position: absolute; /* Set position to absolute */
      bottom: 10px; /* Adjust the bottom distance as needed */
      right: 10px; /* Adjust the right distance as needed */
      width: 120px; /* Set the width of the icon */
      height: 120px; /* Set the height of the icon */
 
    }
  </style>
  
  <div class="image-side">
    <img src="https://image-tc.galaxy.tf/wijpeg-4ydev2sqhfz7kw1hv6pfgujui/152831-56.jpg" alt="Image of Flinders Street station" />
    
    <!-- Icon in the bottom right corner -->
    <div class="icon">
      <!-- Your icon content or image here -->
      <img src="/images/team_busreplacements.png" alt="team logo" class="icon">
    </div>
  </div>
  