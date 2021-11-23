<template>
  <div id="app">
    <Header/>
    <AddGoogleMap/>
    <News/>
    <Footer/>
  </div>
</template>

<script>
import AddGoogleMap from "./components/Map"
import Header from "./components/Header"
import Footer from "./components/Footer";
import News from "./components/News";

export default {
  name: 'App',
  components: {
    AddGoogleMap, Header, Footer, News
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
  background: url("assets/header-bg.png") no-repeat #d5dee6;
}
</style>