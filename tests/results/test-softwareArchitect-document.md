# Software Architecture Document

## System Architecture Overview

The Recipe App is a cloud-native, mobile-first application designed to serve millions of users with features including ingredient search, user account management, recipe database access, and shopping list generation. The system is architected for high scalability and reliability, leveraging microservices, a cloud database, and offline-first support on mobile clients.

**Key Architectural Highlights:**
- Microservices-based backend deployed in the cloud (e.g., AWS, GCP, or Azure)
- RESTful and GraphQL APIs for flexible client data consumption
- Mobile and web clients with offline data synchronization
- Scalable data stores for user, recipe, and ingredient data
- Authentication and secure data handling

## Technology Stack

### Backend
- **Node.js with Express.js**: For building fast, scalable REST/GraphQL APIs
- **GraphQL**: Flexible API for recipe/ingredient search and shopping list generation
- **MongoDB Atlas**: NoSQL cloud database for recipes, ingredients, and user data (supports horizontal scaling)
- **Redis**: In-memory cache for high-performance ingredient/recipe search
- **RabbitMQ/Kafka**: For handling asynchronous tasks (e.g., shopping list generation, notifications)

### Frontend
- **React Native**: Cross-platform mobile app with offline-first support
- **React.js**: Web app for browser-based access (optional)
- **Redux/Persist**: Client-side state management with local persistence for offline functionality
- **Service Workers (Web)**: Offline caching in web app

### DevOps/Infrastructure
- **Docker & Kubernetes**: Containerization and orchestration for microservices
- **AWS S3**: Storage for recipe images/media
- **Cloudflare**: CDN & edge caching for static assets

### Authentication & Security
- **OAuth 2.0 / OpenID Connect**: Secure user authentication (via Auth0 or AWS Cognito)
- **HTTPS/TLS**: Secure communication

## Data Models

### User
- `user_id`: UUID
- `email`: string (unique)
- `password_hash`: string
- `name`: string
- `preferences`: object (e.g., dietary restrictions)
- `created_at`: datetime
- `updated_at`: datetime

### Recipe
- `recipe_id`: UUID
- `title`: string
- `description`: string
- `ingredients`: array of `IngredientReference`
- `instructions`: array of string
- `image_url`: string
- `author_id`: UUID (User)
- `tags`: array of string (e.g., vegan, gluten-free)
- `created_at`: datetime
- `updated_at`: datetime

### Ingredient
- `ingredient_id`: UUID
- `name`: string
- `aliases`: array of string
- `nutrition_info`: object
- `category`: string

### ShoppingList
- `list_id`: UUID
- `user_id`: UUID
- `items`: array of `IngredientReference`
- `generated_from`: array of `recipe_id`
- `created_at`: datetime
- `updated_at`: datetime

#### `IngredientReference`
- `ingredient_id`: UUID
- `quantity`: string
- `unit`: string

**Relationships:**
- Users can have multiple shopping lists
- Recipes are authored by users and reference multiple ingredients

## API Specifications

### Authentication
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Authenticate user and issue JWT
- `POST /api/auth/refresh`: Refresh JWT token

### User Management
- `GET /api/users/me`: Get current profile
- `PUT /api/users/me`: Update profile/preferences

### Recipe APIs
- `GET /api/recipes/search?ingredients=...&tags=...&q=...`: Full-text and ingredient search
- `GET /api/recipes/:id`: Get recipe details
- `POST /api/recipes`: Create a new recipe (auth required)
- `PUT /api/recipes/:id`: Update recipe
- `DELETE /api/recipes/:id`: Delete recipe

### Ingredient APIs
- `GET /api/ingredients/search?q=...`: Search ingredients by name/alias
- `GET /api/ingredients/:id`: Get ingredient details

### Shopping List APIs
- `POST /api/shopping-lists/generate`: Generate shopping list from selected recipes
- `GET /api/shopping-lists`: List user’s shopping lists
- `GET /api/shopping-lists/:id`: Get shopping list details
- `PUT /api/shopping-lists/:id`: Update shopping list
- `DELETE /api/shopping-lists/:id`: Delete shopping list

### Sync APIs (for Offline Support)
- `POST /api/sync/upload`: Upload local changes (recipes,