<template>
  <div class="list-container">
    <h2>📋 Products</h2>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="empty-state">
      <p>📭 No products found</p>
      <p class="hint">Add your first product using the form on the left</p>
    </div>

    <!-- Products Table -->
    <div v-else class="products-wrapper">
      <table class="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="product-row">
            <td class="name-cell">{{ product.name }}</td>
            <td class="description-cell">{{ product.description || '-' }}</td>
            <td class="price-cell">${{ formatPrice(product.price) }}</td>
            <td class="quantity-cell">{{ product.quantity }}</td>
            <td class="actions-cell">
              <button
                @click="showEditModal(product)"
                class="btn btn-sm btn-edit"
                title="Edit product"
              >
                ✏️ Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="btn btn-sm btn-delete"
                title="Delete product"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <EditProductModal
      v-if="editingProduct"
      :product="editingProduct"
      @save="updateProduct"
      @close="editingProduct = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import EditProductModal from './EditProductModal.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['product-deleted', 'product-updated', 'error'])

const editingProduct = ref(null)

function formatPrice(price) {
  return price.toFixed(2)
}

function showEditModal(product) {
  editingProduct.value = { ...product }
}

async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`)
      emit('product-deleted')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product'
      emit('error', message)
    }
  }
}

async function updateProduct(updatedProduct) {
  try {
    await axios.put(
      `http://localhost:8080/api/products/${updatedProduct.id}`,
      updatedProduct
    )
    editingProduct.value = null
    emit('product-updated')
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update product'
    emit('error', message)
  }
}
</script>

<style scoped>
.list-container {
  height: 100%;
}

.list-container h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 1.5em;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  color: #999;
}

.empty-state p {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.empty-state .hint {
  font-size: 0.95em;
  color: #bbb;
}

.products-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95em;
}

.products-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.products-table th {
  padding: 15px 10px;
  text-align: left;
}

.products-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s;
}

.products-table tbody tr:hover {
  background-color: #f8f9ff;
}

.products-table td {
  padding: 15px 10px;
}

.name-cell {
  font-weight: 600;
  color: #333;
}

.description-cell {
  color: #666;
  font-size: 0.9em;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price-cell {
  color: #2e7d32;
  font-weight: 600;
}

.quantity-cell {
  text-align: center;
  font-weight: 500;
}

.actions-cell {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-sm {
  padding: 6px 10px;
  font-size: 0.85em;
}

.btn-edit {
  background: #4caf50;
  color: white;
}

.btn-edit:hover {
  background: #45a049;
  transform: scale(1.05);
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #da190b;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .products-table {
    font-size: 0.85em;
  }

  .products-table th,
  .products-table td {
    padding: 10px 5px;
  }

  .description-cell {
    display: none;
  }

  .actions-cell {
    flex-direction: column;
  }
}
</style>