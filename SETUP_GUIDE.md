# Setup Guide - Vue.js + Spring Boot Project

## Prerequisites

- **Java 11 or higher** - [Download](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 14+** - [Download](https://nodejs.org/)
- **npm 6+** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Backend Setup (Spring Boot)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
mvn clean install
```

This command:
- Cleans previous builds
- Downloads all dependencies from Maven Central Repository
- Compiles the Java code
- Packages the application

### Step 3: Run the Application

```bash
mvn spring-boot:run
```

You should see output like:
```
...
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.0)

2026-05-24 10:00:00.000  INFO 12345 --- [main] c.e.SpringBootVueApp : Started Application in 2.5 seconds
```

### Step 4: Test the Backend

Open your browser or use curl to test:

```bash
curl http://localhost:8080/api/products/health
```

You should see: `{"status":"UP","message":"Spring Boot is running!"}`

**Backend is now running on:** `http://localhost:8080`

---

## Frontend Setup (Vue.js)

### Step 1: Navigate to Frontend Directory

Open a **new terminal** and run:

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all npm packages specified in `package.json`:
- vue@3
- axios (for API calls)
- vite (build tool)

### Step 3: Run the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v4.0.0  ready in 1234 ms

  ➜  Local:   http://localhost:8081/
  ➜  press h to show help
```

**Frontend is now running on:** `http://localhost:8081`

### Step 4: Open in Browser

Navigate to `http://localhost:8081` in your web browser.

---

## Verify Everything Works

### Test 1: Backend Health Check

```bash
curl http://localhost:8080/api/products/health
```

Expected response:
```json
{"status":"UP","message":"Spring Boot is running!"}
```

### Test 2: Get All Products

```bash
curl http://localhost:8080/api/products
```

Expected response (empty array initially):
```json
[]
```

### Test 3: Create a Product

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming Laptop","price":1299.99,"quantity":5}'
```

### Test 4: Vue.js Frontend

Visit `http://localhost:8081` and try:
- Adding a new product
- Viewing all products
- Updating a product
- Deleting a product

---

## Troubleshooting

### Backend Won't Start

**Problem:** `Port 8080 is already in use`

**Solution:** Change the port in `backend/src/main/resources/application.properties`:
```properties
server.port=8090
```

**Problem:** `Maven command not found`

**Solution:** Ensure Maven is installed and added to PATH:
```bash
mvn --version
```

### Frontend Won't Start

**Problem:** `Port 8081 is already in use`

**Solution:** Run on a different port:
```bash
npm run dev -- --port 8082
```

**Problem:** `npm: command not found`

**Solution:** Install Node.js from https://nodejs.org/

### CORS Errors

**Problem:** Console shows `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** The backend has CORS configured. Make sure both are running:
- Backend on `http://localhost:8080`
- Frontend on `http://localhost:8081`

---

## Database

The project uses **H2 Database** (in-memory):

- **H2 Console:** http://localhost:8080/h2-console
- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** (leave empty)

**Note:** Data is cleared when the application restarts.

---

## Building for Production

### Backend (Spring Boot)

```bash
cd backend
mvn clean package
java -jar target/*.jar
```

### Frontend (Vue.js)

```bash
cd frontend
npm run build
```

Built files will be in `frontend/dist/` directory.

---

## IDE Setup

### IntelliJ IDEA / WebStorm

1. Open the project root folder
2. IDE will auto-detect Maven and npm projects
3. Run → Edit Configurations → Add new configuration for Spring Boot
4. Set Main class to `com.example.SpringBootVueApp`

### Visual Studio Code

Install extensions:
- Extension Pack for Java
- Vetur (for Vue.js)
- REST Client

---

## Next Steps

1. Read `VUEJS_GUIDE.md` to understand Vue.js concepts
2. Read `SPRINGBOOT_GUIDE.md` to understand Spring Boot concepts
3. Modify the product model to add more fields
4. Add validation to forms
5. Implement user authentication
6. Deploy to cloud (Heroku, AWS, etc.)

Happy learning! 🚀