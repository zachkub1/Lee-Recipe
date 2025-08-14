# 🚀 Quick Setup Guide

## 1. Environment Variables Setup

Create a `.env.local` file in your project root:

```bash
# Create the file
touch .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for project to be ready
4. Go to **Settings** → **API**
5. Copy the **Project URL** and **anon public** key
6. Paste them in your `.env.local` file

## 3. Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL in the editor
4. This will create your recipes table with sample data

## 4. Run the App

```bash
# Install dependencies (if you haven't already)
npm install

# Start development server
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 5. Test the App

- ✅ Browse sample recipes
- ✅ Click on recipe cards to see details
- ✅ Filter by category
- ✅ Search for recipes
- ✅ Add new recipes using the "Add Recipe" button

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Environment variables not working
- Make sure `.env.local` is in the project root
- Restart your dev server after adding env vars
- Check that the variable names start with `NEXT_PUBLIC_`

### Database connection issues
- Verify your Supabase URL and key are correct
- Check that your Supabase project is active
- Ensure the database schema was created successfully

### Styling issues
- Make sure Tailwind CSS is properly installed
- Check that `globals.css` is imported in your layout

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Need help?** Check the main README.md for more detailed information! 