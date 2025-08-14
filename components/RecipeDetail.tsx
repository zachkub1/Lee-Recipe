'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, Clock, Users, TrendingUp, Heart, Share2 } from 'lucide-react'
import { Recipe } from '@/lib/supabase'

interface RecipeDetailProps {
  recipe: Recipe
  onBack: () => void
}

export default function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  const [isLiked, setIsLiked] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-pink-100 text-pink-800'
    }
  }

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this amazing ${recipe.title} recipe!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Recipe link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <span className="text-sm text-pink-500">
                  {recipe.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-pink-800 mb-4">
                {recipe.title}
              </h1>
              
              <p className="text-lg text-pink-600 mb-6">
                {recipe.description}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-pink-500" />
                  <span className="text-pink-700">
                    {recipe.prep_time + recipe.cook_time} min total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-500" />
                  <span className="text-pink-700">
                    {recipe.servings} servings
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
                <button
                  onClick={shareRecipe}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-full bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl overflow-hidden">
              {recipe.image_url ? (
                <Image
                  src={recipe.image_url}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-8xl">🍪</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6">
              Ingredients
            </h2>
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-pink-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6">
              Instructions
            </h2>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-pink-700 leading-relaxed">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-pink-800 mb-6">
            Recipe Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">
                {recipe.prep_time}
              </div>
              <div className="text-pink-600">Prep Time (min)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">
                {recipe.cook_time}
              </div>
              <div className="text-pink-600">Cook Time (min)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-500 mb-2">
                {recipe.servings}
              </div>
              <div className="text-pink-600">Servings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 