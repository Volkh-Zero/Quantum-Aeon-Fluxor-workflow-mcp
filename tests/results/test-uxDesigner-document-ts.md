# UX Design Document

## User Personas

### 1. Home Cook Helen
- **Age:** 32
- **Tech-savvy:** Moderate
- **Goals:** Quickly find recipes using ingredients she already has.
- **Frustrations:** Wasting food, complicated recipe apps, long data entry.
- **Needs:** Easy ingredient input, fast recipe suggestions, clear shopping lists.

### 2. Busy Professional Ben
- **Age:** 28
- **Tech-savvy:** High
- **Goals:** Whip up meals with limited time and what’s available at home.
- **Frustrations:** Tedious navigation, irrelevant recipe results, cluttered UI.
- **Needs:** Efficient search, quick add-to-favorites, seamless shopping list generation.

### 3. Student Sam
- **Age:** 20
- **Tech-savvy:** Moderate
- **Goals:** Cook simple meals on a budget using leftover ingredients.
- **Frustrations:** Complicated apps, too many choices, missing ingredients.
- **Needs:** Intuitive ingredient entry, clear indicators of missing ingredients, simple shopping list export.

---

## User Journey Maps

### Journey 1: Find a Recipe with Available Ingredients
1. **Open App** → Home screen with ingredient search prompt.
2. **Input Ingredients** → Search bar with type-ahead suggestions and option to scan barcodes or select from common items.
3. **View Recipe Suggestions** → List of recipes, sorted by best match (most ingredients available).
4. **Select Recipe** → View recipe details, see which ingredients are missing.
5. **Add to Favorites** → Save recipe for future use.

### Journey 2: Generate Shopping List for a Recipe
1. **Select Recipe** → Recipe details page.
2. **View Missing Ingredients** → Clearly displayed, with checkboxes.
3. **Generate Shopping List** → One-tap to add all missing items to a shopping list.
4. **Save/Share Shopping List** → Ability to view, check off, or share the list.

### Journey 3: Manage Favorites
1. **View Favorites** → Access via bottom navigation.
2. **Browse Saved Recipes** → Grid/list view of favorites.
3. **Select Favorite Recipe** → See ingredients, steps, and generate shopping list if needed.

---

## Information Architecture

- **Home**
  - Ingredient Search
  - Recent Searches
  - Suggested Ingredients
- **Recipes**
  - Recipe List (search results)
  - Recipe Detail
    - Ingredients (available/missing)
    - Steps
    - Save to Favorites
    - Generate Shopping List
- **Favorites**
  - List of Saved Recipes
  - Quick access to recipe details
- **Shopping List**
  - Auto-generated from missing ingredients
  - Manual edit/add/remove items
  - Export/share option
- **Profile/Settings**
  - Manage account
  - Preferences (dietary, allergens, etc.)

---

## Wireframe Descriptions

### 1. Home / Ingredient Search Screen
- **Ingredient Input Field:** Prominent, with placeholder text (e.g., "What ingredients do you have?").
- **Add Ingredient Button:** Plus icon, supports manual entry, voice, and barcode scan.
- **Suggested Ingredients:** Quick-select chips for common items.
- **Recent Searches:** Below ingredient field for quick re-entry.

### 2. Recipe Results Screen
- **Recipe Cards:** Image, title, match percentage (e.g., "You have 7/8 ingredients"), and quick save button.
- **Filter/Sort Options:** By match quality, prep time, dietary preference.

### 3. Recipe Detail Screen
- **Recipe Image and Title**
- **Ingredients List:** Two sections – "You Have" (checked), "You Need" (unchecked, with ‘Add to Shopping List’).
- **Steps:** Clear, numbered.
- **Save to Favorites:** Heart icon.
- **Generate Shopping List:** Prominent button if ingredients are missing.

### 4. Favorites Screen
- **Grid/List of Recipes:** Thumbnail, title, quick access to details.

### 5. Shopping List Screen
- **List of Items:** Checkboxes, grouped by category (produce, dairy, etc.).
- **Edit Options:** Add/remove items, clear all.
- **Share/Export:** Button to send via SMS, email, or other apps.

---

## Prototype Plan

- **Clickable Prototype Tools:** Figma, Adobe XD, or InVision.
- **Flow to Include:**
  - Ingredient entry (manual, voice, barcode) on Home.
  - Transition to Recipe Results after ingredient selection.
  - Tapping a recipe card opens Recipe Detail, displaying available and missing ingredients.
  - Generate and view Shopping List from missing ingredients.
  - Save recipes to and access from Favorites.
  - Edit and share Shopping List.
