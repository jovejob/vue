import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useNewsStore = defineStore('news', () => {
  const apiKey = 'pub_57601409f08335b0ce920b031c4b9007f040c'

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

// // src/stores/useNewsStore.js
// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import axios from 'axios'

// export const useNewsStore = defineStore('news', () => {
//   const apiKey = 'pub_57601409f08335b0ce920b031c4b9007f040c'

//   // State
//   const news = ref([])
//   const totalResults = ref(0)
//   const currentPage = ref('')
//   const filters = ref({
//     country: '',
//     language: '',
//     category: '',
//     searchQuery: '',
//   })

//   // Computed properties
//   const filteredNews = computed(() => news.value)
//   const hasNextPage = computed(() => !!currentPage.value)

//   // Actions
//   const fetchNews = async (page = '') => {
//     console.log('Fetching news for page:', page)
//     const { country, language, category, searchQuery } = filters.value

//     // Start constructing the URL
//     let url = `https://newsdata.io/api/1/news?apikey=${apiKey}`

//     // Append the q parameter only if searchQuery is not empty
//     if (searchQuery) {
//       url += `&q=${searchQuery}`
//     }

//     if (country) url += `&country=${country}`
//     if (language) url += `&language=${language}`
//     if (category) url += `&category=${category}`
//     if (page) url += `&page=${page}`

//     console.log('Constructed URL:', url) // Log final URL for debugging

//     try {
//       const response = await axios.get(url)
//       news.value = page
//         ? [...news.value, ...response.data.results]
//         : response.data.results
//       totalResults.value = response.data.totalResults
//       currentPage.value = response.data.nextPage || ''
//     } catch (error) {
//       console.error('Error fetching news:', error)
//     }
//     console.log('the state', news.value)
//   }

//   const setFilter = (key, value) => {
//     console.log(`Setting filter: ${key} = ${value}`)
//     filters.value[key] = value

//     // Clear current news and page when any filter is changed
//     news.value = [] // Reset the news array
//     currentPage.value = '' // Reset the current page
//     fetchNews() // Fetch news with updated filters
//   }

//   const search = () => {
//     news.value = [] // Reset the news array for new search
//     currentPage.value = '' // Reset the current page
//     fetchNews() // Fetch news with current filters
//   }

//   return {
//     news,
//     filteredNews,
//     filters,
//     hasNextPage,
//     currentPage,
//     fetchNews,
//     setFilter,
//     search,
//   }
// })
// // on change

// // src/stores/useNewsStore.js
// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import axios from 'axios'

// export const useNewsStore = defineStore('news', () => {
//   // todo: move to .env - do not expose
//   const apiKey = 'pub_57601409f08335b0ce920b031c4b9007f040c'

//   // State
//   const news = ref([]) // Array to hold news articles
//   const totalResults = ref(0) // Total number of results
//   const currentPage = ref('') // Current page as a string
//   const filters = ref({
//     country: '',
//     language: '',
//     category: '',
//     searchQuery: '',
//   })

//   // Computed properties
//   const filteredNews = computed(() => news.value) // Return the news array
//   const hasNextPage = computed(() => !!currentPage.value) // Check if there is a next page

//   // Actions
//   const fetchNews = async page => {
//     // Accept page as a parameter
//     console.log('Fetching news for page:', page)
//     const { country, language, category, searchQuery } = filters.value
//     console.log('Filters before fetching news:', filters.value)

//     // Start constructing the URL
//     let url = `https://newsdata.io/api/1/news?apikey=${apiKey}`

//     // Append the q parameter only if searchQuery is not empty
//     if (searchQuery) {
//       url += `&q=${searchQuery}`
//     }

//     // let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery}`

//     if (country) url += `&country=${country}`
//     if (language) url += `&language=${language}`
//     if (category) url += `&category=${category}`
//     if (page) url += `&page=${page}` // Add page to URL if it exists

//     console.log('Constructed URL:', url) // Log the final URL for debugging

//     try {
//       const response = await axios.get(url)
//       if (page === 1) {
//         // If it's the first page, replace the news array
//         news.value = response.data.results
//       } else {
//         // Otherwise, append new articles to the existing news array
//         news.value.push(...response.data.results)
//       }
//       totalResults.value = response.data.totalResults // Update total results
//       currentPage.value = response.data.nextPage || '' // Set currentPage to the next page or empty if not available
//     } catch (error) {
//       console.error('Error fetching news:', error)
//     }
//     console.log('Updated news state:', news.value) // Log updated state for debugging
//   }

//   const setFilter = (key, value) => {
//     console.log(`Setting filter: ${key} = ${value}`)
//     filters.value[key] = value
//   }

//   const search = () => {
//     currentPage.value = '' // Reset to an empty string on new search
//     fetchNews(1) // Fetch news for the first page
//   }

//   return {
//     news,
//     filteredNews,
//     filters,
//     hasNextPage,
//     currentPage,
//     fetchNews,
//     setFilter,
//     search,
//   }
// })
// // was good!

// // src/stores/useNewsStore.js
// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import axios from 'axios'

// export const useNewsStore = defineStore('news', () => {
//   // todo move to .env - do not expose
//   const apiKey = 'pub_57601409f08335b0ce920b031c4b9007f040c'

//   // State
//   const news = ref([])
//   const totalResults = ref(0)
//   const currentPage = ref('')
//   const filters = ref({
//     country: '',
//     language: '',
//     category: '',
//     searchQuery: '',
//   })

//   // Computed properties
//   const filteredNews = computed(() => news.value)
//   const hasNextPage = computed(() => !!currentPage.value)

//   // Actions
//   const fetchNews = async (page = '') => {
//     console.log('Fetching news for page:', page)
//     const { country, language, category, searchQuery } = filters.value
//     console.log('Filters before fetching news:', filters.value)

//     let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${searchQuery}`

//     if (country) url += `&country=${country}`
//     if (language) url += `&language=${language}`
//     if (category) url += `&category=${category}`
//     if (page) url += `&page=${page}`

//     console.log('Constructed URL:', url) // <-- Log final URL for debugging

//     try {
//       const response = await axios.get(url)
//       news.value = page
//         ? [...news.value, ...response.data.results]
//         : response.data.results
//       totalResults.value = response.data.totalResults
//       currentPage.value = response.data.nextPage || ''
//     } catch (error) {
//       console.error('Error fetching news:', error)
//     }
//     console.log('the state', news.value)
//   }

//   const setFilter = (key, value) => {
//     console.log(`Setting filter: ${key} = ${value}`)
//     filters.value[key] = value
//   }

//   const search = () => {
//     fetchNews() // Fetch news with current filters
//   }

//   return {
//     news,
//     filteredNews,
//     filters,
//     hasNextPage,
//     currentPage,
//     fetchNews,
//     setFilter,
//     search,
//   }
// })
