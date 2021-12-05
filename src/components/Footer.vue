<template>
  <div id="eco-footer">
    <footer>
      <b-container>
        <b-row>
          <p class="text-secondary">
            Для того, чтобы получать экокоины со сдачи, скачайте приложение:
          </p>
        </b-row>
        <b-row>
          <div class="app-links">
            <a href="https://apps.apple.com/us/app/recyclehub/id1584204305#?platform=iphone">
              <b-img src="images/app-store-badge.svg" style="width: 240px;"/>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.beerstudio.recycle_hub">
              <b-img src="images/google-play-badge.png" style="width: 280px; height: 115px;"/>
            </a>
          </div>
        </b-row>
        <div v-if="!$isMobile()">
          <b-row>
            <b-col>
              <p class="text-secondary">© 2021 RecycleHub </p>
            </b-col>
            <b-col>
              <a href="/privacy">Политика конфиденциальности</a>
            </b-col>
            <b-col>
              <a href="/privacy/#/conditions/">Условия и Положения</a>
            </b-col>
            <b-col>
              <p><a href="#app">Наверх</a></p>
            </b-col>
          </b-row>
        </div>
        <div v-else class="links-mobile">
          <b-row>
              <p class="text-secondary">© 2021 RecycleHub </p>
          </b-row>
          <b-row>
            <a href="/privacy">Политика конфиденциальности</a>
          </b-row>
          <b-row>
            <a href="/privacy/#/conditions/">Условия и Положения</a>
          </b-row>
          <b-row>
            <p><a href="#app">Наверх</a></p>
          </b-row>
        </div>
      </b-container>
    </footer>
  </div>
</template>


<script>
export default {
  name: 'Footer',
}
</script>

<style>
#eco-footer {
  margin-top: 300px;
  padding-top: 100px;
  padding-bottom: 100px;
  position: relative;
  background-color: #2d3747;
  color: aliceblue;
}
#eco-footer::before {
  content: "";
  width: 410px;
  height: 562px;
  background-image: url("https://recyclemag.ru/images/tree.svg");
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
}
#eco-footer a {
  color: aliceblue;
}

#eco-footer .text-secondary {
  margin: auto auto 20px;
  font-size: 20px;
  z-index: 1;
}
#eco-footer p, footer a{
  margin: auto auto 20px;
  z-index: 1;
}
.app-links {
  margin: auto;
  z-index: 1;
}
</style>