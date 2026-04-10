-- Initial migration for fashion store
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image TEXT,
  category TEXT NOT NULL DEFAULT 'misc',
  featured INTEGER DEFAULT 0
);

CREATE TABLE site_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- Insert some sample data
INSERT INTO products (name, description, price, image, category, featured) VALUES
('Stylish T-Shirt', 'Comfortable cotton t-shirt with modern design', 2500, 'https://via.placeholder.com/300x300?text=T-Shirt', 'clothes', 1),
('Designer Jeans', 'Premium denim jeans with perfect fit', 8500, 'https://via.placeholder.com/300x300?text=Jeans', 'clothes', 1),
('Leather Jacket', 'Classic leather jacket for any occasion', 15000, 'https://via.placeholder.com/300x300?text=Jacket', 'clothes', 0),
('Sneakers', 'Comfortable sneakers for everyday wear', 6500, 'https://via.placeholder.com/300x300?text=Sneakers', 'shoes', 1),
('Backpack', 'Stylish backpack for work or travel', 4200, 'https://via.placeholder.com/300x300?text=Backpack', 'accessories', 0);

INSERT INTO site_content (key, value) VALUES
('hero_title', 'Welcome to FashionBrand'),
('hero_subtitle', 'Discover the latest trends and express your unique style'),
('about_text', 'FashionBrand - your source of stylish clothing and accessories');