# UX Design Document

## User Personas

### 1. Home Cook Helen
- **Age:** 35  
- **Tech Savvy:** Moderate  
- **Goals:** Quickly find recipes using what’s already in her kitchen; minimize food waste.  
- **Frustrations:** Complicated input processes, irrelevant recipe results, forgetting missing ingredients.

### 2. Student Sam
- **Age:** 22  
- **Tech Savvy:** High  
- **Goals:** Find easy recipes based on a limited set of ingredients; save money.  
- **Frustrations:** Long prep/cook times, not knowing what to buy, cluttered interfaces.

### 3. Busy Parent Priya
- **Age:** 40  
- **Tech Savvy:** Moderate  
- **Goals:** Quickly source family-friendly recipes and generate shopping lists for weekly planning.  
- **Frustrations:** Time-consuming search, repetitive manual list creation, hard-to-navigate apps.

---

## User Journey Maps

### Journey 1: Finding Recipes With Available Ingredients
1. **Opens app.**
2. **Enters or selects ingredients on hand** (via text, voice, or selecting from a list).
3. **Views list of matching recipes.**
4. **Explores recipe details** (instructions, prep time, nutritional info).
5. **Saves a favorite recipe** for future use.

### Journey 2: Generating a Shopping List
1. **Enters available ingredients.**
2. **Selects a desired recipe.**
3. **App highlights missing ingredients.**
4. **Adds missing items to shopping list** (option to select/deselect).
5. **Accesses shopping list in-store or shares it.**

### Journey 3: Managing Favorites
1. **Browses or searches recipes.**
2. **Saves recipes to favorites.**
3. **Views and organizes favorites** (sort by cuisine, prep time, etc.).
4. **Easily accesses favorite recipes for later use.**

---

## Information Architecture

```
- Home
    - Ingredient Input
    - Recent Searches
- Recipe Results
    - Filters (Cuisine, Prep Time, Diet, etc.)
    - Recipe Detail
        - Ingredients List (with missing items highlighted)
        - Instructions
        - Save to Favorites
        - Add Missing to Shopping List
- Favorites
    - Saved Recipes
    - Organization/Tags
- Shopping List
    - Auto-generated from missing ingredients
    - Manual add/remove items
    - Share/Export options
- Settings/Profile
    - Dietary Preferences
    - App Settings
```

---

## Wireframe Descriptions

### 1. Home / Ingredient Input
- **Input bar** for typing ingredients (with autocomplete and suggestions).
- **Voice input option** for hands-free entry.
- **Ingredient picker** (popular/common ingredients quick-select grid).
- **Recent ingredient combos** for fast recall.

### 2. Recipe Results
- **Recipe cards** showing image, title, match percentage (based on available ingredients), prep/cook time, and dietary tags.
- **Filters bar** at the top (cuisine, time, dietary needs).
- **Sort options** (most matched, quickest, newest).

### 3. Recipe Detail
- **Ingredients list** (available vs. missing clearly distinguished).
- **Instructions section** (step-by-step, optionally with images).
- **Save to Favorites button.**
- **Add missing ingredients to shopping list** (checkboxes for selection).
- **Nutritional info** (optional, expandable).

### 4. Favorites
- **List/grid of saved recipes** with option to sort/filter.
- **Edit and organize** by custom tags.

### 5. Shopping List
- **Auto-populated list** based on selected recipes.
- **Editable items** (add/remove, mark as bought).
- **Share/export** (text, email, messaging apps).

---

## Prototype Plan

1. **Ingredient Input:**  
   - Interactive field with autocomplete, multi-select, and voice input.
   - Ingredient chips appear as user adds them.

2. **Recipe Search & Results:**  
   - Real-time update of recipe cards as ingredients are added/removed.
   - Tapping a recipe card opens detail view.

3. **Recipe Detail & Favorites:**  
   - Ingredients section highlights missing items.
   - “Save to Favorites” button toggles state.
   - Button to add missing ingredients to shopping list.

4. **Shopping List:**  
   - Automatically lists missing ingredients per recipe or combined from multiple recipes.
   - User can check off or remove items.
   - Option to export/share list.

5. **Favorites Management:**  
   - View saved recipes, filter, and organize with tags.
   - Remove from favorites with swipe or button.

**Prototype Tools:** Figma, Adobe