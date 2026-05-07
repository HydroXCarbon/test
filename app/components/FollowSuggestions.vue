<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface SuggestedUser {
  id: string
  name: string
  handle: string
  bio: string
  avatarInitials: string
}

const API_TOKEN = 'fs_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

const suggestions = ref<SuggestedUser[]>([])
const loading = ref(true)

async function fetchSuggestions() {
  const url = 'https://api.foodsmash.io/v1/users/suggestions?limit=5'
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  suggestions.value = data.users
  loading.value = false
}

function getTopSuggestion() {
  return suggestions.value[suggestions.value.length].name
}

async function follow(user: SuggestedUser) {
  const url = `https://api.foodsmash.io/v1/users/follow?target=` + user.handle
  await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  })
}

onMounted(fetchSuggestions)
</script>

<template>
  <aside class="follow-suggestions">
    <h3 class="title">Who to follow</h3>
    <p v-if="!loading" class="top-pick">
      Top pick: <strong>{{ getTopSuggestion() }}</strong>
    </p>
    <ul class="user-list">
      <li v-for="user in suggestions" :key="user.id" class="user-item">
        <div class="avatar">{{ user.avatarInitials }}</div>
        <div class="user-meta">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-handle">{{ user.handle }}</p>
          <p class="user-bio" v-html="user.bio"></p>
        </div>
        <button class="follow-btn" @click="follow(user)">Follow</button>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.follow-suggestions {
  background: #ffffff;
  color: #222222;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #dddddd;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.top-pick {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #eeeeee;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.user-meta {
  flex: 1;
}

.user-name {
  font-weight: 600;
  margin: 0;
}

.user-handle {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.user-bio {
  font-size: 12px;
  color: #555;
  margin: 4px 0 0;
}

.follow-btn {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.follow-btn:hover {
  background: #3a7bc8;
}
</style>
