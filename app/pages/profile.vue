<script setup lang="ts">
import { UtensilsCrossed, Heart, Users, Pencil, MapPin, Calendar } from 'lucide-vue-next';

const user = {
  name: 'Purin Pongpanich',
  handle: '@purin',
  bio: 'Chasing the weirdest, most wonderful flavor pairings. Marmite evangelist.',
  location: 'Bangkok, Thailand',
  joined: 'May 2026',
  avatarInitials: 'PP'
};

const stats = [
  { label: 'Combos', value: '24', icon: UtensilsCrossed },
  { label: 'Likes', value: '312', icon: Heart },
  { label: 'Followers', value: '128', icon: Users },
  { label: 'Following', value: '64', icon: Users }
];

const myCombos = [
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
  <div class="profile-page">
    <header class="profile-header">
      <div class="avatar">{{ user.avatarInitials }}</div>
      <div class="profile-info">
        <p class="profile-eyebrow">Profile</p>
        <h1 class="profile-name">{{ user.name }}</h1>
        <p class="profile-handle">{{ user.handle }}</p>
        <p class="profile-bio">{{ user.bio }}</p>
        <div class="profile-meta">
          <span class="meta-item">
            <MapPin :size="14" />
            {{ user.location }}
          </span>
          <span class="meta-item">
            <Calendar :size="14" />
            Joined {{ user.joined }}
          </span>
        </div>
        <div class="profile-actions">
          <button class="btn btn-primary">
            <Pencil :size="14" />
            <span>Edit profile</span>
          </button>
          <button class="btn btn-secondary">Share</button>
        </div>
      </div>
    </header>

    <section class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <component :is="stat.icon" class="stat-icon" :size="24" />
        <p class="stat-value">{{ stat.value }}</p>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </section>

    <section class="content-section">
      <h2 class="section-title">My combos</h2>
      <div class="combo-grid">
        <ComboCard
          v-for="combo in myCombos"
          :key="combo.title"
          v-bind="combo"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 1400px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  gap: var(--spacing-xl);
  align-items: flex-end;
  padding: var(--spacing-xxl) 0 var(--spacing-xl);
  background: linear-gradient(to bottom, #2a2a2a 0%, var(--bg-base) 100%);
  margin: calc(var(--spacing-xl) * -1) calc(var(--spacing-xl) * -1) var(--spacing-xl);
  padding-left: var(--spacing-xl);
  padding-right: var(--spacing-xl);
}

.avatar {
  width: 192px;
  height: 192px;
  border-radius: var(--rounded-circle);
  background: linear-gradient(135deg, var(--primary) 0%, #0e7a36 100%);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-weight: 700;
  letter-spacing: -0.04em;
  box-shadow: var(--shadow-heavy);
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.profile-eyebrow {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-base);
  margin: 0;
}

.profile-name {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0;
}

.profile-handle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
}

.profile-bio {
  font-size: 16px;
  color: var(--text-bright);
  margin: var(--spacing-xs) 0 0;
  max-width: 600px;
}

.profile-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xs);
  font-size: 14px;
  color: var(--text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
}

.profile-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.profile-actions .btn {
  gap: var(--spacing-xs);
  padding: 10px 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xxl);
}

.stat-card {
  background: var(--bg-surface);
  border-radius: var(--rounded-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  transition: background-color 0.2s ease;
}

.stat-card:hover {
  background: #1f1f1f;
}

.stat-icon {
  color: var(--primary);
  margin-bottom: var(--spacing-xxs);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-base);
  line-height: 1;
  margin: 0;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.content-section {
  margin-bottom: var(--spacing-xxl);
}

.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-lg);
  }

  .avatar {
    width: 128px;
    height: 128px;
    font-size: 48px;
  }

  .profile-name {
    font-size: 40px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .profile-meta {
    flex-direction: column;
    gap: var(--spacing-xxs);
  }
}
</style>
