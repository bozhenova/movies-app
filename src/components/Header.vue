<template>
  <header class=header>
    <BNavbar class="navbar" type="dark" variant="dark">
    <BContainer>
      <BNavbarBrand href="#">MovieDB</BNavbarBrand>
      <BNavForm>
        <BFormInput class="mr-sm-2 search-input" placeholder="Search" v-model="searchValue" debounce="500"/>
      </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    searchValue: ''
  }),
  watch: {
    searchValue: 'onSearchValueChange'
  },
  methods: {
  ...mapActions('movies', ['searchMovies', 'fetchMovies', 'toggleSearchMode']),
    onSearchValueChange(value) {
      if (value) {
      this.toggleSearchMode(true)
      this.searchMovies(value)
      } else {
      this.fetchMovies()
      this.toggleSearchMode(false)
      }
    }
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(0,0,0,0.7) !important;
}

.search-input {
  color: #ffffff;
  background: rgba(255,255,255,0.2);
  border-color: rgba(0,0,0,0.6)
}

.search-input::placeholder {
  color: #ffffffb4;

}

.search-input:focus {
  box-shadow: none;
  color: #ffffff;
  background: rgba(255,255,255,0.3);
  border-color: rgba(0,0,0,0.6)
}
</style>