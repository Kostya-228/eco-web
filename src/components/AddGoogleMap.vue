<template>
  <div id="map">
      <b-card
          title="Найди на карте нужный тебе пункт приема:"
          class="rounded-50"
          style="margin-left: 3%; margin-right: 3%; border-radius: 50px"
      >
        <b-card-body>
          <b-container style="margin-bottom: 50px">
            <b-row>
              <b-col>
                <b-card>
                  <b-card-header>
                    <h5>Тип ресурса</h5>
                    <b-dropdown v-bind:text="selected_filter.name">
                      <b-dropdown-item v-for="(filter, index) in filters"
                                       :key="index"
                                       :value="filter"
                                       @click="selected_filter = filter"
                      >{{ filter.name }}</b-dropdown-item>
                    </b-dropdown>
                  </b-card-header>
                  <b-card-text v-if="selected_filter.id !== null">
                    <b-row style="margin-top: 20px">
                      <b-card-text>Что можно:
                        <b-badge variant="success"
                                 v-for="(item, index) in selected_filter.key_words"
                                 :key="index"
                                 style="margin-left: 10px; font-size: 15px"
                        >{{item}}</b-badge>
                      </b-card-text>
                    </b-row>
                    <b-row style="margin-top: 20px">
                      <b-card-text>Что нельзя:
                        <b-badge variant="danger"
                                 v-for="(item, index) in selected_filter.bad_words"
                                 :key="index"
                                 style="margin-left: 10px; font-size: 15px"
                        >{{item}}</b-badge>
                      </b-card-text>
                    </b-row>
                  </b-card-text>
                </b-card>
              </b-col>
              <b-col>
                <b-card>
                  <b-card-header>
                    <h5>Тип переработки</h5>
                    <b-dropdown v-bind:text="rec_types[reception_type]">
                      <b-dropdown-item v-for="(name, key) in rec_types"
                                       :key="key"
                                       :value="key"
                                       @click="reception_type = key"
                      >{{ name }}</b-dropdown-item>
                    </b-dropdown>
                  </b-card-header>
                </b-card>
              </b-col>
              <b-col>
                <b-card>
                  <b-card-header>
                    <h5>Тип оплаты</h5>
                    <b-dropdown v-bind:text="payback_types[payback_type]">
                      <b-dropdown-item v-for="(name, key) in payback_types"
                                       :key="key"
                                       :value="key"
                                       @click="payback_type = key"
                      >{{ name }}</b-dropdown-item>
                    </b-dropdown>
                  </b-card-header>
                </b-card>
              </b-col>
            </b-row>
          </b-container>

          <gmap-map
              ref="mymap"
              :zoom="zoom"
              :center="center"
              style="width:100%;  aspect-ratio: 1 / 1;"
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
        </b-card-body>
      </b-card>
  </div>
</template>

<script>
import axios from 'axios'
let qs = require('qs');

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
      selected_filter: {id: null, name: 'Без фильтра', key_words: [], bad_words: []},
      rec_types: {
        'null': 'Нет фильтра',
        'recycle': 'Переработка',
        'utilisation': 'Утилизация',
        'charity': 'Благотворительность'
      },
      payback_types: {
        null: 'Нет фильтра',
        'free': 'Бесплатно',
        'paid': 'Оплата деньгами',
        'partner': 'Оплата эко-коинами',
      },
      reception_type: 'null',
      payback_type: 'null',
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      rec_points: [],

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
        content: "загрузка ..."
      },
      };
  },
  mounted() {
    this.locateGeoLocation();
    this.update_rec_points();
    axios
        .get('https://recyclehub.ru:5000/api/filters')
        .then(response => {
          this.filters = [{id: null, name: 'Без фильтра'}].concat(response.data);
          this.selected_filter = this.filters[0];
        });
  },
  watch: {
    selected_filter: function (){
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
      const params = {
        position: '[55.799779,49.1319283]',
        radius: 100,
        ...(this.reception_type !== 'null' ? {reception_type: this.reception_type}: {}),
        ...(this.payback_type !== 'null' ? {payback_type: this.payback_type}: {}),
        ...(this.selected_filter.id  != null ? {filters: this.selected_filter.id}: {}),
      }
      axios
          .get('https://recyclehub.ru:5000/api/rec_points', {
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params)
            }
          })
          .then(response => {
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
          icon: "/favicon.png",
          ...rec_point,
        });
      })
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoPosition = marker.position;

      axios.get(`https://recyclehub.ru:5000/api/rec_points/${marker.id}`)
          .then(response => {
            this.infoOptions.content = this.getInfoWindowContent(response.data);
          });
      if (this.currentMidx === idx) {
        this.infoOpened = !this.infoOpened;
      }
      else {
        this.infoOpened = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent: function (marker) {
      const default_image = "https://bulma.io/images/placeholders/96x96.png";
      const image = marker.images[0] || marker.external_images[0] || default_image;
      const filters = marker.accept_types_names.map(name =>
          `<span class="badge bg-success" style="margin-left: 10px; margin-top: 10px; font-size: 15px">${name}</span>`
      ).join('');

      const work_time_table_body = Object.keys(marker.work_time).map(week_day => {
            const hours = marker.work_time[week_day];
            const str =  Array.isArray(hours) ? hours.join('<br/>'): hours;
            return `<th>${str}</th>`;
          }
      ).join('');
      const work_time_table_thread = Object.keys(marker.work_time).map(week_day =>
          `<th scope="col">${week_day}</th>`
      ).join('');

      return (`
        <div class="card">
          <img src="${image}" style="width: 200px; margin: auto"
          class="card-img-top rounded" alt="Icon">
          <div class="card-body">
            <h5 class="card-title">${marker.name}</h5>
            <h6 style="text-align: left">Принимают:</h6>
                ${filters}
            <h6 style="text-align: left">Адрес:</h6>
            <p style="text-align: left">${marker.address}</p>
            <h6 style="text-align: left">Контакты:</h6>
            <p style="text-align: left">${marker.contacts.join(', ')}</p>
            <h6 style="text-align: left">Описание:</h6>
            <p class="card-text text-left">${marker.description || "Нет описания"}</p>
            <h6 style="text-align: left">Тип переработки:</h6>
            <p class="card-text text-left">${this.rec_types[marker.reception_type]}</p>
            <h6 style="text-align: left">Тип оплаты:</h6>
            <p class="card-text text-left">${this.payback_types[marker.payback_type]}</p>
            <h6 style="text-align: left">Время работы:</h6>
            <table class="table">
              <thead>
                <tr>
                  ${work_time_table_thread}
                </tr>
              </thead>
              <tbody>
                <tr>
                  ${work_time_table_body}
                </tr>
              </tbody>
            </table>

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