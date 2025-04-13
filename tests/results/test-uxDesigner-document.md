# UX Design Document

## User Personas

### 1. Home Cook Harry
- **Age:** 35  
- **Tech Savvy:** Moderate  
- **Needs:** Quickly find recipes using available ingredients, avoid food waste, and save favorite recipes for later.
- **Pain Points:** Struggles to remember what to cook with what’s on hand, dislikes long prep times.

### 2. Busy Parent Priya
- **Age:** 42  
- **Tech Savvy:** Moderate  
- **Needs:** Fast, nutritious meal ideas with minimal effort. Easy shopping list generation for missing items.
- **Pain Points:** Limited time, needs to manage family dietary restrictions, dislikes complicated apps.

### 3. College Student Chris
- **Age:** 20  
- **Tech Savvy:** High  
- **Needs:** Quick and cheap meal ideas based on the few ingredients available, ability to save and share recipes.
- **Pain Points:** Small budget, limited cooking experience, often missing a few ingredients.

---

## User Journey Maps

### Journey 1: Input Ingredients and Find Recipes
1. **Open App**
2. **Tap 'Ingredient Search'**
3. **Input ingredients using text or voice**
4. **View list of matching recipes**
5. **Select a recipe for more details**

### Journey 2: Save Favorite Recipe
1. **Browse or search for a recipe**
2. **Tap 'Save' or 'Favorite' icon**
3. **Recipe appears in 'Favorites' section for easy access**

### Journey 3: Generate Shopping List
1. **Select a recipe**
2. **View list of required ingredients**
3. **App highlights missing ingredients**
4. **One-tap add missing items to shopping list**
5. **View/edit shopping list for use in-store**

---

## Information Architecture

- **Home**
  - Ingredient Search
  - Recent Searches
  - Favorites
  - Shopping List
- **Search**
  - Input Ingredients
  - Suggested Ingredients
  - Search Results (Recipe List)
- **Recipe Details**
  - Ingredients
    - Owned
    - Missing (Add to shopping list)
  - Steps/Instructions
  - Save to Favorites
- **Favorites**
  - Saved Recipes List
- **Shopping List**
  - Auto-generated from recipes
  - Manual add/remove items

---

## Wireframe Descriptions

### 1. Home Screen
- **Quick access** to Ingredient Search, Favorites, and Shopping List.
- Recent searches displayed as chips/buttons for repeat use.

### 2. Ingredient Search Screen
- **Input field** for manual entry (with auto-suggest/auto-complete).
- **Option for voice input**.
- **List of entered ingredients** shown as removable chips.
- **'Find Recipes' button** triggers search.

### 3. Recipe List Screen
- **Recipe cards** with title, image, prep time, and percentage of ingredients owned.
- **Filters** for dietary needs, prep time, etc.

### 4. Recipe Details Screen
- **List of all ingredients**, grouped as 'You Have' and 'You Need'.
- **Instructions** section.
- **Save to Favorites** and **Add Missing to Shopping List** buttons.

### 5. Favorites Screen
- Grid or list of saved recipe cards for quick retrieval.

### 6. Shopping List Screen
- **Auto-grouped items** by recipe or category.
- **Check-off items** as you shop.
- **Edit list**: add/remove manually.

---

## Prototype Plan

- **Navigation:** Bottom navigation bar for Home, Search, Favorites, Shopping List.
- **Ingredient Input:** Use chips for each ingredient, allowing easy add/remove. Support text and voice entry.
- **Recipe Search:** Display visual feedback (recipe cards) with clear indication of match percentage.
- **Favorites Workflow:** Star or heart icon to save/unfavorite recipes; update Favorites screen in real time.
- **Shopping List Generation:** On recipe selection, highlight missing ingredients and allow one-tap addition to Shopping List. Shopping List is editable and persists until cleared.
- **Interactivity:** Prototype should support simulated flows for ingredient input, recipe search, saving favorites, and generating/editing a shopping list.

---

**Next Steps:**  
- Create low-fidelity wireframes for each screen.
- Build an interactive prototype (e.g., Figma, Adobe XD) covering the main user flows.
- Conduct usability testing with target personas to refine interactions and layout.