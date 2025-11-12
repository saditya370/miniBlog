<template>
  <section class="post-view">
    <Suspense>
      <template #default>
        <PostContent />
      </template>
      <template #fallback>
        <div class="loading">Loading post details...</div>
      </template>
    </Suspense>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const PostContent = defineAsyncComponent(() => import('@/components/PostContent.vue'))
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
}
</style>
