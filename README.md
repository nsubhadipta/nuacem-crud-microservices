# NestJS Kafka PostgreSQL CRUD Microservices  

This project demonstrates a microservices-based application using NestJS, Kafka for message brokering, and PostgreSQL as the database. The architecture consists of two services:  
1. **API Producer**: Handles client requests and produces Kafka messages.  
2. **Consumer Service**: Consumes Kafka messages and performs CRUD operations on a PostgreSQL database.  

---

## Features  
- CRUD operations for a "Products" entity.  
- Event-driven architecture using Kafka.  
- PostgreSQL as the database with TypeORM for migrations and entity management.  
- Docker setup for Kafka and Zookeeper.  

---

## Prerequisites  
Before setting up the project, ensure you have:  
- [Node.js](https://nodejs.org/) installed (v16 or higher).  
- [PostgreSQL](https://www.postgresql.org/)  
- [Kafka](https://kafka.apache.org/)  
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) (optional but recommended for Kafka setup)  

---

## Setup Instructions  

### 1. Clone the Repository  
```bash  
git clone https://github.com/nsubhadipta/nuacem-crud-microservices  
cd nuacem-crud-microservices  
```

### 2. Install Dependencies 
```bash  
# API Producer  
cd api-producer  
npm install  

# Consumer Service  
cd ../consumer-service  
npm install  
  ```

### 3. Start the Services
```bash 
#  API Server Start
cd api-producer  
npm run start:dev  

# Consumer Service Start
cd ../consumer-service   
npm run start:dev  
 ```


### BaseURL: 

http://localhost:3000

### API Endpoints
- POST `/products` - Create a new product
- GET `/products/` - Fetch all products
- PUT `/products/:id` - Update a product by ID
- DELETE `/products/:id` - Delete a product by ID