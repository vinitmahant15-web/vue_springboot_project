<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <h1>📦 Product Management</h1>
        <p>Vue.js + Spring Boot Full-Stack Application</p>
      </div>
    </header>

    <main class="app-main">
      <div class="container">
        <!-- Status Messages -->
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
          <button @click="successMessage = ''" class="close-btn">×</button>
        </div>
        <div v-if="errorMessage" class="alert alert-error">
          {{ errorMessage }}
          <button @click="errorMessage = ''" class="close-btn">×</button>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
          <!-- Form Section -->
          <section class="section form-section">
            <ProductForm 
              @product-added="handleProductAdded"
              @error="handleError"
            />
          </section>

          <!-- List Section -->
          <section class="section list-section">
            <ProductList 
              :products="products"
              :loading="loading"
              @product-deleted="handleProductDeleted"
              @product-updated="handleProductUpdated"
              @error="handleError"
            />
          </section>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>Learn Vue.js + Spring Boot Together | Created with ❤️</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import { useProducts } from './composables/useProducts'

const { products, loading, fetchProducts } = useProducts()
const successMessage = ref('')
const errorMessage = ref('')

onMounted(() => {
  fetchProducts()
})

function handleProductAdded() {
  successMessage.value = '✅ Product added successfully!'
  errorMessage.value = ''
  fetchProducts()
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

function handleProductDeleted() {
  successMessage.value = '✅ Product deleted successfully!'
  errorMessage.value = ''
  fetchProducts()
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

function handleProductUpdated() {
  successMessage.value = '✅ Product updated successfully!'
  errorMessage.value = ''
  fetchProducts()
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

function handleError(error) {
  errorMessage.value = `❌ ${error}`
  successMessage.value = ''
  setTimeout(() => {
    errorMessage.value = ''
  }, 5000)
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 40px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.header-content p {
  font-size: 1.1em;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.alert {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.3s ease-out;
}

.alert-success {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4caf50;
  color: #2e7d32;
}

.alert-error {
  background: rgba(244, 67, 54, 0.2);
  border: 1px solid #f44336;
  color: #c62828;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.app-footer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 40px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .header-content h1 {
    font-size: 1.8em;
  }

  .app-main {
    padding: 20px 10px;
  }

  .section {
    padding: 20px;
  }
}
</style>