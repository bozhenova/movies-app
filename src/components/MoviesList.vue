<template>
  <BContainer>
  <h3 class="list-title">{{listTitle}}</h3>
  <BRow>
  <template v-if="doesExist">
  <BCol cols="3" v-for="(movie, key) in list" :key="key">
    <MovieItem :movie="movie" @mouseover.native="onMouseOver(movie.Poster)" @removeItem="onRemoveItem"/>
  </BCol>
  </template>
  <template v-else><div>Empty List</div></template>
  </BRow>
  </BContainer>
</template>

<script>
import MovieItem from './MovieItem'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MoviesList',
  props: {
  list: {
    type: Object,
    default: () => {}

  }
  },
  components: {
  MovieItem
  },
  computed: {
  ...mapGetters('movies', ['searchMode']),
    doesExist(){
      return Boolean(Object.keys(this.list).length)
    },
    listTitle(){
      return this.searchMode ? 'Search results' : 'IMDP Top 250';
    }
  },
  methods: {
  ...mapActions('movies', ['removeMovie']),
  ...mapActions(['showNotification']),
    onMouseOver(poster) {
      this.$emit('changePoster', poster)
    },
    async onRemoveItem({id, title}) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure you want to remove "${title}"?`);
      if (isConfirmed) {
      this.removeMovie(id)
      this.showNotification({
            message: 'The movie was removed',
            title: 'Success',
            variant: 'success'
          },
          { root: true })
      }
    }
  }
}
</script>
<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #ffffff;
}
</style>