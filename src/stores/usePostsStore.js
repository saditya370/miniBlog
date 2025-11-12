// src/stores/usePostsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([]);          
  const currentPost = ref(null);  
  const loading = ref(false);    
  const error = ref(null);       
  const searchQuery = ref('');    

  const API_BASE = 'https://dummyjson.com';

  async function fetchPosts() {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${API_BASE}/posts`);
      posts.value = res.data.posts;
    } catch (err) {
      error.value = 'Failed to fetch posts';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchPostById(id) {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${API_BASE}/posts/${id}`);
      currentPost.value = res.data;
    } catch (err) {
      error.value = 'Failed to fetch post details';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function searchPosts(query) {
    searchQuery.value = query;
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${API_BASE}/posts/search?q=${query}`);
      posts.value = res.data.posts;
    } catch (err) {
      error.value = 'Search failed';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value;
    const q = searchQuery.value.toLowerCase();
    return posts.value.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
    );
  });

  const getPostWithAuthor = computed(() => {
    return (id) => posts.value.find((p) => p.id === Number(id));
  });

  return {
    posts,
    currentPost,
    loading,
    error,
    searchQuery,
    fetchPosts,
    fetchPostById,
    searchPosts,
    filteredPosts,
    getPostWithAuthor,
  };
});
