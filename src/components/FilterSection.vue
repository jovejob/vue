<template>
  <div class="mb-4 flex gap-4 items-center">

    <!-- todo move to its own component -->
    <input
      v-model="searchQuery"
      placeholder="Search..."
      class="block w-full p-3 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out md:text-base lg:text-lg"
    />
    <CountrySelect />
    <LanguageSelect />
    <CategorySelect />
  
    <!-- todo move to button component -->
    <button 
        @click="onSubmit" 
        class="block w-full p-3 text-sm bg-blue-500 text-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out md:text-base lg:text-lg"
      >
      Search
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNewsStore } from '../stores/useNewsStore';
import CountrySelect from './CountrySelect.vue';
import LanguageSelect from './LanguageSelect.vue';
import CategorySelect from './CategorySelect.vue';

const newsStore = useNewsStore();

// Computed properties to pull values from the store
const searchQuery = ref(newsStore.filters.searchQuery);
const language = computed(() => newsStore.filters.language);
const category = computed(() => newsStore.filters.category);


// Trigger search only when the submit button is clicked
const onSubmit = () => {
  // Update filters in the store
  newsStore.setFilter('language', language.value);
  newsStore.setFilter('category', category.value);
  newsStore.setFilter('searchQuery', searchQuery.value);
  
  // Call the submit function to fetch news
  newsStore.fetchNews();
};
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