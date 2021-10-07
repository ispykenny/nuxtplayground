export const state = () => ({
  user: 'kenny',
  posts: []
})

export const mutations = {
  setPosts (state, all_posts) {
    state.posts = all_posts
  }
}

export const actions = {
  async getData({commit}, url) {
    const fetchUrl = fetch(url).then((res) => res.json())
    const data = await fetchUrl;
    commit('setPosts', data)
  }
}

export const getters = {
  getPosts: state => state.posts
}