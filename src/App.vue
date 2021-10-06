<template>
  <div id="app">
    <AddGoogleMap />
  </div>
</template>

<script>
import AddGoogleMap from "./components/AddGoogleMap";

export default {
  name: 'App',
  components: {
    AddGoogleMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 50px;
}

@import'~bootstrap/dist/css/bootstrap.css';
</style>