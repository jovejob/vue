<!-- src/components/LanguageSelect.vue -->
<template>
  <div class="relative inline-block w-full">
    <select
      v-model="selectedLanguage"
      class="block w-full p-3 pr-10 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out md:text-base lg:text-lg"
    >
      <option value="" disabled>Language</option>
      <option
        v-for="language in languages"
        :key="language.id"
        :value="language.id"
      >
        {{ language.name }}
      </option>
    </select>

    <!-- todo extract to a new component -->
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

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNewsStore } from '../stores/useNewsStore'

const newsStore = useNewsStore()
const languages = ref([])

// Bind selected language to the store
const selectedLanguage = computed({
  get: () => newsStore.filters.language,
  set: value => newsStore.setFilter('language', value),
})

// todo move to a service (Fetch languages from World Bank API)
const fetchLanguages = async () => {
  try {
    const response = await fetch(
      'https://api.worldbank.org/v2/language?format=json',
    )
    const data = await response.json()
    // Log the fetched languages to verify structure
    console.log('Fetched languages:', data[1])

    // Assign language data to languages array
    languages.value = data[1].map(lang => ({
      id: lang.code, // two letter - en
      name: lang.name,
    }))
  } catch (error) {
    console.error('Error fetching languages:', error)
  }
}

// Fetch languages when the component mounts
onMounted(fetchLanguages)
</script>

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
