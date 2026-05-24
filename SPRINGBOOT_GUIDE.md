# Spring Boot Learning Guide

## What is Spring Boot?

Spring Boot is a **framework for building Java applications** that makes it easy to create:
- REST APIs
- Web applications
- Microservices
- Real-time applications

### Why Spring Boot?

- ✅ **Opinionated**: Best practices built-in
- ✅ **Convention over Configuration**: Less boilerplate code
- ✅ **Embedded server**: No need to deploy to external server
- ✅ **Fast development**: Rapid prototyping
- ✅ **Production-ready**: Monitoring, metrics, security built-in

---

## Core Concepts

### 1. Dependency Injection (DI)

**What it is:** Spring automatically manages object creation and dependencies.

**Without Dependency Injection:**
```java
public class UserService {
  private UserRepository repository = new UserRepository();
  
  public void saveUser(User user) {
    repository.save(user);
  }
}
```

**Problem:** Tightly coupled, hard to test, hard to change implementation.

**With Dependency Injection:**
```java
public class UserService {
  private UserRepository repository;
  
  // Spring injects the dependency
  @Autowired
  public UserService(UserRepository repository) {
    this.repository = repository;
  }
  
  public void saveUser(User user) {
    repository.save(user);
  }
}
```

**Benefits:**
- Loose coupling
- Easy testing (inject mock objects)
- Easy to change implementations
- Cleaner code

### 2. Annotations

**What it is:** Markers in code that tell Spring what to do.

#### `@SpringBootApplication`

Marks the main entry point of the Spring Boot application.

```java
@SpringBootApplication
public class SpringBootVueApp {
  public static void main(String[] args) {
    SpringApplication.run(SpringBootVueApp.class, args);
  }
}
```

#### `@RestController`

Marks a class as a REST API controller.

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
  // Handle HTTP requests
}
```

#### `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`

Define HTTP endpoints.

```java
@GetMapping              // GET /api/products
public List<Product> getAll() { ... }

@GetMapping("/{id}")    // GET /api/products/1
public Product getById(@PathVariable Long id) { ... }

@PostMapping             // POST /api/products
public Product create(@RequestBody Product product) { ... }

@PutMapping("/{id}")    // PUT /api/products/1
public Product update(@PathVariable Long id, @RequestBody Product product) { ... }

@DeleteMapping("/{id}") // DELETE /api/products/1
public void delete(@PathVariable Long id) { ... }
```

#### `@Service`

Marks a class as a business logic layer.

```java
@Service
public class ProductService {
  // Contains business logic
}
```

#### `@Repository`

Marks a class as a data access layer.

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  // CRUD operations + custom queries
}
```

#### `@Entity`

Marks a class as a database entity/table.

```java
@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String name;
  
  private String description;
}
```

#### `@Autowired`

Injects a dependency automatically.

```java
@RestController
public class ProductController {
  @Autowired
  private ProductService productService;
  
  // productService is automatically injected
}
```

### 3. MVC Architecture

Spring Boot follows the **Model-View-Controller** pattern.

```
Request Flow:
  1. User sends HTTP request to API
       ↓
  2. @RestController receives request
       ↓
  3. Controller calls @Service (business logic)
       ↓
  4. Service calls @Repository (data access)
       ↓
  5. Repository queries database
       ↓
  6. Response flows back through layers
       ↓
  7. JSON response sent to user
```

**Example:**

```java
// 1. MODEL (Entity)
@Entity
public class Product {
  private Long id;
  private String name;
  private double price;
}

// 2. REPOSITORY (Data Access)
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}

// 3. SERVICE (Business Logic)
@Service
public class ProductService {
  @Autowired
  private ProductRepository repository;
  
  public List<Product> getAllProducts() {
    return repository.findAll();
  }
  
  public Product createProduct(Product product) {
    return repository.save(product);
  }
}

// 4. CONTROLLER (API Endpoints)
@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
  private ProductService service;
  
  @GetMapping
  public List<Product> getAll() {
    return service.getAllProducts();
  }
  
  @PostMapping
  public Product create(@RequestBody Product product) {
    return service.createProduct(product);
  }
}
```

### 4. Data Access with JPA/Hibernate

**JPA (Java Persistence API):** Standard interface for database access.
**Hibernate:** Most popular JPA implementation.

#### Creating an Entity

```java
@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false, length = 100)
  private String name;
  
  @Column(columnDefinition = "TEXT")
  private String description;
  
  @Column(nullable = false)
  private Double price;
  
  @Column(nullable = false)
  private Integer quantity;
  
  // Getters and Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  
  // ... more getters/setters
}
```

**Annotations Explained:**
- `@Entity`: This class represents a database table
- `@Table(name="products")`: Table name in database
- `@Id`: Primary key
- `@GeneratedValue`: Auto-generate ID
- `@Column`: Column properties and constraints

