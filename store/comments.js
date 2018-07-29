import getBucket from '~/lib/cosmic'

export const state = () => ({
  collections: []
})

export const mutations = {
  setComments (state, { albumId, comments }) {
    const col = state.collections.find(col => col.albumId === albumId)
    if (!col) {
      state.collections.push({ albumId, comments })
    } else {
      col.comments = comments
    }
  },
  addComment (state, { albumId, comment }) {
    const col = state.collections.find(col => col.albumId === albumId)
    if (!col) {
      state.collections.push({ albumId, comments: [comment] })
    } else {
      col.comments.unshift(comment)
    }
  }
}

export const actions = {
  async fetchComments ({ commit }, albumId) {
    const bucket = await getBucket()
    const response = await bucket.getObjects({
      type: 'comments',
      hide_metafields: true,
      metafield_key: 'album_id',
      metafield_value: albumId
    })
    const comments = response.objects
    commit('setComments', { albumId, comments })
  }
}
