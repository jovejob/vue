<template>
  <div class="relative inline-block w-full">
    <select
      v-model="selectedCategory"
      class="block w-full p-3 pr-10 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out md:text-base lg:text-lg"
    >
      <option value="" disabled>Category</option>
      <option
        v-for="category in categories"
        :key="category.value"
        :value="category.value"
      >
        {{ category.name }}
      </option>
    </select>
    <div
      class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
    >
      <svg
        class="w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 10l5 5 5-5H7z"
        />
      </svg>
    </div>
  </div>
</template>

<!-- todo extract BaseSelect and reuse the component -->
<script setup>
import { ref, computed } from 'vue'
import { useNewsStore } from '../stores/useNewsStore'
import { categories } from '../mocks/categories' // Import the static categories

const newsStore = useNewsStore()

// Bind selected category to the store
const selectedCategory = computed({
  get: () => newsStore.filters.category,
  set: value => newsStore.setFilter('category', value),
})
</script>

<!-- todo extract the style and import it in a BaseSelect and reuse the component -->
<style scoped>
select {
  appearance: none;
}

select:focus {
  border-color: #3b82f6;
  outline: none;
}

option {
  padding: 8px 12px;
}
</style>
