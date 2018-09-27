# Reci

## An application to gather recipes, plan meals, track ingredient stock, and create grocery lists.

Reci has four primary purposes:

- A database of recipes, categorized by meal type (breakfast, lunch, snack, etc) and dietary restrictions (vegetarian, gluten-free, etc)
- A meal planner, where recipes can be assigned over a period of time
- An ingredient stock tracker, where users can create a store of the ingredients they currently have
- A grocery list planner, where ingredients can be added to a list, including whole recipes at a time

### Tech Stack

tl;dr node.js, mongodb, graphql, apollo, react

#### Backend

Reci will require a robust API that can serve multiple data types. Ingredients, recipes, plans, and lists are the four primary types, corresponding with the four purposes. There will be a user account system with authentication.

MongoDB will be the database used, hosted on mLab. The API will be created in GraphQL using graphql-yoga, a node.js implementation of GraphQL based on Apollo Server. The API will be hosted on Now to start and later can throw it up on DigitalOcean.

#### Frontend

React will be used to build the frontend, utilizing Apollo Client to interface with the GraphQL API. Unsure about state management, but apollo-link-state will probably be chosen. Do not want to have to use Redux or MobX or anything outside of the GraphQL ecosystem if possible.

## Now, in Detail

### Models

Start with the three below.

Recipes are made up of ingredients, ingredients contain (or not) nutrients.

#### Nutrient

- name: string
- image: string

#### Ingredient

- name: string
- image: string
- dietary: object
  -- vegan: boolean
  -- vegetarian: boolean
  -- gluten-free: boolean
- calories (per 100g/ml): number
- nutrients (per 100g/ml): array of nutrient objects [REL]

#### Recipe

- name: string
- category: string
- description: string
- ingredients: array of ingredient objects [REL]
- images: array of strings
- dietary: object
  -- vegan: boolean
  -- vegetarian: boolean
  -- gluten-free: boolean
