<template>
  <div class="loader-wrapper" v-if="isLoading">
    <b-spinner type="grow" variant="light" label="loading..."></b-spinner>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Loader",
  computed: {
    ...mapGetters(["isLoading"])
  }
}
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>