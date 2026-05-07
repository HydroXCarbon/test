<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const foodOne = ref('')
const foodTwo = ref('')
const description = ref('')
const tagInput = ref('')
const tagsList = ref<string[]>([])

const addTag = () => {
  const tag = tagInput.value.trim().replace(/,$/, '')
  if (tag && tagsList.value.length < 5 && !tagsList.value.includes(tag)) {
    tagsList.value.push(tag)
  }
  tagInput.value = ''
}

const removeTag = (index: number) => {
  tagsList.value.splice(index, 1)
}

const handleTagInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.value.includes(',')) {
    const parts = input.value.split(',')
    parts.forEach(p => {
      const tag = p.trim()
      if (tag && tagsList.value.length < 5 && !tagsList.value.includes(tag)) {
        tagsList.value.push(tag)
      }
    })
    tagInput.value = ''
  }
}

const handleSubmit = () => {
  if (!foodOne.value || !foodTwo.value || !description.value) {
    alert('Please fill out all required fields.')
    return
  }
  
  const comboData = {
    foodOne: foodOne.value,
    foodTwo: foodTwo.value,
    description: description.value,
    tags: [...tagsList.value],
  };

  console.log('New Combo Data:', comboData)

  // Clear form
  foodOne.value = ''
  foodTwo.value = ''
  description.value = ''
  tagsList.value = []
  tagInput.value = ''
};
</script>

<template>
  <div class="create-page">
    <div class="create-container">
      <h1 class="section-title">Create a New Combo</h1>
      <p class="subtitle">Share your latest discovery with the world.</p>
      
      <form @submit.prevent="handleSubmit" class="create-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="foodOne">Food One</label>
            <input
              type="text"
              id="foodOne"
              v-model="foodOne"
              class="input-pill"
              placeholder="e.g. Marmite"
              required
            />
          </div>
          <div class="form-group">
            <label for="foodTwo">Food Two</label>
            <input
              type="text"
              id="foodTwo"
              v-model="foodTwo"
              class="input-pill"
              placeholder="e.g. Cheese"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="input-pill textarea-pill"
            placeholder="Why do these work so well together?"
            rows="4"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="tags">Tags (max 5)</label>
          <input
            type="text"
            id="tags"
            v-model="tagInput"
            class="input-pill"
            placeholder="e.g. sweet, savory (comma to add)"
            @input="handleTagInput"
            @keydown.enter.prevent="addTag"
            :disabled="tagsList.length >= 5"
          />
          <div class="tags-container" v-if="tagsList.length > 0">
            <span v-for="(tag, index) in tagsList" :key="index" class="tag-chip">
              {{ tag }}
              <span class="tag-remove" @click="removeTag(index)">
                <X :size="14" />
              </span>
            </span>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary submit-btn">Create Combo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.create-page {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl) 0;
}

.create-container {
  max-width: 700px;
  width: 100%;
  background-color: var(--bg-surface);
  padding: var(--spacing-xxl);
  border-radius: var(--rounded-lg);
  box-shadow: var(--shadow-heavy);
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: var(--spacing-xl);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--text-base);
}

.textarea-pill {
  height: auto;
  border-radius: var(--rounded-md);
  resize: vertical;
}

.form-actions {
  margin-top: var(--spacing-md);
}

.submit-btn {
  width: 200px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  background-color: var(--bg-interactive);
  color: var(--text-base);
  padding: 6px 12px;
  border-radius: var(--rounded-full);
  font-size: 13px;
  font-weight: 600;
}

.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  cursor: pointer;
  color: var(--text-muted);
}

.tag-remove:hover {
  color: var(--text-base);
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
