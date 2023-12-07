<script>
  let firstName = '';
  let stationName = '';

  function handleSubmit() {
    // You can handle the form submission logic here
    console.log('Submitted:', { firstName, stationName });
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
    <input type="text" id="stationName" bind:value={stationName} />

    <button type="submit">Submit</button>
  </form>
</main>
