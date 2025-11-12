<template>
  <article class="post-card" @click="emitClick">
    <header>
      <h3>{{ post.title }}</h3>
      <p class="excerpt">{{ post.body.slice(0, 100) }}...</p>
    </header>

    <div class="tags">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
    </div>

    <footer>
      <div class="author">
        <img
          src="https://api.dicebear.com/8.x/avataaars/svg?seed={{post.userId}}"
          :alt="`Avatar of ${post.userId}`"
        />
        <small>Author ID: {{ post.userId }}</small>
      </div>

      <button @click.stop="toggleLike">
        ❤️ {{ likes }}
      </button>
    </footer>
  </article>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'


const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})


const emit = defineEmits(['click', 'like'])

const { post } = toRefs(props)

const likes = ref(Math.floor(Math.random() * 100))

function emitClick() {
  emit('click', post.value)
}

function toggleLike() {
  likes.value++
  emit('like', post.value.id)
}
</script>

<style scoped>
.post-card {
  background: var(--card-bg, #fff);
  color: var(--text-color, #222);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.post-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.post-card .excerpt {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.tags {
  margin-top: auto;
  margin-bottom: 0.5rem;
}

.tags span {
  display: inline-block;
  margin: 0.1rem;
  padding: 0.2rem 0.5rem;
  background: #eef1f5;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #444;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.1s ease;
}

button:hover {
  transform: scale(1.2);
}
</style>
