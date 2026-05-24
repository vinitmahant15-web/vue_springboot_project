import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/products'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch all products from the backend
   */
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(API_URL)
      products.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a single product by ID
   */
  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching product:', err)
      return null
    }
  }

  /**
   * Create a new product
   */
  const createProduct = async (productData) => {
    try {
      const response = await axios.post(API_URL, productData)
      products.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error creating product:', err)
      throw err
    }
  }

  /**
   * Update an existing product
   */
  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData)
      const index = products.value.findIndex(p => p.id === id)
      if (index > -1) {
        products.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error updating product:', err)
      throw err
    }
  }

  /**
   * Delete a product
   */
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Error deleting product:', err)
      throw err
    }
  }

  /**
   * Search products by name
   */
  const searchProducts = async (searchTerm) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { name: searchTerm }
      })
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error searching products:', err)
      return []
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
  }
}
