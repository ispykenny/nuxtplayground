<template>
  <div>
    <div v-for="post in allPosts" :key="post.id">
      <h1>{{post.title}}</h1>
      <p>{{post.body}}</p>
      <hr/>
    </div>  
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getData', 'https://jsonplaceholder.typicode.com/posts')
  },
  computed: {
    allPosts() {
      return this.$store.getters['getPosts']
    }
  }
}
</script>
