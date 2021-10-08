<template>
  <div class="inner">
    <div class="back-link"><nuxt-link to="/">Go Back</nuxt-link></div>
    <img :src="article.fields.featuredImage.fields.file.url" :alt="`${article.fields.title} preview`"/>
    <h1>{{article.fields.title}}</h1>
    <div v-html="thePost(article.fields.article)"></div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
export default {
  async asyncData({params}) {
    const data = await fetch(`https://contentful-endpoint.herokuapp.com/post/${params.article}`).then((res) => res.json())
    return {post:data}
  }, 
  head() {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.seoMeta
        }
      ]
    }
  },
  computed: {
    article() {
      return this.post
    }
  },
  methods: {
    thePost(article) {
      return documentToHtmlString(article)
    }
  }
}
</script>

<style lang="scss" >
.back-link {
  padding: 1em;
}

</style>