#### Creating a Repository

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  // JpaRepository provides:
  // - findAll()      : Get all records
  // - findById(id)   : Get by ID
  // - save(entity)   : Create or update
  // - delete(entity) : Delete record
  // - deleteById(id) : Delete by ID
  
  // Custom queries:
  List<Product> findByNameContaining(String name);
  List<Product> findByPriceGreaterThan(Double price);
  Product findByName(String name);
}
```

### 5. RESTful API Design

**REST Principles:**
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Use meaningful URLs
- Return appropriate status codes
- Return JSON responses

**Example API Endpoints:**

```
GET    /api/products              → Get all products
GET    /api/products/1            → Get product with ID 1
POST   /api/products              → Create new product
PUT    /api/products/1            → Update product with ID 1
DELETE /api/products/1            → Delete product with ID 1
```

**Status Codes:**
- `200 OK`: Request successful
- `201 Created`: Resource created
- `204 No Content`: Successful but no content
- `400 Bad Request`: Invalid request
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Example Controller:**

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
  private ProductService service;
  
  @GetMapping
  public ResponseEntity<List<Product>> getAll() {
    return ResponseEntity.ok(service.getAllProducts());
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<Product> getById(@PathVariable Long id) {
    return service.getProductById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }
  
  @PostMapping
  public ResponseEntity<Product> create(@RequestBody Product product) {
    return ResponseEntity.status(201)
      .body(service.createProduct(product));
  }
  
  @PutMapping("/{id}")
  public ResponseEntity<Product> update(
    @PathVariable Long id, 
    @RequestBody Product product) {
    return ResponseEntity.ok(service.updateProduct(id, product));
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.deleteProduct(id);
    return ResponseEntity.noContent().build();
  }
}
```

### 6. Exception Handling

**Global Exception Handler:**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleNotFound(
    ResourceNotFoundException ex) {
    Map<String, String> error = new HashMap<>();
    error.put("message", ex.getMessage());
    error.put("status", "404");
    return ResponseEntity.status(404).body(error);
  }
  
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGeneral(
    Exception ex) {
    Map<String, String> error = new HashMap<>();
    error.put("message", "An error occurred");
    error.put("status", "500");
    return ResponseEntity.status(500).body(error);
  }
}
```

### 7. Configuration

**application.properties:**

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database (H2)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## Project Structure

```
backend/
├── src/main/java/com/example/
│   ├── SpringBootVueApp.java           # Main class
│   ├── entity/
│   │   └── Product.java                # Database entity
│   ├── repository/
│   │   └── ProductRepository.java      # Data access
│   ├── service/
│   │   └── ProductService.java         # Business logic
│   ├── controller/
│   │   └── ProductController.java      # REST API
│   └── config/
│       └── CorsConfig.java             # CORS configuration
├── src/main/resources/
│   └── application.properties          # Configuration
└── pom.xml                             # Maven dependencies
```

---

## Common HTTP Methods

| Method | Purpose | Example |
|--------|---------|----------|
| GET | Retrieve data | GET /api/products |
| POST | Create data | POST /api/products |
| PUT | Update data | PUT /api/products/1 |
| DELETE | Delete data | DELETE /api/products/1 |
| PATCH | Partial update | PATCH /api/products/1 |

---

## Testing API Endpoints

### Using cURL

```bash
# GET
curl http://localhost:8080/api/products

# POST
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99}'

# PUT
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Desktop","price":1299.99}'

# DELETE
curl -X DELETE http://localhost:8080/api/products/1
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new requests
3. Set method (GET, POST, etc.)
4. Enter URL
5. For POST/PUT: Add JSON body
6. Send request

---

## Best Practices

✅ **Do:**
- Use meaningful class and method names
- Follow the MVC architecture
- Use DTOs (Data Transfer Objects) for API responses
- Implement proper error handling
- Add logging
- Write unit tests
- Use constructor injection instead of @Autowired
- Validate input data

❌ **Don't:**
- Put business logic in controllers
- Create dependencies manually
- Ignore null checks
- Return null from methods
- Use deprecated APIs
- Expose internal entities in API responses

---

## Common Patterns

### DTO Pattern

```java
// Entity (Database)
@Entity
public class Product {
  private Long id;
  private String name;
  private Double price;
}

// DTO (API Response)
public class ProductDTO {
  private Long id;
  private String name;
  private Double price;
  
  // Getters and Setters
}

// Conversion in Controller
@GetMapping
public List<ProductDTO> getAll() {
  return service.getAllProducts()
    .stream()
    .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice()))
    .collect(Collectors.toList());
}
```

### Service Pattern

```java
@Service
public class ProductService {
  @Autowired
  private ProductRepository repository;
  
  public List<Product> getAllProducts() {
    return repository.findAll();
  }
  
  public Product createProduct(Product product) {
    // Add validation or business logic here
    return repository.save(product);
  }
  
  public Product updateProduct(Long id, Product product) {
    Product existing = repository.findById(id)
      .orElseThrow(() -> new RuntimeException("Not found"));
    
    existing.setName(product.getName());
    existing.setPrice(product.getPrice());
    
    return repository.save(existing);
  }
  
  public void deleteProduct(Long id) {
    repository.deleteById(id);
  }
}
```

---

## Resources

- **Official Docs:** https://spring.io/projects/spring-boot
- **Spring Guides:** https://spring.io/guides
- **JPA Documentation:** https://jakarta.ee/learn/
- **REST API Best Practices:** https://restfulapi.net/
- **Baeldung Tutorials:** https://www.baeldung.com/

---

## Summary

Spring Boot simplifies Java development and makes it easy to build robust, scalable applications. Master these concepts and you'll be able to build professional backend services!

🚀 **Next Step:** Build your own REST APIs and integrate them with frontend applications!