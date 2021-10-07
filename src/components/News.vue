<template>
  <div>
  <b-card
      style="margin-left: 30px; margin-right: 30px; border-radius: 50px; margin-top: 40px"
  >
    <h1>Новости</h1>
    <b-row>
      <b-card-group
                    v-for="news_ in news"
                    :key="news_.id"
      >
        <b-card
          :title="news_.title"
          :img-src="news_.image"
          :key="news_.id"
          style="width: 300px; margin-left: 40px; margin-top: 40px; margin-right: 40px"
          @click="show_news(news_)"
        >
          <b-card-text
              style="text-align: left"
          >
            <b-badge variant="primary"
                     v-if="news_.is_advice"
                     style="margin-left: 10px; font-size: 15px"
            >Совет</b-badge>
            {{news_.text.slice(0,200)}} ...</b-card-text>
          <p style="color: gray">{{moment(news_.pub_date).format('YYYY-MM-DD HH:mm')}}</p>
        </b-card>
      </b-card-group>
    </b-row>
  </b-card>
  <b-modal id="modal"
           :title="this.current_news.title">
    <b-img v-bind="{ src: this.current_news.image}" rounded center width="400px;"/>
    <p class="my-4">
      <b-badge variant="primary"
               v-if="this.current_news.is_advice"
               style="margin-left: 10px; font-size: 15px"
      >Совет</b-badge>
      {{ this.current_news.text }}</p>
    <p>{{ moment(this.current_news.pub_date).format('YYYY-MM-DD HH:mm') }}</p>
  </b-modal>
  </div>
</template>


<script>
import axios from "axios";
const moment = require('moment')

export default {
  name: 'News',
  data(){
      return {
        news: [],
        current_news: {
          title: null,
          text: null,
          image: null,
          pub_date: null,
        },
        moment: moment
      }
  },
  mounted() {
    axios
        .get('https://recyclehub.ru:5000/api/news')
        .then(response => {
          this.news = response.data
        });
  },
  methods: {
    show_news: function (news){
      this.current_news = news;
      this.$bvModal.show('modal');
    }
  }
}
</script>
