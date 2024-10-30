<!-- src/views/NewsView.vue -->
<template>
  <div class="container mx-auto p-4">
    <FilterSection />
    <NewsList />
  </div>
</template>

<script setup>
import FilterSection from '@/components/FilterSection.vue';
import NewsList from '@/components/NewsList.vue';
</script>
