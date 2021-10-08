<template>
  <div class="inner posts" >
    <div v-for="post in allPosts.items" :key="post.sys.id" class="posts__el">
      <nuxt-link  :to="`/articles/${post.fields.title.toLowerCase().split(' ').join('-')}`">
        <img :src="post.fields.featuredImage.fields.file.url" :alt="`${post.fields.title} preview`"/>
        <div class="content">
          <h4>{{post.fields.title}}</h4>
          <div v-html="htmlPost(post.fields.excerpt)" class="content__inner"></div>
          <button>Read More</button>
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

<style lang="scss" scoped>
  .posts {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 100%;
    }

    &__el {
      width: 48%;
      margin-right: 4%;
      background: #fff;

      .content {
        padding: 1em;
      }

      h4 {
        margin-top: 0;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }

      a {
        background: white;
        display: inline-block;
        text-decoration: none;
        color: #444;
        
      }
    }
  
  } 
</style>