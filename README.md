# 🍰 Baking Recipes App

A beautiful and modern recipe management app built with Next.js, TypeScript, and Tailwind CSS. Perfect for storing and organizing your favorite baking recipes!

## ✨ Features

- **Beautiful Recipe Cards** - Display recipes with images, difficulty levels, and key information
- **Category Organization** - Organize recipes by type (Cookies, Brownies, Cakes, Pies, etc.)
- **Search & Filter** - Find recipes quickly by title, description, or ingredients
- **Add New Recipes** - Comprehensive form for adding recipes with ingredients and instructions
- **Recipe Details** - Full recipe view with step-by-step instructions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Beautiful dark theme included

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lc-recipe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup (Supabase)

### Why Supabase over SQLite?

- **Better for web apps** - Real-time database with built-in authentication
- **Easier deployment** - No need to manage database files
- **Better scalability** - Can handle multiple users if needed later
- **Built-in features** - Row-level security, real-time subscriptions, etc.

### Setting up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > API to get your project URL and anon key
4. Add these to your `.env.local` file

### Database Schema

The app uses this table structure:

```sql
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER NOT NULL,
  cook_time INTEGER NOT NULL,
  servings INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON recipes FOR SELECT USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON recipes FOR INSERT WITH CHECK (true);
```

## 🎨 Customization

### Adding New Categories

Edit the `sampleCategories` array in `app/page.tsx`:

```typescript
const sampleCategories: RecipeCategory[] = [
  { id: '1', name: 'Cookies', description: 'Sweet and delicious cookies', icon: '🍪' },
  { id: '2', name: 'Brownies', description: 'Rich and fudgy brownies', icon: '🍫' },
  // Add your new category here
  { id: '7', name: 'Muffins', description: 'Delicious breakfast muffins', icon: '🧁' },
]
```

### Styling

The app uses Tailwind CSS for styling. You can customize colors, spacing, and other design elements by modifying the Tailwind classes throughout the components.

## 📱 Usage

1. **Browse Recipes**: View all recipes on the homepage
2. **Filter by Category**: Click on category cards to filter recipes
3. **Search**: Use the search bar to find specific recipes or ingredients
4. **Add Recipe**: Click "Add Recipe" to create a new recipe
5. **View Details**: Click on any recipe card to see full instructions
6. **Like & Share**: Use the like and share buttons on recipe detail pages

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)

## 📁 Project Structure

```
lc-recipe/
├── app/
│   ├── page.tsx          # Main homepage
│   ├── layout.tsx        # App layout
│   └── globals.css       # Global styles
├── components/
│   ├── RecipeCard.tsx    # Individual recipe card
│   ├── CategoryCard.tsx  # Recipe category card
│   ├── AddRecipeForm.tsx # Form for adding recipes
│   └── RecipeDetail.tsx  # Full recipe view
├── lib/
│   └── supabase.ts       # Supabase client & types
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🍪 Sample Recipes

The app comes with sample recipes to get you started:
- Chocolate Chip Cookies
- Fudgy Brownies

Add your own recipes using the "Add Recipe" button!

---

**Happy Baking! 🎂✨**
