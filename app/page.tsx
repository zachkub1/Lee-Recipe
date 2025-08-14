'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { supabase, Recipe, RecipeCategory } from '@/lib/supabase'
import CategoryCard from '@/components/CategoryCard'
import RecipeCard from '@/components/RecipeCard'
import AddRecipeForm from '@/components/AddRecipeForm'
import RecipeDetail from '@/components/RecipeDetail'

// Sample data for demonstration (replace with actual Supabase data)
const sampleCategories: RecipeCategory[] = [
  { id: '1', name: 'Cookies', description: 'Sweet and delicious cookies', icon: '🍪' },
  { id: '2', name: 'Brownies', description: 'Rich and fudgy brownies', icon: '🍫' },
  { id: '3', name: 'Cakes', description: 'Beautiful and tasty cakes', icon: '🎂' },
  { id: '4', name: 'Pies', description: 'Classic homemade pies', icon: '🥧' },
  { id: '5', name: 'Breads', description: 'Fresh baked breads', icon: '🍞' },
  { id: '6', name: 'Pastries', description: 'Delicate pastries', icon: '🥐' },
]

const sampleRecipes: Recipe[] = [
]

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes)
  const [categories] = useState<RecipeCategory[]>(sampleCategories)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(sampleRecipes)

  useEffect(() => {
    let filtered = recipes

    if (selectedCategory) {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredRecipes(filtered)
  }, [recipes, selectedCategory, searchQuery])

  const handleAddRecipe = (recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setRecipes(prev => [newRecipe, ...prev])
  }

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName)
  }

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleBackToHome = () => {
    setSelectedRecipe(null)
  }

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-pink-800">
                🍰 Lee Recipe Book
              </h1>
              <p className="text-pink-600 mt-1">
                Your personal collection of delicious baking recipes
              </p>
            </div>
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Recipe
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-pink-700 border border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-pink-800 mb-6">
            Recipe Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {
              const recipeCount = recipes.filter(recipe => recipe.category === category.name).length
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  recipeCount={recipeCount}
                  onClick={() => handleCategoryClick(category.name)}
                />
              )
            })}
          </div>
        </div>

        {/* Recipes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-pink-800">
              {selectedCategory ? `${selectedCategory} Recipes` : 'All Recipes'}
            </h2>
            <span className="text-pink-600">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </span>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍪</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">
                No recipes found
              </h3>
              <p className="text-pink-600 mb-6">
                {searchQuery || selectedCategory 
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first recipe!'
                }
              </p>
              {!searchQuery && !selectedCategory && (
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Add Your First Recipe
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddRecipeForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddRecipe}
      />
    </div>
  )
}
