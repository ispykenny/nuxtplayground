<template>
  <div>
    <div v-for="post in allPosts.items" :key="post.sys.id">
      <nuxt-link :to="`/articles/${post.fields.title.toLowerCase().split(' ').join('-')}`">
        <div>
          <img :src="post.fields.featuredImage.fields.file.url" :alt="`${post.fields.title} preview`"/>
          <h4>{{post.fields.title}}</h4>
          <div v-html="htmlPost(post.fields.excerpt)"></div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  data() {
    return {
      showPre: false
    }
  },
  head() {
    return {
      title: "Articles",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  },
  async asyncData() {
    const data = await fetch('https://contentful-endpoint.herokuapp.com/articles').then((res) => res.json());
    return { data: data }
  },
  computed: {
    allPosts() {
      return this.data
    },
  },
  methods: {
    togglePre() {
      this.showPre = !this.showPre
    },
    htmlPost : document => documentToHtmlString(document)
  }
}
</script>
