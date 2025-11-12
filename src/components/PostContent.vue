<template>
  <div v-if="loading" class="loading">Loading post...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else class="post-content">
    <h1>{{ post?.title }}</h1>
    <p class="body">{{ post?.body }}</p>

    <div class="meta">
      <img :src="authorAvatar" alt="Author avatar" />
      <span>By User ID: {{ post?.userId }}</span>
    </div>

    <h3>Comments ({{ comments?.length }})</h3>
    <div v-if="commentsLoading">Loading comments...</div>
    <div v-else-if="commentsError">{{ commentsError }}</div>
    <ul v-else>
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.user?.username || 'Anonymous' }}</strong>:
        {{ comment.body }}
      </li>
    </ul>

    <button @click="router.back()" class="back-btn">← Back</button>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApiFetch } from '@/composables/useApiFetch'

const route = useRoute()
const router = useRouter()
const {
  data: post,
  loading,
  error,
  fetchData: fetchPost,
} = useApiFetch(`https://dummyjson.com/posts/${route.params.id}`)

const {
  data: commentsData,
  loading: commentsLoading,
  error: commentsError,
  fetchData: fetchComments,
} = useApiFetch(`https://dummyjson.com/posts/${route.params.id}/comments`)

const comments = computed(() => commentsData.value?.comments || [])

const authorAvatar = computed(() => {
  const id = post.value?.userId || 1
  return `https://api.dicebear.com/8.x/avataaars/svg?seed=${id}`
})

onMounted(async () => {
  await Promise.all([fetchPost(), fetchComments()])
})
route
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await Promise.all([
        fetchPost(`https://dummyjson.com/posts/${newId}`),
        fetchComments(`https://dummyjson.com/posts/${newId}/comments`),
      ])
    }
  }
)
</script>

<style scoped>
.post-content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: var(--card-bg, #fff);
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.post-content h1 {
  margin-bottom: 0.5rem;
}

.body {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.meta img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  margin: 0.5rem 0;
}

.back-btn {
  margin-top: 2rem;
  background: #0077ff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
