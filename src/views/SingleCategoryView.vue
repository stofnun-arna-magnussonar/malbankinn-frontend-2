<template>
    <SingleCategory :categoryProp="path" :paramProp="urlParam"/>
</template>

<script>
import SingleCategory from '@/components/SingleCategory.vue';
export default {
  components: {
    SingleCategory
  },
  computed: {
    path() {
      return this.$router.currentRoute.value.name
    },
    urlParam() {
      return this.$router.currentRoute.value.params.category
    }
  }
}
</script>