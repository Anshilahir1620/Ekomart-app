
create Database Ekomart

use Ekomart
SHOW TABLES;
SET FOREIGN_KEY_CHECKS = 0;

-- ========================
-- ROLES
-- ========================
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;








INSERT INTO roles (id, role_name) VALUES
(1,'Admin');

-- ========================
-- CATEGORIES
-- ========================
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO categories (name, slug, status, created_at) VALUES
( 'Medical Healthcare', 'medical-healthcare', 1, '2025-12-01 12:07:19'),
( 'Chips & Snacks', 'chips-snacks', 1, '2025-12-01 12:07:19'),
( 'Breads & Bakery', 'breads-bakery', 1, '2025-12-01 12:07:19'),
( 'Meats & Seafood', 'meats-seafood', 1, '2025-12-01 12:07:19'),
( 'Breakfast & Dairy', 'breakfast-dairy', 1, '2025-12-01 12:07:19'),
( 'Biscuits & Snacks', 'biscuits-snacks', 1, '2025-12-02 11:18:56'),
('Frozen Foods', 'frozen-foods', 1, '2025-12-02 11:19:10'),
( 'Grocery & Staples', 'grocery-staples', 1, '2025-12-02 11:19:20');

select * from categories


-- ========================
-- SUBCATEGORIES
-- ========================
CREATE TABLE subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_subcat_per_cat (category_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

select * from subcategories

INSERT INTO subcategories (category_id, name, slug, status, created_at) VALUES

-- Biscuits & Snacks (7)
(6, 'Cookies', 'biscuits-snacks-cookies', 1, '2025-12-01 12:17:52'),
(6, 'Cream Biscuits', 'biscuits-snacks-cream-biscuits', 1, '2025-12-01 12:17:52'),
(6, 'Healthy Biscuits', 'biscuits-snacks-healthy-biscuits', 1, '2025-12-02 11:30:22'),
(6, 'Salted Biscuits', 'biscuits-snacks-salted-biscuits', 1, '2025-12-02 11:30:35'),
(6, 'Chocolates', 'biscuits-snacks-chocolates', 1, '2025-12-02 11:30:48'),

-- Frozen Foods (8)
(7, 'Ice Creams & Desserts', 'frozen-foods-ice-creams-and-desserts', 1, '2025-12-01 12:17:52'),
(7, 'Frozen Parathas', 'frozen-foods-frozen-parathas', 1, '2025-12-01 12:17:52'),
(7, 'Frozen Snacks', 'frozen-foods-frozen-snacks', 1, '2025-12-01 12:17:52'),
(7, 'Frozen Fruits', 'frozen-foods-frozen-fruits', 1, '2025-12-01 12:17:52'),
(7, 'Frozen Vegetables', 'frozen-foods-frozen-vegetables', 1, '2025-12-01 12:17:52'),

-- Grocery & Staples (9)
(8, 'Dry Fruits & Nuts', 'grocery-staples-dry-fruits-and-nuts', 1, '2025-12-01 12:17:52'),
(8, 'Salt, Sugar & Jaggery', 'grocery-staples-salt-sugar-and-jaggery', 1, '2025-12-01 12:17:52'),
(8, 'Masala & Spices', 'grocery-staples-masala-and-spices', 1, '2025-12-01 12:17:52'),
(8, 'Ghee & Vanaspati', 'grocery-staples-ghee-and-vanaspati', 1, '2025-12-01 12:17:52'),
(8, 'Edible Oils', 'grocery-staples-edible-oils', 1, '2025-12-01 12:17:52'),
(8, 'Pulses (Dal)', 'grocery-staples-pulses-dal', 1, '2025-12-01 12:17:52'),
(8, 'Rice & Rice Products', 'grocery-staples-rice-and-rice-products', 1, '2025-12-01 12:17:52'),
(8, 'Atta, Flour & Sooji', 'grocery-staples-atta-flour-and-sooji', 1, '2025-12-01 12:17:52'),

-- Breakfast & Dairy (6)
(5, 'Milk', 'breakfast-dairy-milk', 1, '2025-12-02 11:32:20'),
(5, 'Curd & Yogurt', 'breakfast-dairy-curd-and-yogurt', 1, '2025-12-02 11:32:46'),
(5, 'Paneer', 'breakfast-dairy-paneer', 1, '2025-12-02 11:32:55'),
(5, 'Butter & Cheese', 'breakfast-dairy-butter-and-cheese', 1, '2025-12-02 11:33:08'),
(5, 'Ghee', 'breakfast-dairy-ghee', 1, '2025-12-02 11:33:23'),
(5, 'Bread & Buns', 'breakfast-dairy-bread-and-buns', 1, '2025-12-02 11:33:42'),
(5, 'Eggs', 'breakfast-dairy-eggs', 1, '2025-12-02 11:33:51'),

-- Meats & Seafood (5)
(4, 'Fresh Chicken', 'meats-seafood-fresh-chicken', 1, '2025-12-02 11:34:36'),
(4, 'Fresh Mutton', 'meats-seafood-fresh-mutton', 1, '2025-12-02 11:34:50'),
(4, 'Fresh Fish', 'meats-seafood-fresh-fish', 1, '2025-12-02 11:35:05'),

-- Breads & Bakery (4)
(3, 'Breads', 'breads-bakery-breads', 1, '2025-12-02 11:35:24'),
(3, 'Buns & Pav', 'breads-bakery-buns-and-pav', 1, '2025-12-02 11:35:35'),
(3, 'Cakes', 'breads-bakery-cakes', 1, '2025-12-02 11:35:45'),

-- Chips & Snacks (3)
(2, 'Potato Chips', 'chips-snacks-potato-chips', 1, '2025-12-02 11:36:09'),
(2, 'Corn Snacks', 'chips-snacks-corn-snacks', 1, '2025-12-02 11:36:18'),
(2, 'Nachos', 'chips-snacks-nachos', 1, '2025-12-02 11:36:28'),
(2, 'Popcorn', 'chips-snacks-popcorn', 1, '2025-12-02 11:36:37'),
(2, 'Namkeen', 'chips-snacks-namkeen', 1, '2025-12-02 11:36:47'),

-- Medical Healthcare (2)
(1, 'Medicines', 'medical-healthcare-medicines', 1, '2025-12-02 11:37:05'),
(1, 'Vitamins & Supplements', 'medical-healthcare-vitamins-and-supplements', 1, '2025-12-02 11:37:19'),
(1, 'Pain Relief', 'medical-healthcare-pain-relief', 1, '2025-12-02 11:37:31'),
(1, 'Skin Care Medicines', 'medical-healthcare-skin-care-medicines', 1, '2025-12-02 11:37:46');






-- ========================
-- BRANDS
-- ========================
CREATE TABLE brands (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  logo VARCHAR(255),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO brands (name, logo, status, created_at, updated_at) VALUES
( 'Amul', '/uploads/brands/1764658966023-rt0fssbz7bf.jpg', 1, '2025-12-02 06:45:29', '2025-12-02 07:02:46'),
( 'Britannia', '/uploads/brands/1764659011218-56bsjx6c1oq.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:03:31'),
( 'Parle', '/uploads/brands/1764659577953-qlw56fcf4o.svg', 1, '2025-12-02 06:45:29', '2025-12-02 07:12:57'),
( 'Nestlé', '/uploads/brands/1764659554904-l1di8ak022o.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:12:34'),
( 'Hindustan Unilever', '/uploads/brands/1764659180451-lfla1uinu7.webp', 1, '2025-12-02 06:45:29', '2025-12-02 07:06:20'),
( 'Tata', '/uploads/brands/1764659757666-l81k3gcct3e.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:15:57'),
( 'Dabur', '/uploads/brands/1764659116583-gr2ssh89o9q.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:05:16'),
( 'Patanjali', '/uploads/brands/1764659599744-exf2hcb47p8.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:13:19'),
( 'Mondelez (Cadbury)', '/uploads/brands/1764659522805-4llt2tfdxvd.jpg', 1, '2025-12-02 06:45:29', '2025-12-02 07:12:02'),
( 'Coca-Cola', '/uploads/brands/1764659053534-q1f52ob00ie.jpg', 1, '2025-12-02 06:45:29', '2025-12-02 07:04:13'),
('Colgate', '/uploads/brands/1764659087033-yw85ts1ufp.svg', 1, '2025-12-02 06:45:29', '2025-12-02 07:04:47'),
( 'Godrej', '/uploads/brands/1764659149464-4r6u34zn9dc.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:05:49'),
( 'L\'Oréal', '/uploads/brands/1764659324505-uvzwi4w0ko.jpg', 1, '2025-12-02 06:45:29', '2025-12-02 07:08:44'),
( 'Mars', '/uploads/brands/1764659487448-34rqmrzx85l.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:11:27'),
( 'Frito Lay', '/uploads/brands/1764660310127-fg3fc6qf5gu.png', 1, '2025-12-02 07:25:10', '2025-12-02 07:25:10'),
( 'Nespresso', '/uploads/brands/1764660364729-yj64fmegtg.svg', 1, '2025-12-02 07:26:04', '2025-12-02 07:26:04'),
( 'Oreo', '/uploads/brands/1764660400004-8cnklpmvj0j.jpg', 1, '2025-12-02 07:26:40', '2025-12-02 07:26:40'),
( 'Balaji', '/uploads/brands/1764660452924-o3wrj0j8gcp.png', 1, '2025-12-02 07:27:32', '2025-12-02 07:27:32'),
( 'Aashirvaad', '/uploads/brands/1764660509218-ehfb4yb70ng.png', 1, '2025-12-02 07:28:15', '2025-12-02 07:28:29'),
( 'Fortune', '/uploads/brands/1764660544268-4acsr7m24yj.jpg', 1, '2025-12-02 07:29:04', '2025-12-02 07:29:04'),
( 'Tata Salt', '/uploads/brands/1764660586174-v0xlg39fpc8.webp', 1, '2025-12-02 07:29:46', '2025-12-02 07:29:46'),
( 'Saffola', '/uploads/brands/1764660626507-x413amxltrp.jpg', 1, '2025-12-02 07:30:26', '2025-12-02 07:30:26'),
( 'Haldiram’s', '/uploads/brands/1764660674117-uvpq0c1e03.svg', 1, '2025-12-02 07:31:14', '2025-12-02 07:31:14'),
( 'MDH', '/uploads/brands/1764660709785-ehoef474knu.png', 1, '2025-12-02 07:31:49', '2025-12-02 07:31:49'),
( 'Everest', '/uploads/brands/1764660742002-nerfpkmol5c.png', 1, '2025-12-02 07:32:22', '2025-12-02 07:32:22'),
( 'Badshah', '/uploads/brands/1764660772812-tbph66v68a.jpg', 1, '2025-12-02 07:32:52', '2025-12-02 07:32:52'),
('Kissan', '/uploads/brands/1764660800564-raeky86vq0o.avif', 1, '2025-12-02 07:33:20', '2025-12-02 07:33:20'),
('Himalaya', '/uploads/brands/1764675539472-mdusaemboc.jpg', 1, '2025-12-02 11:38:59', '2025-12-02 11:38:59'),
( 'Dr. Morepen', '/uploads/brands/1764675593623-zjg4g1644n.webp', 1, '2025-12-02 11:39:53', '2025-12-02 11:39:53'),
( 'Vicks', '/uploads/brands/1764675632275-7gz5u6wjrrt.png', 1, '2025-12-02 11:40:32', '2025-12-02 11:40:32');

select * from brands




-- ========================
-- BANNERS
-- ========================
CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




INSERT INTO banners ( image, title, subtitle) VALUES
( '/uploads/banners/1764597854524-ikjxhmwuqrc.png', 'Do not miss our amazing grocery deals', 'Get up to 30% off on your first $150 purchase'),
( '/uploads/banners/1764597828464-qumkw3n0l0o.jpg', 'Do not miss our amazing grocery deals', 'Get up to 30% off on your first $150 purchase');

select * from banners



-- ========================
-- USERS
-- ========================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT DEFAULT 2,
  mobile VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  address TEXT,
  profile_photo VARCHAR(255),
  status TINYINT DEFAULT 1
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


select * from users

INSERT INTO users ( email, password, role_id, mobile, city, state, pincode, address, profile_photo,status,name) VALUES
( 'anshil@example.com', '123456', 2, 9171607835, 'rajkot', 'Gujarat', 370110, NULL, NULL, 1,'anshil');


select * from users




-- ========================
-- PRODUCTS
-- ========================
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  regular_price DECIMAL(10,2),
  sale_price DECIMAL(10,2),
  size VARCHAR(50),
  weight DECIMAL(10,2),
  rating DECIMAL(3,2),
  life INT,
  type VARCHAR(100),
  brand VARCHAR(100),
  nutrition_energy_kcal DECIMAL(10,2),
  nutrition_protein_g DECIMAL(10,2),
  nutrition_magnetiam_kcal DECIMAL(10,2),
  nutrition_calory_kcal DECIMAL(10,2),
  nutrition_vitamine_kcal DECIMAL(10,2),
  stock INT DEFAULT 0,
  sku VARCHAR(100),
  category VARCHAR(100),
  subcategory_id INT,
  tag VARCHAR(255),
  description TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_products_subcategory_id (subcategory_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

select * from products


INSERT INTO products
(product_name, regular_price, sale_price, size, weight, rating, life, type, brand,nutrition_energy_kcal, nutrition_protein_g, nutrition_magnetiam_kcal,nutrition_calory_kcal,
 nutrition_vitamine_kcal, stock, sku, category,subcategory_id, tag, description, image, created_at, updated_at)
VALUES

('Aashirvaad Whole Wheat Atta', 320.00, 299.00, '5 KG', 5.00, 4.60, 180, 'Food Grain', 'Aashirvaad',364, 12, 45, 364, 0, 150, 'AT-AASH-5KG', 'Grocery & Staples',
 8, 'Atta', 'Premium whole wheat flour for soft and fluffy rotis.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Fortune Biryani Basmati Rice', 450.00, 389.00, '5 KG', 5.00, 4.50, 365, 'Grain', 'Fortune',350, 7, 8, 350, 0, 100, 'RC-FORT-5KG', 'Grocery & Staples',
 8, 'Rice', 'Long grain basmati rice ideal for biryani.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Tata Salt Iodized', 28.00, 26.00, '1 KG', 1.00, 4.70, 730, 'Grocery', 'Tata',0, 0, 1, 0, 0, 500, 'TT-SALT-1KG', 'Grocery & Staples',
 8, 'Salt', 'Iodized salt for daily use.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Saffola Gold Cooking Oil', 190.00, 179.00, '1 L', 1.00, 4.50, 365, 'Oil', 'Saffola',900, 0, 5, 900, 10, 300, 'SF-OIL-1L', 'Grocery & Staples',
 8, 'Oil', 'Blended edible oil for a healthy lifestyle.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Amul Pasteurized Butter', 260.00, 245.00, '500g', 0.50, 4.80, 120, 'Dairy', 'Amul',720, 1, 2, 720, 10, 80, 'AM-BUT-500', 'Breakfast & Dairy',
 5, 'Butter', 'Delicious and creamy yellow Amul butter.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Amul Taaza Toned Milk', 32.00, 30.00, '500ml', 0.50, 4.30, 3, 'Dairy', 'Amul',62, 3, 2, 62, 1, 120, 'AM-MILK-500', 'Breakfast & Dairy',
 5, 'Milk', 'Fresh toned milk for daily use.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Britannia Good Day Cashew Cookies', 40.00, 35.00, '200g', 0.20, 4.40, 240, 'Snack', 'Britannia',480, 6, 5, 480, 2, 200, 'BR-GD-200', 'Biscuits & Snacks',
 6, 'Cookies', 'Crunchy cashew cookies perfect for tea time.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Oreo Chocolate Cream Biscuits', 30.00, 28.00, '120g', 0.12, 4.60, 270, 'Snack', 'Oreo',480, 5, 4, 480, 1, 150, 'OR-CHO-120', 'Biscuits & Snacks',
 6, 'Cream Biscuits', 'Chocolate cream-filled crunchy sandwich cookies.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Haldiram''s Aloo Bhujia', 60.00, 55.00, '200g', 0.20, 4.70, 240, 'Snack', 'Haldiram’s',510, 7, 6, 510, 2, 180, 'HD-ALB-200', 'Chips & Snacks',
 2, 'Namkeen', 'Crispy aloo bhujia made with traditional spices.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Lays Classic Salted Chips', 20.00, 18.00, '52g', 0.05, 4.40, 180, 'Snack', 'Frito Lay',560, 6, 7, 560, 1, 300, 'LY-SLT-52', 'Chips & Snacks',
 2, 'Potato Chips', 'Crispy and salted classic potato chips.', '', '2025-12-02 13:38:10', '2025-12-02 13:38:10');







-- ========================
-- FOREIGN KEYS
-- ========================
ALTER TABLE subcategories
  ADD CONSTRAINT fk_subcategories_category
  FOREIGN KEY (category_id) REFERENCES categories(id)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE products
  ADD CONSTRAINT fk_products_subcategory
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
  ON DELETE SET NULL ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;





