<template>
  <div id="app">
    <header>
      <h1 class="logo">📝 My Vue Blog</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/counter">Counter</router-link>
      </nav>
    </header>

    <router-view />

    <footer>
      <p>© 2025 My Vue Blog</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0 auto;
  max-width: 900px;
  padding: 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

nav a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #0077ff;
  font-weight: 500;
}

nav a.router-link-active {
  text-decoration: underline;
}

footer {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
}
</style>
