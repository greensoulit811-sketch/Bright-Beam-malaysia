-- Migration: Transition from Footwear to Tech and Add Dedicated Brands Table

-- 1. Create Dedicated Brands Table
CREATE TABLE IF NOT EXISTS public.brands (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  image_url text NOT NULL,
  link_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Brands
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Brands Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brands' AND policyname = 'Public brands are viewable by everyone') THEN
        CREATE POLICY "Public brands are viewable by everyone" ON public.brands FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brands' AND policyname = 'Admins can manage brands') THEN
        CREATE POLICY "Admins can manage brands" ON public.brands FOR ALL USING (
          EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
          )
        );
    END IF;
END $$;

-- 2. Modify Products Table for Tech specifications
-- Change sizes from number[] to text[] to support "15.6 inch", "14 inch", etc.
ALTER TABLE public.products ALTER COLUMN sizes TYPE text[] USING sizes::text[];

-- 3. Clear legacy footwear data (Optional but recommended for fresh start)
-- TRUNCATE public.products CASCADE;
-- TRUNCATE public.categories CASCADE;

-- 4. Initial Tech Categories for Bright Beam Malaysia
INSERT INTO public.categories (name, slug, description, is_active, sort_order)
VALUES 
('Laptops', 'laptops', 'High-performance laptops for all needs', true, 1),
('DIY PC Packages', 'diy-pc-packages', 'Custom built PC packages', true, 2),
('Components', 'components', 'Individual PC components', true, 3),
('Peripherals', 'peripherals', 'Mice, keyboards, and other accessories', true, 4),
('Monitors', 'monitors', 'High-resolution gaming and professional monitors', true, 5)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 5. Sub-categories for Laptops
INSERT INTO public.categories (name, slug, description, parent_id, is_active, sort_order)
SELECT 'Gaming Laptops', 'gaming-laptops', 'Laptops designed for high-end gaming', id, true, 1
FROM public.categories WHERE slug = 'laptops'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, parent_id, is_active, sort_order)
SELECT 'Business Laptops', 'business-laptops', 'Reliable laptops for professional use', id, true, 2
FROM public.categories WHERE slug = 'laptops'
ON CONFLICT (slug) DO NOTHING;

-- 6. Sub-categories for DIY PC Packages
INSERT INTO public.categories (name, slug, description, parent_id, is_active, sort_order)
SELECT 'Gaming PC Packages', 'gaming-pc-packages', 'Pre-configured gaming rigs', id, true, 1
FROM public.categories WHERE slug = 'diy-pc-packages'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.categories (name, slug, description, parent_id, is_active, sort_order)
SELECT 'Workstation PC Packages', 'workstation-pc-packages', 'Powerful workstations for creative pros', id, true, 2
FROM public.categories WHERE slug = 'diy-pc-packages'
ON CONFLICT (slug) DO NOTHING;
