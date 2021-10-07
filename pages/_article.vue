<template>
  <div>
    <h1>{{allPosts.name}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    slug: null
  },
  mounted() {
    this.slug = this.$route.params.slug;
  },
  async asyncData({params}) {
    console.log(params.slug)
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${params.slug}`).then((res) => res.json());
    return { data: data }
  },
  computed: {
    allPosts() {
      return this.data
    }
  }
}
</script>

<style>

</style>