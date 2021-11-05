<template>
  <div id="footer">
  <footer class="container" style="margin-top: 100px">
    <b-container>
      <b-row>
        <p class="text-secondary" style="margin: auto; font-size: 20px">
          Для того, чтобы получать экокоины со сдачи, скачайте приложение:
        </p>
      </b-row>
      <b-row style="margin-top: 20px">
        <div style="margin: auto">
          <a href="https://apps.apple.com/us/app/recyclehub/id1584204305#?platform=iphone">
            <b-img src="images/app-store-badge.svg" style="width: 240px;"/>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.beerstudio.recycle_hub">
            <b-img src="images/google-play-badge.png" style="width: 280px; height: 115px;"/>
          </a>
        </div>
      </b-row>
      <b-row>
        <b-col>
          <p>© 2021 RecycleHub </p>
        </b-col>
        <b-col>
          <a href="/privacy">Политика конфиденциальности</a>
        </b-col>
        <b-col>
          <a href="/privacy/#/conditions/">Условия и Положения</a>
        </b-col>
        <b-col>
          <p class="float-right"><a href="#app">Наверх</a></p>
        </b-col>
      </b-row>
    </b-container>
  </footer>
  </div>
</template>


<script>
export default {
  name: 'Footer',
}
</script>
