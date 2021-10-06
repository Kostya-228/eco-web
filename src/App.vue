<template>
  <div id="app">
    <div>
      <h2>RecycleHub</h2>
    </div>
    <AddGoogleMap />
  </div>
</template>

<script>
import AddGoogleMap from "./components/AddGoogleMap";

export default {
  // name: 'App',
  data() {
    return {
      name: 'BootstrapVue',
      show: true
    }
  },
  components: {
    AddGoogleMap
  },
  methods: {
    toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    }
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
</style>