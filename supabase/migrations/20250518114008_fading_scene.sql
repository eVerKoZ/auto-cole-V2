/*
  # Initial schema setup

  1. Tables
    - users
    - lesson_slots
    - vehicles
    - packages
    
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('client', 'instructor', 'admin')),
  phone_number text,
  neph_code text,
  completed_hours integer DEFAULT 0,
  package_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  transmission text NOT NULL CHECK (transmission IN ('manual', 'automatic')),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lesson_slots table
CREATE TABLE lesson_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  instructor_id uuid REFERENCES users(id),
  vehicle_id uuid REFERENCES vehicles(id),
  is_booked boolean DEFAULT false,
  student_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create packages table
CREATE TABLE packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  hours integer NOT NULL,
  features text[],
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id OR role = 'admin');

-- Policies for vehicles table
CREATE POLICY "Anyone can view vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));

-- Policies for lesson_slots table
CREATE POLICY "Users can view available slots"
  ON lesson_slots
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Instructors can create slots"
  ON lesson_slots
  FOR INSERT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('instructor', 'admin')
  ));

CREATE POLICY "Users can book available slots"
  ON lesson_slots
  FOR UPDATE
  TO authenticated
  USING (
    (NOT is_booked AND auth.uid() IN (SELECT id FROM users WHERE role = 'client'))
    OR
    instructor_id = auth.uid()
    OR
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
  );

-- Policies for packages table
CREATE POLICY "Anyone can view packages"
  ON packages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify packages"
  ON packages
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  ));