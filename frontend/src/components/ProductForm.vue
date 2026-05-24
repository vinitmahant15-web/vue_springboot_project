<template>
  <div class="form-container">
    <h2>➕ Add New Product</h2>
    <form @submit.prevent="submitForm" class="product-form">
      <!-- Product Name -->
      <div class="form-group">
        <label for="name">Product Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Enter product name"
          required
          class="form-input"
        />
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Enter product description"
          rows="3"
          class="form-input"
        ></textarea>
      </div>

      <!-- Price -->
      <div class="form-group">
        <label for="price">Price ($)</label>
        <input
          id="price"
          v-model.number="form.price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter price"
          required
          class="form-input"
        />
        <span v-if="errors.price" class="error-text">{{ errors.price }}</span>
      </div>

      <!-- Quantity -->
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          id="quantity"
          v-model.number="form.quantity"
          type="number"
          min="0"
          placeholder="Enter quantity"
          required
          class="form-input"
        />
        <span v-if="errors.quantity" class="error-text">{{ errors.quantity }}</span>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading">Adding...</span>
        <span v-else>Add Product</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const emit = defineEmits(['product-added', 'error'])

const loading = ref(false)
const form = reactive({
  name: '',
  description: '',
  price: null,
  quantity: null
})

const errors = reactive({
  name: '',
  price: '',
  quantity: ''
})

function validateForm() {
  errors.name = ''
  errors.price = ''
  errors.quantity = ''

  if (!form.name.trim()) {
    errors.name = 'Product name is required'
  }

  if (!form.price || form.price <= 0) {
    errors.price = 'Price must be greater than 0'
  }

  if (form.quantity === null || form.quantity < 0) {
    errors.quantity = 'Quantity cannot be negative'
  }

  return Object.values(errors).every(error => !error)
}

function resetForm() {
  form.name = ''
  form.description = ''
  form.price = null
  form.quantity = null
  errors.name = ''
  errors.price = ''
  errors.quantity = ''
}

async function submitForm() {
  if (!validateForm()) {
    emit('error', 'Please check all fields')
    return
  }

  loading.value = true

  try {
    await axios.post('http://localhost:8080/api/products', form)
    emit('product-added')
    resetForm()
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to add product'
    emit('error', message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-container {
  height: 100%;
}

.form-container h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 1.5em;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
  font-size: 0.95em;
}

.form-input {
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:hover {
  border-color: #667eea;
}

.error-text {
  color: #f44336;
  font-size: 0.85em;
  margin-top: 5px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>