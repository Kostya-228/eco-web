<template>
  <div>
    <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        img-height="500"
        style="text-shadow: 2px 2px 3px #333; height: 600px; width: 1200px; margin: auto"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >

      <b-carousel-slide
        caption="Привет"
        text="Это приложение поможет вам найти ближайший пункт приема вторсырья
         и получить реальные деньги за отсортированнынй мусор из твоего дома"
      >
        <template #img>
          <b-img width="450" src="images/1.svg"/>
        </template>
      </b-carousel-slide>


      <b-carousel-slide
          caption="Вместе"
          text="Мы научимся правильной сортировке отходов и поможем нашей планете стать чище.
           Для этого в приложении мы разарботали экогид, который поможет во всем разобраться"
      >
        <template #img>
          <b-img width="450" src="images/2.svg"/>
        </template>
      </b-carousel-slide>

      <b-carousel-slide
        caption="Получай ЭкоКоины"
        text="За выполенение заданий, которые помогают приложению становиться лучше. Затем вы
         сможете обменять ЭкоКоины на товары и услуги партнера сервиса."
      >
        <template #img>
          <b-img width="450" src="images/3.svg"/>
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
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide)
      this.sliding = true
    },
    onSlideEnd(slide) {
      console.log(slide)
      this.sliding = false
    }
  }

}
</script>