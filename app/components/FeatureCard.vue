<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="feature-card">
    <div class="icon-container">
      <component :is="icon" :size="32" class="feature-icon" stroke-width="2.5" />
    </div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.feature-card {
  padding: var(--spacing-lg);
  text-align: left;
  background-color: var(--bg-surface);
  border-radius: var(--rounded-md);
  transition: background-color 0.3s ease;
}

.feature-card:hover {
  background-color: #282828;
}

.icon-container {
  color: var(--primary);
  margin-bottom: var(--spacing-md);
}

.feature-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--text-base);
}

.feature-description {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
