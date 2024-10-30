import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useNewsStore = defineStore('news', () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY

  // State
  const news = ref([])
  const totalResults = ref(0)
  const currentPage = ref('')

  const filters = ref({
    country: '',
    language: '',
    category: '',
    searchQuery: '',
  })

  // Computed properties
  const filteredNews = computed(() => news.value)
  const hasNextPage = computed(() => !!currentPage.value)

  // Actions
  const fetchNews = async (page = '') => {
    console.log('Fetching news for page:', page)
    const { country, language, category, searchQuery } = filters.value

    // Start constructing the URL
    let url = `https://newsdata.io/api/1/news?apikey=${apiKey}`

    // Append the q parameter only if searchQuery is not empty
    if (searchQuery) {
      url += `&q=${searchQuery}`
    }

    if (country) url += `&country=${country}`
    if (language) url += `&language=${language}`
    if (category) url += `&category=${category}`
    if (page) url += `&page=${page}`

    console.log('Constructed URL:', url) // Log final URL for debugging

    try {
      const response = await axios.get(url)
      news.value = page
        ? [...news.value, ...response.data.results]
        : response.data.results
      totalResults.value = response.data.totalResults
      currentPage.value = response.data.nextPage || ''
    } catch (error) {
      console.error('Error fetching news:', error)
    }
    console.log('the state', news.value)
  }

  const setFilter = (key, value) => {
    console.log(`Setting filter: ${key} = ${value}`)
    filters.value[key] = value // Update the filter state
  }

  const search = () => {
    news.value = [] // Reset the news array for new search
    currentPage.value = '' // Reset the current page
    fetchNews() // Fetch news with current filters
  }

  return {
    news,
    filteredNews,
    filters,
    hasNextPage,
    currentPage,
    fetchNews,
    setFilter,
    search,
  }
})
