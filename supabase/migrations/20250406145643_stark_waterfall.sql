/*
  # Create missions, ratings, and documents tables

  1. New Types
    - experience_level_type: enum for job experience levels
    - job_status_type: enum for job statuses
    - promotion_status_type: enum for promotion statuses
    - advantage_type: enum for job advantages
    - rating_type: enum for rating types
    - price_status_type: enum for price status
    - document_status_type: enum for document statuses

  2. New Tables
    - missions: Stores job listings and their details
    - ratings: Stores user and system ratings
    - documents: Stores user documents

  3. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create custom types
CREATE TYPE experience_level_type AS ENUM ('starter', 'qualified', 'expert');
CREATE TYPE mission_status_type AS ENUM ('in_review', 'online', 'rejected', 'completed', 'removed');
CREATE TYPE promotion_status_type AS ENUM ('in_review', 'online', 'expired', 'paused', 'canceled', 'rejected');
CREATE TYPE advantage_type AS ENUM ('transport', 'meal', 'accommodation', 'performance_bonus', 'other');
CREATE TYPE rating_type AS ENUM ('user', 'system');
CREATE TYPE price_status_type AS ENUM ('current', 'not_current');
CREATE TYPE document_status_type AS ENUM ('online', 'offline', 'removed', 'draft');

-- Create missions table
CREATE TABLE IF NOT EXISTS missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mission_images text[] DEFAULT '{}',
  needed_actor user_role NOT NULL,
  needed_actor_amount text NOT NULL,
  mission_title text NOT NULL,
  mission_description text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  required_experience_level experience_level_type NOT NULL,
  equipment boolean DEFAULT false,
  proposed_advantages advantage_type[] DEFAULT '{}',
  original_price jsonb NOT NULL DEFAULT '{"price": "0", "status": "current"}'::jsonb,
  adjustment_price jsonb NOT NULL DEFAULT '{"price": "0", "status": "not_current"}'::jsonb,
  final_price text NOT NULL,
  status mission_status_type NOT NULL DEFAULT 'in_review',
  is_promoted jsonb NOT NULL DEFAULT '{"status": "in_review", "amount": "0", "duration": "0", "start_date": null, "end_date": null}'::jsonb,
  applicants uuid[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Add constraints
  CONSTRAINT chk_dates CHECK (end_date >= start_date),
  CONSTRAINT chk_original_price CHECK (
    (original_price->>'price')::numeric >= 0 AND
    original_price->>'status' IN ('current', 'not_current')
  ),
  CONSTRAINT chk_adjustment_price CHECK (
    (adjustment_price->>'price')::numeric >= 0 AND
    adjustment_price->>'status' IN ('current', 'not_current')
  ),
  CONSTRAINT chk_is_promoted CHECK (
    is_promoted->>'status' IN ('in_review', 'online', 'expired', 'paused', 'canceled', 'rejected') AND
    (is_promoted->>'amount')::numeric >= 0 AND
    (is_promoted->>'duration')::numeric >= 0
  )
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating_type rating_type NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  rated_user uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Add constraint to ensure rated_user is set for user ratings
  CONSTRAINT chk_rated_user CHECK (
    (rating_type = 'system' AND rated_user IS NULL) OR
    (rating_type = 'user' AND rated_user IS NOT NULL)
  )
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  images text[] DEFAULT '{}',
  title text NOT NULL,
  description text NOT NULL,
  reading_time integer NOT NULL CHECK (reading_time > 0),
  theme text NOT NULL,
  tags text[] DEFAULT '{}',
  status document_status_type NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Add constraints
  CONSTRAINT chk_tags_array CHECK (array_length(tags, 1) <= 10) -- Limit tags to 10
);

-- Enable RLS
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- missions policies
CREATE POLICY "Users can read all missions"
  ON missions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create missions"
  ON missions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own missions"
  ON missions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own missions"
  ON missions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Ratings policies
CREATE POLICY "Users can read all ratings"
  ON ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Documents policies
-- Policy: Users can read all documents with status 'online'
CREATE POLICY "Users can read online documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (status = 'online');

-- Policy: Users can create their own documents
CREATE POLICY "Users can create documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own documents
CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own documents
CREATE POLICY "Users can delete own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_missions_user_id ON missions(user_id);
CREATE INDEX idx_missions_needed_actor ON missions(needed_actor);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_missions_start_date ON missions(start_date);
CREATE INDEX idx_missions_end_date ON missions(end_date);
CREATE INDEX idx_missions_location ON missions USING gin (to_tsvector('french', location));
CREATE INDEX idx_missions_mission_title ON missions USING gin (to_tsvector('french', mission_title));

CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_rated_user ON ratings(rated_user);
CREATE INDEX idx_ratings_rating_type ON ratings(rating_type);
CREATE INDEX idx_ratings_rating ON ratings(rating);

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_theme ON documents USING gin (to_tsvector('french', theme));
CREATE INDEX idx_documents_title ON documents USING gin (to_tsvector('french', title));
CREATE INDEX idx_documents_tags ON documents USING gin (tags);

-- Add triggers for updated_at
CREATE TRIGGER update_missions_updated_at
  BEFORE UPDATE ON missions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at
  BEFORE UPDATE ON ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();