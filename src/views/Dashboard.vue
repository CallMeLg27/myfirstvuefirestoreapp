<template>
  <div id="dashboard">
    <transition name="fade">
      <PostModal
        v-if="showPostModal"
        :fullPost="selectedPost"
        :postComments="postComments"
        @close="togglePostModal()"
      />
    </transition>
    <transition name="fade">
      <CommentModal
        v-if="showCommentModal"
        :post="selectedPost"
        @close="toggleCommentModal()"
      />
    </transition>
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button
                @click="createPost()"
                :disabled="post.content === ''"
                class="button"
              >post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div
            v-for="post in posts"
            :key="post.id"
            class="post"
          >
            <h5>{{post.userName}}</h5>
            <span>{{post.createdOn | formatDate}}</span>
            <p>{{post.content | trimLength}}</p>
            <ul>
              <li><a @click="toggleCommentModal(post)">comments {{post.comments}}</a></li>
              <li><a @click="likePost(post.id, post.likes)">likes {{post.likes}}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import firebase commenstsCollection ref
import { commentsCollection } from '@/firebase'

import CommentModal from '@/components/CommentModal'
import PostModal from '@/components/PostModal'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      post: {
        content: ''
      },
      showPostModal: false,
      showCommentModal: false,
      selectedPost: {},
      postComments: []
    }
  },
  components: {
    CommentModal,
    PostModal,
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    createPost () {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal (post) {
      this.showCommentModal = !this.showCommentModal

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    togglePostModal (post) {
      this.showPostModal = !this.showPostModal

      // if opening modal set selectedPost, else clear
      if (this.showPostModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost (id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost (post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.selectedPost = post
      this.showPostModal = true
    },
    closePostModal () {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate (val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength (val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>