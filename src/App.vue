<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div id="myMap"></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }},
  mounted: function() {
    const map = new google.maps.Map(document.getElementById('myMap'), {
      center: {lat:55.7829702, lng: 49.1059532},
      scrollwheel: false,
      zoom: 12
    });

    const infoWindow = new google.maps.InfoWindow();

    const image =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    let marker = new google.maps.Marker({
      position: {lat:55.7829702, lng: 49.1059532},
      map,
      title: "Hello World!",
      icon: image,
      label: "keker"
    });

    const contentString = `
        <div id="content">
        <div id="siteNotice">
        </div>
        <h1 id="firstHeading" class="firstHeading">Пункт приема стеклотары</h1>
        <div id="bodyContent">
        <img src="https://recyclemap.ru/images/org_img/23191_20190904-220652_1.jpg"/>
        <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
        sandstone rock formation in the southern part of the
        Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
        south west of the nearest large town, Alice Springs; 450&#160;km
        (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
        features of the Uluru - Kata Tjuta National Park. Uluru is
        sacred to the Pitjantjatjara and Yankunytjatjara, the
        Aboriginal people of the area. It has many springs, waterholes,
        rock caves and ancient paintings. Uluru is listed as a World
        Heritage Site.</p>
        <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
        https://en.wikipedia.org/w/index.php?title=Uluru</a>
        (last visited June 22, 2009).</p>
        </div>
        </div>"
    `;


    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(contentString);
      infoWindow.open(marker.getMap(), marker);
    });


  }

}
</script>
<style scoped>
#myMap {
  height:600px;
  width: 50%;
  margin-left: auto;
}
</style>