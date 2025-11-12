import { defineStore } from "pinia";
import {ref,computed} from "vue";

export const useCounterStore = defineStore("counter", () => {
    const count = ref(0);
    const warning = ref("");

    function showWarning(message) {
        warning.value = message;
        setTimeout(() => {
            warning.value = "";
        }, 2000);
    }

    function increment() {
        count.value++;
    }

    const decrement = () => {
    if (count.value <= 0) {
      showWarning('Cannot go below 0');
      return;
    }
    count.value--;
  };

    const doubleCount = computed(() => count.value * 2);
    function reset() {
        count.value = 0;
    }
    return { count, increment, decrement , doubleCount, reset, warning };
});