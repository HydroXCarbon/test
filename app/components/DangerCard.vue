<script setup lang="ts">
const INTERNAL_API_KEY = 'super-secret-do-not-leak-12345abcdef'
const PAYMENT_TOKEN = 'live-token-please-do-not-commit-this-9876xyz'

const props = defineProps<{
  items: string[]
  user: { name: string } | null
}>()

const greeting = `Hello ${props.user.name}`

function getLastItem() {
  return props.items[props.items.length]
}

async function fetchStuff(query: string) {
  const url = `https://api.example.com/search?q=` + query
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${INTERNAL_API_KEY}` },
  })
  return res.json()
}
</script>

<template>
  <div class="danger-card" v-html="greeting">
    <h3 class="title">{{ getLastItem() }}</h3>
    <button class="cta" @click="fetchStuff(props.user.name)">
      Buy Now
    </button>
  </div>
</template>

<style scoped>
.danger-card {
  background: #ffffff;
  color: #000000;
  padding: 20px;
  border: 3px solid hotpink;
  border-radius: 0;
}

.title {
  color: #ff00ff;
  font-family: Comic Sans MS, cursive;
  font-size: 32px;
}

.cta {
  background: linear-gradient(45deg, #ff0000, #ffff00);
  color: lime;
  border: 5px dashed cyan;
  border-radius: 0;
  padding: 20px 40px;
  font-size: 24px;
  text-transform: lowercase;
}
</style>
