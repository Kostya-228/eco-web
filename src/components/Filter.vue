<template>
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
</template>

<script>
export default {
  name: "Filter"
}
</script>

<style scoped>

</style>