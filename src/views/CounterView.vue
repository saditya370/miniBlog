<template>
  <div class="counter-section">
    <h1>Counter View</h1>
     
    <p>Counter Value: {{ counterStore.count }}</p>
    <p>Double: {{ counterStore.doubleCount }}</p>  </div>
    
    <button @click="counterStore.increment()">Increment Counter</button>
    <button @click="counterStore.decrement()">Decrement Counter</button>
    <button @click="counterStore.reset()">Reset Counter</button>

    <transition name="fade">
      <div v-if="counterStore.warning" class="toast">
        {{ counterStore.warning }}
      </div>
    </transition>
</template>

<script setup>

import { useCounterStore } from '@/stores/counterStore';
const counterStore = useCounterStore();


</script>
<style scoped>
.counter-section { max-width: 600px; margin: 2rem auto; font-family: system-ui, sans-serif; }

.counter-section { margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 8px; text-align: center; }

.buttons button {
  margin: 0 0.4rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}
.buttons button:hover { background: #0056b3; }

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4444;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  font-weight: 500;
  z-index: 1000;
}

.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>