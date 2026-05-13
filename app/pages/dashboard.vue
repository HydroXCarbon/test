<script setup lang="ts">
import { UtensilsCrossed, Tag, Users, TrendingUp } from 'lucide-vue-next';

const stats = [
  { label: 'Total Combos', value: '128', icon: UtensilsCrossed },
  { label: 'Tags Used', value: '47', icon: Tag },
  { label: 'Active Users', value: '312', icon: Users },
  { label: 'New This Week', value: '24', icon: TrendingUp },
];

const recentCombos = [
  {
    title: 'Marmite & Cheese',
    description: 'A classic savory delight, loved by many.',
    tags: ['Savory', 'Classic']
  },
  {
    title: 'Maltesers & Crisps',
    description: 'An unexpected sweet and salty crunch.',
    tags: ['Sweet', 'Salty', 'Crunchy']
  },
  {
    title: 'Strawberries & Pepper',
    description: 'A surprising burst of sweet and spicy.',
    tags: ['Fruity', 'Spicy']
  },
  {
    title: 'Peanut Butter & Pickle',
    description: 'Tangy, creamy, and surprisingly addictive.',
    tags: ['Tangy', 'Creamy']
  }
];
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1 class="section-title">Dashboard</h1>
      <p class="dashboard-subtitle">Your PviewLoveChelsea at a glance.</p>
    </div>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <component :is="stat.icon" class="stat-icon" :size="28" />
        <p class="stat-value">{{ stat.value }}</p>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <section class="recent-section">
      <h2 class="section-title">Recent Combos</h2>
      <div class="combo-grid">
        <ComboCard
          v-for="combo in recentCombos"
          :key="combo.title"
          v-bind="combo"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: var(--spacing-xl);
}

.dashboard-subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin-top: var(--spacing-xs);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.stat-card {
  background: var(--bg-surface);
  border-radius: var(--rounded-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-medium);
}

.stat-icon {
  color: var(--primary);
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-base);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.recent-section {
  margin-bottom: var(--spacing-xxl);
}

.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
