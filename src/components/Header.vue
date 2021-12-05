<template>
    <div>
      <b-navbar variant="success" fixed="top">
        <b-navbar-brand href="#">RecycleHub</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>

            <div v-if="$isMobile()">
              <b-navbar-nav>
                <b-nav-item-dropdown text="О нас" left>
                  <b-nav-item href="#carousel">О нас</b-nav-item>
                  <b-nav-item href="#map">Карта</b-nav-item>
                  <b-nav-item href="#news">Новости</b-nav-item>
                  <b-nav-item href="#eco-footer">Приложение</b-nav-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </div>
            <div v-else>
              <b-navbar-nav>
                <b-nav-item href="#carousel">О нас</b-nav-item>
                <b-nav-item href="#map">Карта</b-nav-item>
                <b-nav-item href="#news">Новости</b-nav-item>
                <b-nav-item href="#eco-footer">Приложение</b-nav-item>
              </b-navbar-nav>
            </div>
        </b-collapse>
  </b-navbar>
      <b-carousel
        id="carousel"
        :interval="4000"
        controls
        indicators
        img-height="500"
    >

      <b-carousel-slide
        v-for="item in carousel"
        v-bind:key="item.title"
        v-bind:caption="item.title"
        v-bind:text="item.text"
      >
        <template #img>
          <div>
            <b-img v-bind:width="($isMobile())? 300: 450" v-bind:src="item.image"/>
            <div v-bind:class="{
              'carousel-mobile': $isMobile(),
              'carousel-pc': !$isMobile(),
            }"/>
          </div>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      carousel: [
        {
          title: "Привет",
          text: "Это приложение поможет вам найти ближайший пункт приема вторсырья " +
              "и получить реальные деньги за отсортированнынй мусор из твоего дома",
          image: "images/1.svg"
        },
        {
          title: "Вместе",
          text: "Мы научимся правильной сортировке отходов и поможем нашей планете стать чище. " +
              "Для этого в приложении мы разарботали экогид, который поможет во всем разобраться",
          image: "images/2.svg"
        },
        {
          title: "Получай ЭкоКоины",
          text: "За выполенение заданий, которые помогают приложению становиться лучше. Затем вы " +
              "сможете обменять ЭкоКоины на товары и услуги партнера сервиса",
          image: "images/3.svg"
        },
      ]
    }
  }
}
</script>

<style>
#carousel {
  text-shadow: none;
  width: 80%;
  max-width: 900px;
  margin: auto;
}
#carousel h3, #carousel p {
  padding: 2px 2px;
  line-height:1.4;
  font-weight: 700;
  color: green;
  background-color: white;
  border-radius: 6px;
}
#carousel p {
  display: inline;
  box-decoration-break: clone;
}
#carousel h3 {
  display: block;
  width: max-content;
  margin: auto auto 20px;
}
div .carousel-caption {
  text-align: center;
}
.carousel-mobile {
  height: 200px;
}
.carousel-pc {
  height: 100px;
}
</style>