<template>
  <div>
    <div v-for="person in allPosts" :key="person.id">
      <NuxtLink :to="`/article/${person.id}`">
        <h1>Name: {{person.name}}</h1>
        <p>User Name:: {{person.username}}</p>
        <hr/>
      </NuxtLink>
    </div>  
  </div>
</template>

<script>
export default {
  async asyncData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/users/').then((res) => res.json());
    return { data: data }
  },
  computed: {
    allPosts() {
      return this.data
    }
  }
}
</script>
