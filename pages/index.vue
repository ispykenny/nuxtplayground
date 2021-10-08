<template>
  <div class="inner posts" >
    <div v-for="post in allPosts.items" :key="post.sys.id" class="posts__el">
      
        <div class="preview" :style="`padding-bottom:${post.fields.featuredImage.fields.file.details.image.height / post.fields.featuredImage.fields.file.details.image.width * 100}%`">
          <img :src="post.fields.featuredImage.fields.file.url" :alt="`${post.fields.title} preview`"/>
        </div>
        <div class="content">
          <h4>{{post.fields.title}}</h4>
          <div v-html="htmlPost(post.fields.excerpt)" class="content__inner"></div>
           <nuxt-link class="cta" :to="`/articles/${post.fields.title.toLowerCase().split(' ').join('-')}`"><span class="sr-only">Learn more about {{post.fields.title}}</span><span>Read More</span></nuxt-link>
        </div>
      
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

<style lang="scss">
  .posts {
    padding-top: 5em;
    display: flex;
    flex-wrap: wrap;

    img {
      width: 100%;
    }

    &__el {
      width: 100%;
      margin-bottom: 2em;
      background: #fff;
      border-radius: 7px;
      overflow: hidden;

      .content {
        padding: 2em;
      }

      h4 {
        margin: 0;
        font-size: 1.2em;
      }

      p {
        font-size: 15px;
        margin-top: 0.5em;
        line-height: 1.8;
        margin-bottom: 2em;
      }

      &:nth-child(2n) {
        margin-right: 0;
      }

      a:not(.cta) {
        background: white;
        display: inline-block;
        text-decoration: none;
        color: #444;
        
      }
    }
  
  } 

  .cta {
    background-color: #444;
    color: white;
    padding: 0.7em 2em;
    display: inline-block;
    font-size: 14px;
    text-decoration: none;
    position: relative;
  }

  .preview {
    position: relative;
    background: #eee;

    img {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
    
    }
  }

  .sr-only {
    clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
  }

  @media(min-width: $bp-md) {
    .posts__el {
      width: 48%;
      margin-right: 4%;
    }
  }
</style>