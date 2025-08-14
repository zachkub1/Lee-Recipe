import { RecipeCategory } from '@/lib/supabase'

interface CategoryCardProps {
  category: RecipeCategory
  onClick: () => void
  recipeCount: number
}

export default function CategoryCard({ category, onClick, recipeCount }: CategoryCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-pink-200 overflow-hidden group"
    >
      <div className="p-6 text-center">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        
        <h3 className="text-xl font-bold text-pink-800 mb-2 group-hover:text-pink-600 transition-colors">
          {category.name}
        </h3>
        
        <p className="text-pink-600 text-sm mb-4">
          {category.description}
        </p>
        
        <div className="text-sm text-pink-500 font-medium">
          {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'}
        </div>
      </div>
    </div>
  )
} 