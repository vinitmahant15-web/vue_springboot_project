# Vue.js Learning Guide

## What is Vue.js?

Vue.js is a **progressive JavaScript framework** for building user interfaces. It's:
- **Progressive**: Use as much or as little as you want
- **Reactive**: Automatically updates UI when data changes
- **Component-based**: Build reusable UI pieces
- **Easy to learn**: Simple syntax and great documentation

### Vue.js vs Other Frameworks

| Feature | Vue | React | Angular |
|---------|-----|-------|----------|
| Learning Curve | Easy | Moderate | Steep |
| Performance | Fast | Fast | Moderate |
| Community | Large | Very Large | Large |
| File Size | Small | Moderate | Large |
| Flexibility | High | High | Moderate |

---

## Core Concepts

### 1. Reactivity

**What it is:** Vue automatically tracks changes to data and updates the DOM.

**Example:**

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)  // Reactive variable
</script>
```

**How it works:**
1. User clicks button
2. `count++` executes
3. Vue detects the change
4. Vue updates the DOM automatically
5. User sees "Count: 1"

### 2. Components

**What it is:** Reusable pieces of UI with their own template, logic, and styling.

**Component Structure:**

```vue
<template>
  <!-- HTML Structure (UI) -->
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script setup>
// JavaScript Logic
import { ref } from 'vue'

const title = ref('My Component')
const description = ref('This is a reusable component')

function handleClick() {
  console.log('Button clicked!')
}
</script>

<style scoped>
/* CSS Styling (scoped to this component) */
.card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

**Benefits:**
- Reusability
- Maintainability
- Testability
- Encapsulation

### 3. Composition API

**What it is:** A modern way to organize component logic using functions.

**Key Functions:**

#### `ref()` - Create Reactive Variables

```javascript
import { ref } from 'vue'

const count = ref(0)
const name = ref('John')
const items = ref([])

// Access value with .value in script
console.log(count.value)  // 0
count.value++

// In template, no need for .value
// {{ count }} automatically unwraps
```

#### `computed()` - Derived Reactive Values

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// Computed property updates automatically
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

console.log(fullName.value)  // "John Doe"
```

#### `watch()` - Monitor Value Changes

```javascript
import { ref, watch } from 'vue'

const count = ref(0)

// Watch for changes
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})
```

#### Lifecycle Hooks

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

// Component is mounted to DOM
onMounted(() => {
  console.log('Component mounted')
  // Fetch data, initialize libraries, etc.
})

// Component re-rendered
onUpdated(() => {
  console.log('Component updated')
})

// Component removed from DOM
onUnmounted(() => {
  console.log('Component unmounted')
  // Cleanup, remove listeners, etc.
})
```

### 4. Data Binding

#### Text Interpolation (One-way binding)

```vue
<template>
  <p>Hello {{ name }}!</p>
  <p>2 + 2 = {{ 2 + 2 }}</p>
  <p>{{ name.toUpperCase() }}</p>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Vue')
</script>
```

#### Attribute Binding

```vue
<template>
  <!-- Bind to HTML attributes -->
  <img :src="imageUrl" :alt="imageAlt">
  <a :href="linkUrl">Click here</a>
  <button :disabled="isDisabled">Submit</button>
</template>

<script setup>
import { ref } from 'vue'
const imageUrl = ref('/logo.png')
const imageAlt = ref('Logo')
const linkUrl = ref('https://example.com')
const isDisabled = ref(false)
</script>
```

#### Two-way Binding (v-model)

```vue
<template>
  <input v-model="message" placeholder="Type something...">
  <p>You typed: {{ message }}</p>
  
  <input v-model="count" type="number">
  <p>Count: {{ count }}</p>
  
  <textarea v-model="biography"></textarea>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('')
const count = ref(0)
const biography = ref('')
</script>
```

**How it works:**
- Input changes → updates `message`
- `message` updates → input shows new value

#### Event Binding

```vue
<template>
  <!-- Listen to events -->
  <button @click="handleClick">Click me</button>
  <button @click="count++">Count: {{ count }}</button>
  <button @click="handleClick('hello')">Send message</button>
  
  <!-- Form events -->
  <form @submit.prevent="handleSubmit">
    <input v-model="name">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Input events -->
  <input @input="handleInput" @keyup.enter="handleEnter">
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
const name = ref('')

function handleClick(message) {
  console.log('Button clicked:', message)
}

function handleSubmit() {
  console.log('Form submitted:', name.value)
}

function handleInput(event) {
  console.log('Input value:', event.target.value)
}

function handleEnter() {
  console.log('Enter key pressed')
}
</script>
```

