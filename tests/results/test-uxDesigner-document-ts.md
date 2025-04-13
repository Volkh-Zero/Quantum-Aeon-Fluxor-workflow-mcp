# UX Design Document

## User Personas

### 1. Home Cook Hannah
- **Age:** 28  
- **Tech Savvy:** Medium  
- **Goals:** Quickly find recipes using ingredients she already has, avoid food waste, save favorite recipes for later, and easily generate shopping lists for missing ingredients.
- **Frustrations:** Complicated ingredient input, irrelevant recipe results, difficulty tracking what’s missing.

### 2. Busy Parent Ben
- **Age:** 40  
- **Tech Savvy:** Low-Medium  
- **Goals:** Prepare meals efficiently, manage family dietary preferences, save tried-and-true recipes, and generate shopping lists for grocery runs.
- **Frustrations:** Overly complex interfaces, hard-to-find save or shopping list features.

### 3. Beginner Cook Chloe
- **Age:** 22  
- **Tech Savvy:** High  
- **Goals:** Discover easy-to-make recipes, input random ingredients, save favorites, and get clear shopping lists.
- **Frustrations:** Overwhelming information, unclear steps or missing features.

---

## User Journey Maps

### Journey 1: Ingredient-Based Search and Recipe Discovery
1. **Open App**
2. **Input Ingredients:** Uses search bar or ingredient picker to add what’s available.
3. **View Matching Recipes:** Sees list of recipes filtered by input ingredients.
4. **Select Recipe:** Taps on a recipe for more details.
5. **See Missing Ingredients:** Clearly view what’s missing.
6. **Add to Shopping List:** Option to add missing ingredients to a shopping list.
7. **Save Recipe:** Option to favorite or bookmark recipe.

### Journey 2: Favorite Recipes Management
1. **Browse or Search Recipes**
2. **Save/Favorite Recipe:** Tap heart/star icon.
3. **Access Favorites:** Go to ‘Favorites’ section for quick access.

### Journey 3: Shopping List Generation
1. **View Recipe Details**
2. **See Missing Ingredients Highlighted**
3. **Generate Shopping List:** Tap to add missing items to a new or existing shopping list.
4. **View/Manage Shopping List:** Access list to check off items while shopping.

---

## Information Architecture

- **Home**
    - Ingredient Input
    - Suggested Ingredients
    - Recent Searches
- **Recipe Results**
    - Filtered by available ingredients
    - Filters (prep time, dietary needs, cuisine, etc.)
- **Recipe Details**
    - Ingredients (with missing ones highlighted)
    - Steps/Instructions
    - Save/Favorite Button
    - Add Missing to Shopping List
- **Favorites**
    - List of favorited recipes
- **Shopping List**
    - Auto-generated from missing ingredients
    - Manual add/remove/edit items

---

## Wireframe Descriptions

### 1. Home Screen
- **Ingredient Input Field:** Prominent at the top, allows typing or choosing from a list.
- **Suggested Ingredients:** Quick access buttons for common ingredients.
- **Recent Searches:** Easy access below the input field.

### 2. Recipe Results Screen
- **Recipe Cards:** Show recipe name, image, time, and how many of the user’s ingredients are matched.
- **Filters Bar:** For additional sorting or filtering.

### 3. Recipe Detail Screen
- **Recipe Image and Title**
- **Ingredients List:** Show which are available (checked), and which are missing (highlighted with an ‘Add to Shopping List’ button).
- **Instructions Section:** Step-by-step, easy to follow.
- **Save/Favorite Icon:** Star or heart, easy to tap.
- **Generate Shopping List Button**

### 4. Favorites Screen
- **List/Grid of Saved Recipes:** With quick access to details or remove from favorites.

### 5. Shopping List Screen
- **List of Items:** Checkboxes for each, option to add or remove items.
- **Share/Export Option:** Send list via text or other apps.

---

## Prototype Plan

- **Home Screen:** Enable ingredient input (manual and suggested), show real-time recipe results upon entry.
- **Recipe Results:** Allow tapping recipe cards to open detail view.
- **Recipe Detail:** Highlight missing ingredients, provide tap-to-add to shopping list, and save/favorite functionality.
- **Favorites:** View and manage saved recipes.
- **Shopping List:** Add, remove, and check off items; generate from recipe details.
- **Navigation:** Simple bottom tab bar or hamburger menu for navigation between main sections.

**Prototype flow:**  
1. Start on Home, input ingredients.  
2. Instantly see matching recipes.  
3. Tap a recipe, review details, see missing ingredients.  
4. Save favorite or generate shopping list from missing ingredients.  
5. View/manage shopping list and favorites from bottom navigation.

---

**Next steps:** Design low-fidelity wireframes for key screens