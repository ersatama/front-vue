<script>
import {defineComponent} from 'vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default defineComponent({
  name: "projectInternalComment",
  props: ['portalProject'],
  components: {vueCustomScrollbar},
  data() {
    return {
      comments: null,
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      },
    }
  },
  computed: {
    mode() {
      return this.$store.state.localStorage.mode;
    },
    show() {
      return this.$store.state.localStorage.projectInternalComment;
    },
    user() {
      return this.$store.state.localStorage.user;
    },
    filteredComments() {
      let comments  = {};
      if (this.comments) {
        this.comments.forEach(comment => {
          if (comment.comment) {
            let dt  = comment.dt.split(' ');
            if (!(dt[0] in comments)) {
              comments[dt[0]] = [];
            }

            comments[dt[0]].push({
              comment: comment.comment,
              user: comment.user,
              dt: dt[1]
            });
          }
        });
      }
      return comments;
    }
  },
  created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      if (this.portalProject) {
        this.comments = await this.$store.dispatch('localStorage/portalProject_getComments', {
          id: this.portalProject.id,
          user: this.user.auditor.user,
        });
      }
    }
  }
})
</script>

<template>
  <div class="block-body-right" :class="{'block-body-right-dark':mode}">
    <div class="block-body-right-header">
      <div class="block-body-right-title">Internal comment</div>
      <div class="block-body-right-desc">Project internal comment</div>
      <div class="block-body-right-header-buttons">
        <div class="block-body-right-header-buttons-dropdown" :class="{'block-body-right-header-buttons-dropdown-close':(!show)}" onselectstart="return false" @click="$store.commit('localStorage/toggleProjectInternalComment');"></div>
      </div>
    </div>
    <div class="block-body-content" :class="{'block-body-content-close':!show}">
      <div class="block-body-content-comments">
        <div class="block-body-content-comments-chat">
          <div class="block-body-content-comments-chat-layer"></div>
          <vue-custom-scrollbar  :settings="settings">
            <div class="block-body-content-comments-chat-list">
              <div class="block-body-content-comments-chat-list-item" v-for="(value, key) in filteredComments">
                <div class="block-body-content-comments-chat-list-item-date">{{key}}</div>
                <template v-for="(comment, commentKey) in value">
                  <div class="block-body-content-comments-chat-list-item-comment-main">
                    <div class="block-body-content-comments-chat-list-item-comment" :class="{'block-body-content-comments-chat-list-item-comment-owner':(comment.user === user.auditor.user)}" :key="commentKey">
                      <div class="block-body-content-comments-chat-list-item-comment-text">{{ comment.comment }}</div>
                      <div class="block-body-content-comments-chat-list-item-comment-dt">{{ comment.dt }}</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </vue-custom-scrollbar>
        </div>
        <div class="block-body-content-comments-input">
          <div class="block-body-content-comments-input-btn"></div>
          <textarea placeholder="Write a comment..." rows="1"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>