### 5. Directives

**What it is:** Special Vue attributes that add behavior to HTML elements.

#### v-if / v-else-if / v-else

```vue
<template>
  <div>
    <p v-if="age < 18">You are a minor</p>
    <p v-else-if="age < 65">You are an adult</p>
    <p v-else>You are a senior</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const age = ref(25)
</script>
```

#### v-show

```vue
<template>
  <!-- v-if removes from DOM, v-show hides with CSS -->
  <p v-show="isVisible">This text is hidden with CSS</p>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(true)
</script>
```

#### v-for

```vue
<template>
  <!-- Loop through arrays -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- Loop through objects -->
  <div>
    <div v-for="(value, key) in user" :key="key">
      {{ key }}: {{ value }}
    </div>
  </div>
  
  <!-- With index -->
  <div v-for="(item, index) in items" :key="index">
    {{ index }}: {{ item }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])

const user = ref({
  name: 'John',
  age: 30,
  city: 'New York'
})
</script>
```

**Important:** Always use `:key` for v-for loops for better performance and correctness.

#### v-bind

```vue
<template>
  <!-- Bind to class -->
  <div :class="{ active: isActive, 'text-large': isBig }">
    Content
  </div>
  
  <!-- Bind to style -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    Styled content
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const isBig = ref(false)
const textColor = ref('red')
const fontSize = ref(16)
</script>
```

### 6. Props and Emits

**Props:** Pass data from parent to child component.

**Parent Component:**
```vue
<template>
  <ChildComponent 
    :title="title" 
    :count="count"
    @update="handleUpdate"
  />
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const title = ref('Hello')
const count = ref(0)

function handleUpdate(newValue) {
  count.value = newValue
}
</script>
```

**Child Component:**
```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <button @click="emitUpdate">Increment</button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  count: Number
})

const emit = defineEmits(['update'])

function emitUpdate() {
  emit('update', count + 1)
}
</script>
```

---

## Project Structure Example

```
src/
├── components/
│   ├── ProductForm.vue      # Form component
│   ├── ProductList.vue      # List component
│   └── ProductCard.vue      # Card component
├── composables/
│   ├── useProducts.js       # Product logic
│   └── useApi.js            # API logic
├── App.vue                  # Root component
├── main.js                  # Entry point
└── index.html               # HTML file
```

---

## Best Practices

✅ **Do:**
- Use `<script setup>` syntax (modern and cleaner)
- Keep components small and focused
- Use meaningful names for variables and functions
- Use `:key` in v-for loops
- Extract reusable logic into composables
- Use descriptive prop names
- Add comments for complex logic

❌ **Don't:**
- Mutate props directly (use emits instead)
- Use `any` type in TypeScript
- Create overly large components
- Use v-if for frequently toggled elements (use v-show instead)
- Forget cleanup in lifecycle hooks

---

## Common Patterns

### Fetch Data on Component Mount

```vue
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/products')
    products.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
```

### Form Validation

```vue
<script setup>
import { ref, computed } from 'vue'

const form = ref({
  name: '',
  email: '',
  age: ''
})

const errors = ref({})

const isFormValid = computed(() => {
  return form.value.name && form.value.email && form.value.age
})

function validate() {
  errors.value = {}
  
  if (!form.value.name) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.email.includes('@')) {
    errors.value.email = 'Invalid email'
  }
  
  if (form.value.age < 18) {
    errors.value.age = 'Must be 18 or older'
  }
  
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (validate()) {
    console.log('Form is valid', form.value)
  }
}
</script>
```

---

## Resources

- **Official Docs:** https://vuejs.org
- **Vue 3 Composition API:** https://vuejs.org/guide/extras/composition-api-faq.html
- **Vue DevTools:** Chrome/Firefox extension for debugging
- **Community:** https://discord.com/invite/vue

---

## Summary

Vue.js makes building reactive, interactive web applications simple and enjoyable. Master these concepts and you'll be able to build professional web applications!

🚀 **Next Step:** Start building components and combining them into larger applications!