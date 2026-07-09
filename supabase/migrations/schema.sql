-- Create table for storing user onboardings
CREATE TABLE IF NOT EXISTS onboardings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  career TEXT NOT NULL,
  current_position TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE onboardings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous public users to submit onboarding data
CREATE POLICY "Allow public insert to onboardings" 
ON onboardings 
FOR INSERT 
WITH CHECK (true);
