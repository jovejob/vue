<template>
  <div class="news-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <div 
      v-for="article in news" 
      :key="article.article_id" 
      class="news-item border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col"
    >
      <img 
        :src="article.image_url" 
        alt="Article Image" 
        class="w-full h-48 object-cover" 
      />
      <div class="p-4 flex-grow">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ article.title }}</h3>
        <p class="text-gray-600 mb-2 line-clamp-3">{{ article.description }}</p>
        <p class="text-gray-500 text-sm mb-2">Published on: {{ new Date(article.pubDate).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm">Source: <a :href="article.source_url" class="text-blue-500 hover:underline">{{ article.source_name }}</a></p>
      </div>

      <!-- todo Move to another client component -->
      <a 
        :href="article.link" 
        target="_blank" 
        class="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Read More
      </a>

    </div>

    <!-- todo Move to another client component -->
    <button 
      v-if="hasNextPage" 
      @click="loadMore" 
      class="mt-4 col-span-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
    >
      Load More
    </button>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useNewsStore } from '../stores/useNewsStore';

const newsStore = useNewsStore();
const news = computed(() => newsStore.filteredNews);
const hasNextPage = computed(() => newsStore.hasNextPage);

// Fetch news on component mount
onMounted(() => {
  newsStore.fetchNews();
});

// Load more news when the button is clicked
const loadMore = () => {
  newsStore.fetchNews(newsStore.currentPage);
};
</script>