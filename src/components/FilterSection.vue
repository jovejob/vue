<template>
  <div class="mb-4 flex gap-4 items-center">
    <!-- todo move to its own component -->
    <input
      v-model="searchQuery"
      placeholder="Search..."
      class="block w-full p-3 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out md:text-base lg:text-lg"
    />

    <!-- todo add a skeleton while loading/fetching data -->
    <CountrySelect />
    <LanguageSelect />
    <CategorySelect />

    <!-- todo move to button component -->
    <button
      @click="onSubmit"
      :disabled="isButtonDisabled"
      :class="[
        'block w-full p-3 text-sm text-white border border-gray-300 rounded-lg shadow-sm transition duration-200 ease-in-out md:text-base lg:text-lg',
        isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
      ]"
    >
      Search
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNewsStore } from '../stores/useNewsStore'
import CountrySelect from './CountrySelect.vue'
import LanguageSelect from './LanguageSelect.vue'
import CategorySelect from './CategorySelect.vue'

const newsStore = useNewsStore()

// Local state for search query
const searchQuery = ref('')

// Computed properties to pull values from the store
const country = computed(() => newsStore.filters.country)
const language = computed(() => newsStore.filters.language)
const category = computed(() => newsStore.filters.category)

// Disable the button if searchQuery is empty or if no language/category/country is selected
const isButtonDisabled = computed(() => {
  return !searchQuery.value.trim() && !language.value && !category.value && !country.value
})

// Trigger search only when the submit button is clicked
const onSubmit = () => {
  // Update filters in the store
  newsStore.setFilter('language', language.value)
  newsStore.setFilter('category', category.value)
  newsStore.setFilter('searchQuery', searchQuery.value)

  // Call the submit function to fetch news
  newsStore.fetchNews()
}
</script>

<style scoped>
input {
  appearance: none;
}

input:focus {
  border-color: #3b82f6;
  outline: none;
}
</style>
