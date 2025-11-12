<template>
  <section class="home-view">
    <div class="toolbar">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search posts..."
        v-auto-focus
      />

    </div>

    <div class="tags">
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="{ active: tag === activeTag }"
        @click="toggleTag(tag)"
      >
        #{{ tag }}
      </button>
      <button v-if="activeTag" class="clear" @click="clearTag">Clear Filter</button>
    </div>

    <div v-if="postsStore.loading" class="loading">Loading posts...</div>
    <div v-else-if="postsStore.error" class="error">{{ postsStore.error }}</div>
    <div v-else class="posts-grid">
      <PostCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @click="openPost(post.id)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/usePostsStore'
import { useDebounce } from '@/composables/useDebounce'
import PostCard from '@/components/PostCard.vue'

const postsStore = usePostsStore()
const router = useRouter()

const searchInput = ref('')
const debouncedSearch = useDebounce(searchInput, 400)
const activeTag = ref(null)

onMounted(() => {
  postsStore.fetchPosts()
})

watch(debouncedSearch, (val) => {
  if (val.trim()) postsStore.searchPosts(val)
  else postsStore.fetchPosts()
})

const filteredPosts = computed(() => {
  if (!activeTag.value) return postsStore.filteredPosts
  return postsStore.filteredPosts.filter((p) => p.tags.includes(activeTag.value))
})

const allTags = computed(() => {
  const tags = new Set()
  postsStore.posts.forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).slice(0, 10) 
})

function toggleTag(tag) {
  activeTag.value = activeTag.value === tag ? null : tag
}
function clearTag() {
  activeTag.value = null
}



function openPost(id) {
  router.push(`/post/${id}`)
}
</script>

<style scoped>
.home-view {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.toolbar input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #aaa;
  border-radius: 8px;
  font-size: 1rem;
}

.toolbar button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #0077ff;
  color: white;
}

.tags {
  margin-bottom: 1rem;
}

.tags button {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  margin: 0.25rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
}

.tags button.active {
  background: #0077ff;
  color: white;
}

.tags .clear {
  background: #ff5b5b;
  color: white;
}

.posts-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
}
</style>
