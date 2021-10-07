<template>
  <div id="app" style="
    background-image: url(header-bg.png);
    background-repeat: no-repeat;
    background-color: #d5dee6;
  ">
    <Header/>
    <AddGoogleMap/>
    <Footer/>
  </div>
</template>

<script>
import AddGoogleMap from "./components/AddGoogleMap"
import Header from "./components/Header"
import Footer from "./components/Footer";

export default {
  // name: 'App',
  data() {
    return {
      name: 'BootstrapVue',
      show: true
    }
  },
  components: {
    AddGoogleMap, Header,Footer
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