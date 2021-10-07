<template>
  <div>
    <h1>{{post.name}}</h1>
  </div>
</template>

<script>
export default {

  async asyncData({params}) {
    const post = await fetch(`https://jsonplaceholder.typicode.com/users/${params.slug}`).then((res) => res.json())
    return {post}
  }
}
</script>

<style>

</style>