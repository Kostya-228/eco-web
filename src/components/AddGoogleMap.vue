<template>
  <div>
    <div>
      <h2>Eco Hub</h2>
    </div>
    <br>
    <gmap-map
        :zoom="zoom"
        :center="center"
        style="width:100%;  height: 600px;"
    >
      <gmap-info-window
          :options="infoOptions"
          :position="infoPosition"
          :opened="infoOpened"
          @closeclick="infoOpened=false">
      </gmap-info-window>
      <gmap-marker
          :key="index"
          v-for="(m, index) in locationMarkers"
          :position="m.position"
          :icon="m.icon"
          :title="m.name"
          :clickable="true"
          @click="toggleInfoWindow(m, index)"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: {
        lat:55.7829702,
        lng: 49.1059532
      },
      zoom: 12,
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      rec_points: [],

      infoContent: 'hello',
      infoPosition: {
        lat: 0,
        lng: 0
      },
      infoOpened: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        },
        content: "hello"
      },
      };
  },
  mounted() {
    this.locateGeoLocation();
    axios
        .get('https://recyclehub.ru:5000/api/rec_points?position=[55.799779,49.1319283]&radius=100')
        .then(response => {
          this.addLocationMarker(response.data);
        });

  },

  methods: {
    addLocationMarker(data) {
      this.locationMarkers = [];
      data.forEach(rec_point => {
        this.locationMarkers.push({
          position: {
            lat: rec_point.coords[0],
            lng: rec_point.coords[1]
          },
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          ...rec_point,
        });
      })
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoPosition = marker.position;

      axios
          .get(`https://recyclehub.ru:5000/api/rec_points/${marker.id}`)
          .then(response => {
            this.infoOptions.content = this.getInfoWindowContent(response.data);
          });
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoOpened = !this.infoOpened;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoOpened = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent: function (marker) {
      const default_image = "https://bulma.io/images/placeholders/96x96.png";
      const image = marker.images[0] || marker.external_images[0] || default_image;
      return (`
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="${image}" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${marker.name}</p>
              </div>
            </div>
            <div class="content">
              ${marker.description || "Нет описания"}
              <br>
<!--              <time datetime="2016-1-1">${marker.date}</time>-->
            </div>
          </div>
        </div>
    `);
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    }
  }
};
</script>