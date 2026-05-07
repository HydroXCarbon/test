<script setup lang="ts">
import { BookOpen, Users, Star } from 'lucide-vue-next';

const features = [
  {
    icon: BookOpen,
    title: 'Discover new flavours',
    description: 'Explore a world of unexpected taste sensations and find your next favorite meal.'
  },
  {
    icon: Users,
    title: 'Join the community',
    description: 'Connect with fellow food enthusiasts, share creations, and get feedback.'
  },
  {
    icon: Star,
    title: 'Rate and review',
    description: 'Help others by rating combinations, and climb the leaderboard.'
  }
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
  <div class="home-page">
    <header class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">The perfect pair for your plate.</h1>
        <p class="hero-subtitle">
          Find the weirdest and most wonderful food combinations, recommended by
          our community.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/create" class="btn btn-primary">Create Combo</NuxtLink>
          <button class="btn btn-secondary">Learn more</button>
        </div>
      </div>
    </header>

    <section class="content-section">
      <h2 class="section-title">Hand-picked by the community</h2>
      <div class="combo-grid">
        <ComboCard
          v-for="combo in recentCombos"
          :key="combo.title"
          v-bind="combo"
        />
      </div>
    </section>

    <section class="content-section alternate-bg">
      <h2 class="section-title">Built for food lovers</h2>
      <div class="features-grid">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          v-bind="feature"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  padding: var(--spacing-xxl) 0;
  background: linear-gradient(to bottom, #2a2a2a 0%, var(--bg-base) 100%);
  margin: calc(var(--spacing-xl) * -1) calc(var(--spacing-xl) * -1) var(--spacing-xl) calc(var(--spacing-xl) * -1);
  padding-left: var(--spacing-xl);
  padding-right: var(--spacing-xl);
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: var(--spacing-md);
}

.hero-subtitle {
  font-size: 20px;
  color: var(--text-muted);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
}

.content-section {
  margin-bottom: var(--spacing-xxl);
}

.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
}
</style>
