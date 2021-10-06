<template>
  <div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <label>Тип ресурса</label>
            <!--             Пока не получилось отправлять запросы со списком параметров-->
            <!--
                        <multiselect v-model="selected_filters"
                                     :multiple="true"
                                     :searchable="true"
                                     :close-on-select="false"
                                     :options="filters.map(f => f.name)"
                                     placeholder="Выберите фильтр"
                                     title="Фильтр"
                        >
                        </multiselect>-->
            <b-form-select v-model="selected_filters"
                           :options="[{value: null, text: 'Нет фильтра'}].concat(
                               filters.map(f => ({value: f.id, text: f.name}))
                            )"
                           class="mb-2"/>
          </div>
          <div class="col-sm">
            <label>Тип переработки</label>
            <b-form-select v-model="reception_type"
                          text="Тип переработки"
                          :options="[
                              {value: null, text: 'Нет фильтра'},
                              {value: 'recycle', text: 'Переработка'},
                              {value: 'utilisation', text: 'Утилизация'},
                              {value: 'charity', text: 'Благотворительность'},
                          ]"
                          class="mb-2"/>
          </div>
          <div class="col-sm">
            <label>Тип оплаты</label>
            <b-form-select v-model="payback_type"
                        text="Тип оплаты"
                         :options="[
                             {value: null, text: 'Нет фильтра'},
                            {value: 'free', text: 'Бесплатно'},
                            {value: 'paid', text: 'Оплата деньгами'},
                            {value: 'partner', text: 'Оплата эко-коинами'},
                        ]"
                        class="mb-2">
            </b-form-select>
          </div>
        </div>
      </div>
    </div>

    <gmap-map
        ref="mymap"
        :zoom="zoom"
        :center="center"
        style="width:100%;  height: 600px;"
    >
      <gmap-info-window
          :options="infoOptions"
          :position="infoPosition"
          :opened="infoOpened"
          @closeclick="infoOpened=false"
      >
      </gmap-info-window>
      <gmap-marker
          v-bind:key="m.id"
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
var qs = require('qs');

export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: {
        lat:55.7829702,
        lng: 49.1059532
      },
      zoom: 12,
      filters: [],
      selected_filters: [],
      reception_type: null,
      payback_type: null,
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
    this.update_rec_points();
    axios
        .get('https://recyclehub.ru:5000/api/filters')
        .then(response => (this.filters = response.data));
  },
  watch: {
    selected_filters: function (){
      this.update_rec_points();
    },
    reception_type: function (){
      this.update_rec_points();
    },
    payback_type: function (){
      this.update_rec_points();
    },
  },
  methods: {
    update_rec_points() {
      console.log(`selected filters ${this.selected_filters}`)
      const params = {
        position: '[55.799779,49.1319283]',
        radius: 100,
        ...((this.reception_type) ? {reception_type: this.reception_type}: {}),
        ...((this.payback_type) ? {payback_type: this.payback_type}: {}),
        // пока что я не разобрался, как работать со списком в параметрах запроса в axios
        ...((this.selected_filters) ? {filters: this.selected_filters}: {}),
        //...((this.selected_filters.length > 0) ? {filters: this.selected_filters.map(f_ => this.filters.filter(f => f.name === f_)[0].id)[0] }: {}),
      }
      console.log(params);
      axios
          .get('https://recyclehub.ru:5000/api/rec_points', {
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params)
            }
          })
          .then(response => {
            console.log('response')
            this.addLocationMarker(response.data);
          });
    },
    addLocationMarker(data) {
      this.locationMarkers.splice(0);
      data.forEach(rec_point => {
        this.locationMarkers.push({
          position: {
            lat: rec_point.coords[0],
            lng: rec_point.coords[1]
          },
          icon: "/eco.png",
          // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
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
          <img src="${image}" style="width: 200px; margin: auto"
          class="card-img-top rounded" alt="Icon">


          <div class="card-body">
            <h5 class="card-title">${marker.name}</h5>

            <p class="card-text text-left">
              ${marker.description || "Нет описания"}
<!--              <br>-->
<!--              <time datetime="2016-1-1"></time>-->
            </p>
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