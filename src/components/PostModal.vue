<template>
  <div class="p-modal">
    <div class="p-container">
      <a
        @click="$emit('close')"
        class="close"
      >close</a>
      <div class="post">
        <h5>{{ fullPost.userName }}</h5>
        <span>{{ fullPost.createdOn | formatDate }}</span>
        <p>{{ fullPost.content }}</p>
        <ul>
          <li><a>comments {{ fullPost.comments }}</a></li>
          <li><a>likes {{ fullPost.likes }}</a></li>
        </ul>
      </div>
      <div
        v-show="postComments.length"
        class="comments"
      >
        <div
          v-for="comment in postComments"
          :key="comment.id"
          class="comment"
        >
          <p>{{ comment.userName }}</p>
          <span>{{ comment.createdOn | formatDate }}</span>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['fullPost', 'postComments'],
  filters: {
    formatDate (val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    }
  }
}
</script>

<style>
</style>