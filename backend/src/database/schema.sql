-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP,
  account_status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'inactive', 'suspended'))
);

-- Templates Table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  preview_image_url VARCHAR(255),
  html_structure TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Press Kits Table
CREATE TABLE press_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  template_id UUID NOT NULL REFERENCES templates(id),
  is_published BOOLEAN NOT NULL DEFAULT false,
  primary_color VARCHAR(7) DEFAULT '#3f51b5',
  secondary_color VARCHAR(7) DEFAULT '#f50057',
  font_choice VARCHAR(100) DEFAULT 'Roboto',
  custom_css TEXT,
  meta_description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_published_at TIMESTAMP,
  view_count INTEGER NOT NULL DEFAULT 0
);

-- Sections Table
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  press_kit_id UUID NOT NULL REFERENCES press_kits(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('bio', 'music', 'videos', 'photos', 'tour', 'press', 'contact', 'custom')),
  title VARCHAR(255) NOT NULL,
  content JSONB,
  display_order INTEGER NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Assets Table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  press_kit_id UUID NOT NULL REFERENCES press_kits(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'audio', 'video', 'document')),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255),
  file_size INTEGER,
  mime_type VARCHAR(100),
  is_downloadable BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  press_kit_id UUID NOT NULL REFERENCES press_kits(id) ON DELETE CASCADE,
  platform VARCHAR(100) NOT NULL,
  url VARCHAR(255) NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Analytics Table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  press_kit_id UUID NOT NULL REFERENCES press_kits(id) ON DELETE CASCADE,
  event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('view', 'download', 'share')),
  asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(255),
  country VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Collaborator Access Table
CREATE TABLE collaborator_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  press_kit_id UUID NOT NULL REFERENCES press_kits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  access_level VARCHAR(20) NOT NULL CHECK (access_level IN ('view', 'edit', 'admin')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(press_kit_id, user_id)
);
