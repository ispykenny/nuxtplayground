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
  async asyncData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
    return { data: data }
  },
  computed: {
    allPosts() {
      return this.data
    }
  }
}
</script>
