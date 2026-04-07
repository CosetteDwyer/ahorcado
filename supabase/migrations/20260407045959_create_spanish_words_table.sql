/*
  # Create Spanish Words Table for Hangman Game

  1. New Tables
    - `spanish_words`
      - `id` (uuid, primary key) - Unique identifier for each word
      - `word` (text, not null) - The Spanish word to guess
      - `translation` (text, not null) - English translation for reference
      - `difficulty` (text) - Difficulty level (intermediate, advanced)
      - `created_at` (timestamptz) - Timestamp when word was added
  
  2. Security
    - Enable RLS on `spanish_words` table
    - Add policy for public read access (game needs to fetch words)
  
  3. Initial Data
    - Populate table with intermediate to advanced Spanish vocabulary
*/

CREATE TABLE IF NOT EXISTS spanish_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  translation text NOT NULL,
  difficulty text DEFAULT 'intermediate',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE spanish_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read spanish words"
  ON spanish_words
  FOR SELECT
  TO anon
  USING (true);

-- Insert initial vocabulary words
INSERT INTO spanish_words (word, translation, difficulty) VALUES
  ('siglo', 'century', 'intermediate'),
  ('madrugada', 'dawn/early morning', 'intermediate'),
  ('comedor', 'dining room', 'intermediate'),
  ('jardin', 'garden', 'intermediate'),
  ('tenedor', 'fork', 'intermediate'),
  ('aceite', 'oil', 'intermediate'),
  ('devuelve', 'returns/gives back', 'intermediate'),
  ('ferrocarril', 'railroad', 'advanced'),
  ('paraguas', 'umbrella', 'intermediate'),
  ('aguacate', 'avocado', 'intermediate'),
  ('desayuno', 'breakfast', 'intermediate'),
  ('almohada', 'pillow', 'intermediate'),
  ('biblioteca', 'library', 'intermediate'),
  ('ventana', 'window', 'intermediate'),
  ('escalera', 'stairs/ladder', 'intermediate'),
  ('mercado', 'market', 'intermediate'),
  ('esquina', 'corner', 'intermediate'),
  ('bolsillo', 'pocket', 'intermediate'),
  ('cigarra', 'cicada', 'advanced'),
  ('recuerdo', 'memory/souvenir', 'intermediate'),
  ('servilleta', 'napkin', 'intermediate'),
  ('rodilla', 'knee', 'intermediate'),
  ('corazon', 'heart', 'intermediate'),
  ('cumpleanos', 'birthday', 'intermediate'),
  ('desarrollo', 'development', 'advanced'),
  ('equilibrio', 'balance', 'advanced'),
  ('gobierno', 'government', 'intermediate'),
  ('herramienta', 'tool', 'intermediate'),
  ('inquilino', 'tenant', 'advanced'),
  ('joyeria', 'jewelry store', 'advanced');