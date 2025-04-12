# Software Architecture Document

## System Architecture Overview

The Recipe App is a scalable, cloud-native web and mobile application designed to provide users with the ability to search ingredients, manage user accounts, access a large recipe database, and generate shopping lists. The app supports offline functionality, ensuring seamless user experience even with intermittent connectivity. The system follows a microservices architecture, leveraging cloud services and edge caching for performance and reliability.

**High-Level Architecture Diagram:**
```
[Mobile/Web Client] <---> [API Gateway] <---> [Microservices: Auth, Recipe, Ingredient Search, Shopping List]
                                               |                                    |
                                       [User DB, Recipe DB]                [Cache, Offline DB]
```

## Technology Stack

- **Frontend:**
  - **Web:** React.js with Service Workers (for offline support)
  - **Mobile:** React Native (using local storage and background sync)
- **Backend:**
  - **API Gateway:** AWS API Gateway or Kong
  - **Microservices:** Node.js (Express or Fastify), containerized with Docker
  - **Databases:**
    - **User Accounts:** PostgreSQL
    - **Recipes & Ingredients:** MongoDB (supports flexible schema, fast search)
    - **Cache & Offline Sync:** Redis (central), IndexedDB (client-side)
- **Search:**
  - Elasticsearch (for fast ingredient/recipe search)
- **Authentication:**
  - OAuth 2.0 / OpenID Connect (e.g., Auth0 or AWS Cognito)
- **Cloud Platform:** AWS (EKS for containers, S3 for assets)
- **CI/CD:** GitHub Actions or AWS CodePipeline

**Justification:**  
This stack ensures scalability (Kubernetes, managed DBs), offline support (Service Workers, IndexedDB), and fast, flexible search (Elasticsearch).

## Data Models

### User
- `user_id` (UUID, PK)
- `email` (unique)
- `password_hash`
- `name`
- `preferences` (dietary, cuisine, etc.)
- `created_at`, `updated_at`
- `shopping_lists` (array of references to ShoppingList)

### Recipe
- `recipe_id` (UUID, PK)
- `title`
- `description`
- `ingredients` (array of Ingredient references)
- `instructions` (array of steps)
- `author_id` (User reference)
- `tags` (e.g., vegan, quick)
- `created_at`, `updated_at`
- `image_url`

### Ingredient
- `ingredient_id` (UUID, PK)
- `name`
- `aliases` (array)
- `nutrition_info`
- `unit`
- `category`

### ShoppingList
- `shopping_list_id` (UUID, PK)
- `user_id` (User reference)
- `items` (array of {ingredient_id, quantity, checked})
- `created_at`, `updated_at`

### Relationships
- **User** has many **ShoppingLists**
- **Recipe** has many **Ingredients**
- **Ingredient** can be in many **Recipes** and **ShoppingLists**

## API Specifications

### Authentication
- `POST /auth/register` — Register user
- `POST /auth/login` — Login, returns JWT
- `GET /auth/me` — Get current user

### Recipe
- `GET /recipes` — List/search recipes (`q`, `ingredient`, `tag`, `pagination`)
- `GET /recipes/:id` — Get recipe details
- `POST /recipes` — Create recipe (auth required)
- `PUT /recipes/:id` — Update recipe (auth, owner)
- `DELETE /recipes/:id` — Delete recipe

### Ingredient Search
- `GET /ingredients/search?q=tomato` — Suggest and search ingredients

### Shopping List
- `GET /shopping-lists` — List user’s shopping lists
- `POST /shopping-lists` — Create new shopping list
- `PUT /shopping-lists/:id` — Update shopping list (add, check/uncheck items)
- `DELETE /shopping-lists/:id` — Delete shopping list

### Offline Sync
- `POST /sync` — Batch sync offline changes (recipes, shopping lists) when back online

## Component Breakdown

### 1. Client Applications
- **Web Client:** React.js SPA with Service Workers and IndexedDB for offline cache and sync.
- **Mobile Client:** React Native, uses local storage and background sync.

### 2. API Gateway
- Handles routing, authentication, and rate limiting.

### 3. Microservices
- **Auth Service:** User registration, authentication, JWT issuance.
- **Recipe Service:** CRUD for recipes, integration with Elasticsearch for search.
- **Ingredient Service:** Ingredient management, fast lookup, and autocomplete.
- **Shopping List Service:** Shopping list management and sync