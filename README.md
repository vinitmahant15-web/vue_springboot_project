# Vue.js + Spring Boot Full-Stack Project

A comprehensive full-stack learning project combining Vue.js frontend with Spring Boot backend.

## Features

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Real-time inventory management
✅ Form validation
✅ Error handling
✅ Responsive design
✅ REST API architecture
✅ CORS enabled for frontend-backend communication
✅ H2 in-memory database

## Project Structure

```
vue_springboot_project/
├── backend/               # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       └── java/com/example/
│   │           ├── SpringBootVueApp.java
│   │           ├── model/Product.java
│   │           ├── repository/ProductRepository.java
│   │           ├── service/ProductService.java
│   │           ├── controller/ProductController.java
│   │           └── config/CorsConfig.java
│   └── pom.xml
├── frontend/              # Vue.js Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.vue
│   │   │   └── ProductList.vue
│   │   ├── composables/
│   │   │   └── useProducts.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── SETUP_GUIDE.md
├── VUEJS_GUIDE.md
└── SPRINGBOOT_GUIDE.md
```

## Quick Start

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:8081`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/health` - Health check

## Technologies Used

**Backend:**
- Java 11+
- Spring Boot 2.7+
- Spring Data JPA
- H2 Database
- Maven

**Frontend:**
- Vue.js 3
- Composition API
- Axios (HTTP client)
- Vite (Build tool)
- npm

## Learning Resources

- `VUEJS_GUIDE.md` - Complete Vue.js concepts explained
- `SPRINGBOOT_GUIDE.md` - Complete Spring Boot concepts explained
- `SETUP_GUIDE.md` - Step-by-step setup instructions

## Directory Structure Details

### Backend Endpoints Example

**Create a Product (POST)**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 10
}
```

**Response**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "quantity": 10
}
```

## Author

Vinit Mahant

## License

MIT