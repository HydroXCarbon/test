<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  tags: string[];
}>();
</script>

<template>
  <div class="combo-card">
    <div class="combo-image-container">
      <div class="combo-image-placeholder">
        <!-- Play icon visible on hover in Spotify -->
        <div class="play-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
            <path d="M7.05 3.606l13.49 7.79a.7.7 0 010 1.212L7.05 20.398A.7.7 0 016 19.792V4.208a.7.7 0 011.05-.602z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="combo-content">
      <h4 class="combo-title">{{ title }}</h4>
      <p class="combo-description">{{ description }}</p>
      <div class="combo-tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.combo-card {
  background-color: var(--bg-surface);
  padding: var(--spacing-md);
  border-radius: var(--rounded-md);
  transition: background-color 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.combo-card:hover {
  background-color: #282828;
}

.combo-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Square aspect ratio */
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-medium);
  border-radius: var(--rounded-sm);
  overflow: hidden;
}

.combo-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #333 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon {
  width: 48px;
  height: 48px;
  background-color: var(--primary);
  border-radius: var(--rounded-circle);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-heavy);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.combo-card:hover .play-icon {
  opacity: 1;
  transform: translateY(0);
}

.combo-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-base);
  margin-bottom: var(--spacing-xxs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.combo-description {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.combo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tag:not(:last-child):after {
  content: "•";
  margin-left: 4px;
}
</style>
