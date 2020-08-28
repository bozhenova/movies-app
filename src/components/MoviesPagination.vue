<template>
  <div class="movies-pagination">
    <BPagination v-model="currentPageModel" :per-page="perPage" :total-rows="total" prev-text="Prev" next-text="Next"/>
  {{currentPage}}
  </div>
</template>
<script>
export default {
  name: 'MoviesPagination',
  props: {
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 100
    },
  perPage: {
    type: Number,
    default: 12
  }
  },
  computed: {
    currentPageModel: {
      get(){
        return this.currentPage;
      },
      set(value){
        this.$emit('pageChanged', value)
      },
    }
  }
}
</script>

<style scoped>
.movies-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #ffffff;
  box-shadow: none;

}

.movies-pagination >>> .pagination .page-item.active .page-link {
border-color: #ffffff;
background-color: #ffffff;
color: #000000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
color: #7e7979;
}

</style>