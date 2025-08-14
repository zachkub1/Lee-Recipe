-- Recipe Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Create the recipes table
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time INTEGER NOT NULL CHECK (prep_time >= 0),
  cook_time INTEGER NOT NULL CHECK (cook_time >= 0),
  servings INTEGER NOT NULL CHECK (servings > 0),
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on category for faster filtering
CREATE INDEX idx_recipes_category ON recipes(category);

-- Create an index on title for faster searching
CREATE INDEX idx_recipes_title ON recipes USING gin(to_tsvector('english', title));

-- Create an index on description for faster searching
CREATE INDEX idx_recipes_description ON recipes USING gin(to_tsvector('english', description));

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_recipes_updated_at 
    BEFORE UPDATE ON recipes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view recipes)
CREATE POLICY "Allow public read access" ON recipes FOR SELECT USING (true);

-- Create policy for authenticated users to insert (you can modify this based on your needs)
CREATE POLICY "Allow authenticated insert" ON recipes FOR INSERT WITH CHECK (true);

-- Create policy for authenticated users to update their own recipes (optional)
CREATE POLICY "Allow authenticated update" ON recipes FOR UPDATE USING (true);

-- Create policy for authenticated users to delete their own recipes (optional)
CREATE POLICY "Allow authenticated delete" ON recipes FOR DELETE USING (true);

-- Insert some sample data
INSERT INTO recipes (title, category, description, ingredients, instructions, prep_time, cook_time, servings, difficulty) VALUES
(
  'Chocolate Chip Cookies',
  'Cookies',
  'Classic chocolate chip cookies with a soft center and crispy edges',
  ARRAY[
    '2 1/4 cups all-purpose flour',
    '1 tsp baking soda',
    '1 tsp salt',
    '1 cup butter, softened',
    '3/4 cup granulated sugar',
    '3/4 cup packed brown sugar',
    '2 large eggs',
    '2 tsp vanilla extract',
    '2 cups chocolate chips'
  ],
  ARRAY[
    'Preheat oven to 375°F (190°C)',
    'In a small bowl, mix flour, baking soda, and salt',
    'In a large bowl, cream butter and both sugars until light and fluffy',
    'Beat in eggs one at a time, then stir in vanilla',
    'Gradually blend in the flour mixture',
    'Stir in chocolate chips',
    'Drop rounded tablespoons onto ungreased baking sheets',
    'Bake for 9-11 minutes or until golden brown',
    'Cool on baking sheets for 2 minutes, then transfer to wire racks'
  ],
  15,
  10,
  24,
  'Easy'
),
(
  'Fudgy Brownies',
  'Brownies',
  'Rich and chocolatey brownies with a fudgy texture',
  ARRAY[
    '1/2 cup unsalted butter',
    '1 cup granulated sugar',
    '2 large eggs',
    '1/3 cup unsweetened cocoa powder',
    '1/2 cup all-purpose flour',
    '1/4 tsp salt',
    '1/4 tsp baking powder',
    '1/2 cup chocolate chips (optional)'
  ],
  ARRAY[
    'Preheat oven to 350°F (175°C)',
    'Grease an 8x8 inch baking pan',
    'Melt butter in a medium saucepan over low heat',
    'Remove from heat and stir in sugar until well combined',
    'Beat in eggs one at a time',
    'Stir in cocoa powder until smooth',
    'Add flour, salt, and baking powder, mix until just combined',
    'Fold in chocolate chips if using',
    'Pour into prepared pan and bake for 20-25 minutes',
    'Cool completely before cutting'
  ],
  10,
  25,
  16,
  'Easy'
),
(
  'Vanilla Cupcakes',
  'Cakes',
  'Light and fluffy vanilla cupcakes with a tender crumb',
  ARRAY[
    '1 1/2 cups all-purpose flour',
    '1 1/2 tsp baking powder',
    '1/4 tsp salt',
    '1/2 cup unsalted butter, softened',
    '1 cup granulated sugar',
    '2 large eggs',
    '1 tsp vanilla extract',
    '1/2 cup whole milk'
  ],
  ARRAY[
    'Preheat oven to 350°F (175°C)',
    'Line a 12-cup muffin tin with paper liners',
    'In a medium bowl, whisk flour, baking powder, and salt',
    'In a large bowl, cream butter and sugar until light and fluffy',
    'Beat in eggs one at a time, then stir in vanilla',
    'Alternately add flour mixture and milk, beginning and ending with flour',
    'Fill muffin cups 2/3 full with batter',
    'Bake for 18-20 minutes or until a toothpick comes out clean',
    'Cool in pan for 5 minutes, then transfer to wire racks'
  ],
  20,
  20,
  12,
  'Medium'
);

-- Create a view for recipe statistics
CREATE VIEW recipe_stats AS
SELECT 
  category,
  COUNT(*) as recipe_count,
  AVG(prep_time + cook_time) as avg_total_time,
  AVG(servings) as avg_servings
FROM recipes 
GROUP BY category
ORDER BY recipe_count DESC;

-- Grant necessary permissions
GRANT ALL ON recipes TO authenticated;
GRANT SELECT ON recipes TO anon;
GRANT SELECT ON recipe_stats TO anon; 