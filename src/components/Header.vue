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
                <b-nav-item href="#footer">Приложение</b-nav-item>
              </b-nav-item-dropdown>
                </b-navbar-nav>
            </div>
            <div v-else>
              <b-navbar-nav>
                <b-nav-item href="#carousel">О нас</b-nav-item>
                <b-nav-item href="#map">Карта</b-nav-item>
                <b-nav-item href="#news">Новости</b-nav-item>
                <b-nav-item href="#footer">Приложение</b-nav-item>
              </b-navbar-nav>
            </div>
        </b-collapse>
  </b-navbar>
      <b-carousel
        id="carousel"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        img-height="500"
        style="text-shadow: 2px 2px 3px #333; width: 80%; margin: auto"
    >

      <b-carousel-slide
        caption="Привет"
        text="Это приложение поможет вам найти ближайший пункт приема вторсырья
         и получить реальные деньги за отсортированнынй мусор из твоего дома"
      >
        <template #img>
          <div v-if="$isMobile()">
            <b-img width="300" src="images/1.svg"/>
            <div style="height:200px"/>
          </div>
          <div v-else>
            <b-img width="450" src="images/1.svg"/>
          </div>
        </template>
      </b-carousel-slide>


      <b-carousel-slide
          caption="Вместе"
          text="Мы научимся правильной сортировке отходов и поможем нашей планете стать чище.
           Для этого в приложении мы разарботали экогид, который поможет во всем разобраться"
      >
        <template #img>
          <div v-if="$isMobile()">
            <b-img width="300" src="images/2.svg"/>
            <div style="height:200px"/>
          </div>
          <div v-else>
            <b-img width="450" src="images/2.svg"/>
          </div>
        </template>
      </b-carousel-slide>

      <b-carousel-slide
        caption="Получай ЭкоКоины"
        text="За выполенение заданий, которые помогают приложению становиться лучше. Затем вы
         сможете обменять ЭкоКоины на товары и услуги партнера сервиса."
      >
        <template #img>
          <div v-if="$isMobile()">
            <b-img width="300" src="images/3.svg"/>
            <div style="height:200px"/>
          </div>
          <div v-else>
            <b-img width="450" src="images/3.svg"/>
          </div>
        </template>
      </b-carousel-slide>
<!--      <b-carousel-slide img-src="images/4.svg"></b-carousel-slide>-->

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
<!--      <b-carousel-slide>-->
<!--        <template #img>-->
<!--          <b-img width="500" src="images/4.svg"/>-->
<!--        </template>-->
<!--      </b-carousel-slide>-->

<!--      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">-->
<!--        <p>-->
<!--          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt-->
<!--          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.-->
<!--        </p>-->
<!--      </b-carousel-slide>-->
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      slide: 0,
      sliding: null
    }
  }
}
</script>