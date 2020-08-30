<template>
  <div class="movie-item mb-3">
    <div class="movie-item__poster" :style="posterBg"></div>
    <div class="movie-item__wrapper">
      <div class="movie-item__info">
        <h3 class="movie-item__title">{{movie.Title}}</h3>
        <span class="movie-item__year">{{movie.Year}}</span>
      </div>
      <div class="movie-item__controls row no-gutters">
        <div class="col pr-2 pl-2">
        <BButton size="md" block variant="outline-light">Edit</BButton>
        </div>
        <div class="col pr-2 pl-2">
        <BButton size="md" block variant="outline-light" @click="emitRemoveEvent">Remove</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
  movie: {
    type: Object,
    required: true
  }
  },
  computed: {
    posterBg(){
      return {
        'background-image': `url(${this.movie.Poster})`
  }
  }
  },
  methods: {
    emitRemoveEvent(){
      this.$emit('removeItem', {
        id: this.movie.imdbID,
        title: this.movie.Title
  })
  }
  }
}
</script>

<style scoped>

.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
}

.movie-item__wrapper {
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;

}

.movie-item:hover .movie-item__wrapper {
  opacity: 1;
  background-color: rgba(0,0,0,0.7);
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0,0,0,0.7);
  transform: scale(1.02);
}

.movie-item__title {
  font-size: 20px;
  color: #ffffff;
}

.movie-item__year {
  font-size: 14px;
  color: #ffffff;
}
.movie-item__poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}


</style>