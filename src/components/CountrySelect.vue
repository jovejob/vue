<template>
  <div class="relative inline-block w-full">
    <select
      v-model="selectedCountry"
      class="block w-full p-3 pr-10 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out md:text-base lg:text-lg"
    >
      <option value="" disabled>Country</option>
      <option
        v-for="country in countries"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }}
      </option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
import { ref, onMounted, computed } from 'vue';
import { useNewsStore } from '../stores/useNewsStore';

const newsStore = useNewsStore();
const countries = ref([]);

// This is the selected country from the store
const selectedCountry = computed({
  get: () => newsStore.filters.country,
  set: (value) => newsStore.setFilter('country', value)
});

// todo move to a service (Fetch countries from API)
const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    
    // Map and sort countries alphabetically by name
    countries.value = data
      .map(country => ({
        code: country.cca2.toLowerCase(), // Country code in lowercase
        name: country.name.common // Common name of the country
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

// Fetch countries when the component mounts
onMounted(fetchCountries);
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