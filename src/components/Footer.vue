<template>
  <footer class="container" style="margin-top: 100px">
    <b-container>
      <b-row>
        <p style="margin: auto">Для того, чтобы получать экокоины со сдачи, скачайте приложение:</p>
      </b-row>
      <b-row >
        <div style="margin: auto">
          <a href="https://apps.apple.com/us/app/recyclehub/id1584204305#?platform=iphone">
            <b-img src="images/app-store-badge.svg" style="width: 240px;"/>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.beerstudio.recycle_hub">
            <b-img src="images/google-play-badge.png" style="width: 300px;"/>
          </a>
        </div>
      </b-row>
      <b-row>
        <b-col>
          <p>© 2021 EcoHub <a href="/privacy">Privacy</a> · <a href="/privacy/#/conditions/">Conditions</a></p>
        </b-col>
        <b-col>
          <p class="float-right"><a href="#app">Back to top</a></p>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>


<script>
export default {
  name: 'Footer',
}
</script>
