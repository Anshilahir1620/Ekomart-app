
create Database Ekomart

use Ekomart
SHOW TABLES;
SET FOREIGN_KEY_CHECKS = 0;

<<<<<<< HEAD
=======
select * from categories
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)
-- ========================
-- ROLES
-- ========================
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD





=======
select * from p



select* from users
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)


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
<<<<<<< HEAD

=======
select* from categories
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)
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
<<<<<<< HEAD

=======
select( from Banner
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)

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

<<<<<<< HEAD
select * from subcategories
=======
select * from subcategories;
select * from products
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)

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
<<<<<<< HEAD
(8, 'Atta, Flour & Sooji', 'grocery-staples-atta-flour-and-sooji', 1, '2025-12-01 12:17:52'),
=======
(8, 'Atta, Flour & Sooji', 'grocery-staples-atta-flour-and-sooji', 1, '2025-12-01 12:17:52'),	
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)

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
<<<<<<< HEAD
( 'Mars', '/uploads/brands/1764659487448-34rqmrzx85l.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:11:27'),
=======
( 'Mars', '/uploadproductss/brands/1764659487448-34rqmrzx85l.png', 1, '2025-12-02 06:45:29', '2025-12-02 07:11:27'),
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)
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


<<<<<<< HEAD


INSERT INTO banners ( image, title, subtitle) VALUES
( '/uploads/banners/1764597854524-ikjxhmwuqrc.png', 'Do not miss our amazing grocery deals', 'Get up to 30% off on your first $150 purchase'),
( '/uploads/banners/1764597828464-qumkw3n0l0o.jpg', 'Do not miss our amazing grocery deals', 'Get up to 30% off on your first $150 purchase');

select * from banners


=======
ALTER TABLE banners
ADD COLUMN badge VARCHAR(150) AFTER id,
ADD COLUMN title1 VARCHAR(100) NOT NULL AFTER badge,
ADD COLUMN highlight VARCHAR(100) AFTER title1,
ADD COLUMN title2 VARCHAR(100) AFTER highlight,
ADD COLUMN desc1 VARCHAR(255) AFTER title2,
ADD COLUMN desc2 VARCHAR(255) AFTER desc1,
ADD COLUMN alt VARCHAR(150) AFTER image;

ALTER TABLE banners
DROP COLUMN title,
DROP COLUMN subtitle;

DESCRIBE banners;
select * from banners

INSERT INTO banners
(badge, title1, highlight, title2, desc1, desc2, image, alt)
VALUES
(
  'Shop and get free delivery on your first order!',
  'We deliver fresh',
  'groceries',
  'to your doorstep.',
  'Get the freshest groceries delivered with care to your home.',
  'Save time, skip the lines, and enjoy quick delivery.',
  '/banners/banner1.jpg',
  'Fresh groceries delivered'
);
INSERT INTO banners
(badge, title1, highlight, title2, desc1, desc2, image, alt)
VALUES
(
  'Up to 30% off on seasonal produce',
  'Seasonal picks,',
  'big savings',
  'every week.',
  'Discover weekly deals on fruits and vegetables.',
  'Stock up and save more on essentials.',
  '/banners/banner2.jpg',
  'Seasonal produce deals'
);
INSERT INTO banners
(badge, title1, highlight, title2, desc1, desc2, image, alt)
VALUES
(
  'Members get free returns and faster delivery',
  'Join our',
  'membership',
  'for extra perks.',
  'Exclusive benefits for loyal shoppers.',
  'Enjoy faster delivery and special discounts.',
  '/banners/banner3.jpg',
  'Membership benefits'
);
select * from products

-- TRUNCATE TABLE banners;

select * from user


UPDATE banners SET image = '/banners/banner1.jpeg' WHERE id = 1;
UPDATE banners SET image = '/banners/banner2.jpeg' WHERE id = 2;
UPDATE banners SET image = '/banners/banner3.jpeg' WHERE id = 3;
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)

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

<<<<<<< HEAD

=======
INSERT INTO users ( email, password, role_id, mobile, city, state, pincode, address, profile_photo,status,name) VALUES
( 'demo@example.com', '123456', 2, 8780121630, 'Anjar', 'Gujarat', 370110, NULL, NULL, 1,'demo');
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)
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

<<<<<<< HEAD
select * from products


=======
select * from products;
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)
INSERT INTO products
(product_name, regular_price, sale_price, size, weight, rating, life, type, brand,nutrition_energy_kcal, nutrition_protein_g, nutrition_magnetiam_kcal,nutrition_calory_kcal,
 nutrition_vitamine_kcal, stock, sku, category,subcategory_id, tag, description, image, created_at, updated_at)
VALUES
<<<<<<< HEAD

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




=======
(
 'Organic Valley Cream Cheese Spread (77g)', 65.00, 45.00, '77g',77.00, NULL, NULL, 'Spread', 'Organic Valley',95,2,0, 95, 0, 100, 'OC-CS-77G','Dairy',1, NULL,
 'Our premium organic cream cheese spread is made from the finest ingredients.','https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',NOW(),NOW()),

(
 'Frozen French Baguette',20.00,20.00,'100g',100.00,NULL,NULL,'Bread','Generic Bakery',270,9,0,270,0, 100,'FB-BAG-100G','Bakery',2,NULL,
 'Authentic French baguette with crispy crust and soft interior.','https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',NOW(),NOW()),

(
 'Fresh Organic Red Seedless Grapes (400g)',60.00,60.00,'400g',400.00, NULL,NULL,'Fresh','Organic Farms',276,3,0,276,0,100,'FR-GRP-400G','Fruits',3,'NEW',
 'Sweet and juicy organic red seedless grapes.','https://images.media.gianteagle.com/00030034936327-2b618b46-b719-4a44-9c95-1968a50a1672.png?auto=format%2Ccompress&fill=solid&fit=fill&h=600&q=92&w=600',NOW(),NOW()),

(
 'Chobani Non-Fat Greek Yogurt, Black Cherry (170g)',170.00,140.00,'170g',170.00,NULL,NULL,'Yogurt','Chobani',140,14,0,140,0,100,'CH-YOG-170G','Dairy',1,NULL,
 'Creamy Greek yogurt with delicious black cherry flavor.','https://images.ctfassets.net/01to7kbtr3az/2rcLuOMqa34rLOS2sUNQsG/4e37a8a8b6edbcb2b171a8354b924341/BC_FOB_GRK_5p3oz_OW_2023_1H_REND_3QR_RGB_v8.png',NOW(),NOW()),

(
 'Family Tree Farms Jumbo Ultra-Premium Blueberries (275g)',285.00,200.00,'275g',275.00,NULL,NULL,'Fresh','Family Tree Farms',158,2,0,158,0,100,
 'FT-BLU-275G','Fruits',3,NULL,'Premium jumbo blueberries bursting with flavor.','https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop',NOW(),NOW()),

(
 'Organic Valley Sour Cream (400g)',110.00,80.00,'400g',400.00,NULL,NULL,'Cream','Organic Valley',776,8,0,776,0,100,'OV-SC-400G','Dairy',1,NULL,
 'Rich and tangy organic sour cream.','https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop',NOW(),NOW()),

('The Gluten Free Bakery Ciabatta Loaf',90.00,90.00,'100g',100.00,NULL,NULL,'Bread','Gluten Free Bakery',260,5,0,260,0,100,'GF-CIAB-100G','Bakery',2,
NULL,'Delicious gluten-free ciabatta loaf.','https://theloopywhisk.com/wp-content/uploads/2024/02/Gluten-Free-Ciabatta-Rolls_1200px-featured-500x500.jpg',NOW(),NOW()),

('Aashirvaad Whole Wheat Atta', 320.00, 299.00, '5 KG', 5.00, 4.60, 180, 'Food Grain', 'Aashirvaad',364, 12, 45, 364, 0, 150, 'AT-AASH-5KG', 'Grocery & Staples',
 8, 'Atta', 'Premium whole wheat flour for soft and fluffy rotis.', 'https://www.bbassets.com/media/uploads/p/l/126906_10-aashirvaad-atta-whole-wheat.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Fortune Biryani Basmati Rice', 450.00, 389.00, '5 KG', 5.00, 4.50, 365, 'Grain', 'Fortune',350, 7, 8, 350, 0, 100, 'RC-FORT-5KG', 'Grocery & Staples',
 8, 'Rice', 'Long grain basmati rice ideal for biryani.', 'https://m.media-amazon.com/images/I/81vW+LbPsoL.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Tata Salt Iodized', 28.00, 26.00, '1 KG', 1.00, 4.70, 730, 'Grocery', 'Tata',0, 0, 1, 0, 0, 500, 'TT-SALT-1KG', 'Grocery & Staples',
 8, 'Salt', 'Iodized salt for daily use.', 'https://www.bbassets.com/media/uploads/p/xxl/241600_9-tata-salt-iodized.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Saffola Gold Cooking Oil', 190.00, 179.00, '1 L', 1.00, 4.50, 365, 'Oil', 'Saffola',900, 0, 5, 900, 10, 300, 'SF-OIL-1L', 'Grocery & Staples',
 8, 'Oil', 'Blended edible oil for a healthy lifestyle.', 'https://m.media-amazon.com/images/I/61hbqzz4u+L._AC_UF894,1000_QL80_FMwebp_.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Amul Pasteurized Butter', 260.00, 245.00, '500g', 0.50, 4.80, 120, 'Dairy', 'Amul',720, 1, 2, 720, 10, 80, 'AM-BUT-500', 'Breakfast & Dairy',
 5, 'Butter', 'Delicious and creamy yellow Amul butter.', 'https://www.bbassets.com/media/uploads/p/xl/104864_8-amul-butter-pasteurised.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Amul Taaza Toned Milk', 32.00, 30.00, '500ml', 0.50, 4.30, 3, 'Dairy', 'Amul',62, 3, 2, 62, 1, 120, 'AM-MILK-500', 'Breakfast & Dairy',
 5, 'Milk', 'Fresh toned milk for daily use.', 'https://www.bbassets.com/media/uploads/p/l/40090894_7-amul-taaza.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Britannia Good Day Cashew Cookies', 40.00, 35.00, '200g', 0.20, 4.40, 240, 'Snack', 'Britannia',480, 6, 5, 480, 2, 200, 'BR-GD-200', 'Biscuits & Snacks',
 6, 'Cookies', 'Crunchy cashew cookies perfect for tea time.', 'https://www.bbassets.com/media/uploads/p/xl/270729_21-britannia-good-day-cashew-cookies.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Oreo Chocolate Cream Biscuits', 30.00, 28.00, '120g', 0.12, 4.60, 270, 'Snack', 'Oreo',480, 5, 4, 480, 1, 150, 'OR-CHO-120', 'Biscuits & Snacks',
 6, 'Cream Biscuits', 'Chocolate cream-filled crunchy sandwich cookies.', 'https://www.bbassets.com/media/uploads/p/l/100609485_42-cadbury-oreo-creame-biscuit-chocolate.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Haldiram''s Aloo Bhujia', 60.00, 55.00, '200g', 0.20, 4.70, 240, 'Snack', 'Haldiram’s',510, 7, 6, 510, 2, 180, 'HD-ALB-200', 'Chips & Snacks',
 2, 'Namkeen', 'Crispy aloo bhujia made with traditional spices.', 'https://m.media-amazon.com/images/I/71j1PeR4paL.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

('Lays Classic Salted Chips', 20.00, 18.00, '52g', 0.05, 4.40, 180, 'Snack', 'Frito Lay',560, 6, 7, 560, 1, 300, 'LY-SLT-52', 'Chips & Snacks', 2, 'Potato Chips', 'Crispy and salted classic potato chips.', 'https://m.media-amazon.com/images/I/61e+UwnsWwL.jpg', '2025-12-02 13:38:10', '2025-12-02 13:38:10'),

(
 'Fresh Bananas Robusta (1 KG)', 60.00, 52.00, '1 KG', 1.00, 4.50, 7, 'Fruit', 'Local Farms',
 89, 1, 27, 89, 0, 300, 'FR-BAN-1KG', 'Fruits',
 3, 'Banana', 'Fresh and healthy robusta bananas rich in potassium.',
 'https://m.media-amazon.com/images/I/51ebZJ+DR4L._AC_UF894,1000_QL80_.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Fresh Apple Shimla (1 KG)', 180.00, 160.00, '1 KG', 1.00, 4.60, 10, 'Fruit', 'Fresh Farms',
 52, 0, 5, 52, 0, 200, 'FR-APP-1KG', 'Fruits',
 3, 'Apple', 'Crisp and juicy Shimla apples.',
 'https://www.jiomart.com/images/product/original/590000009/apple-shimla-1-kg-product-images-o590000009-p590032630-1-202410011654.jpg?im=Resize=(420,420)',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Britannia Brown Bread', 55.00, 50.00, '400g', 0.40, 4.30, 5, 'Bakery', 'Britannia',
 250, 8, 4, 250, 2, 150, 'BR-BRD-400', 'Bakery',
 2, 'Bread', 'Soft and healthy brown bread slices.',
 'https://www.bbassets.com/media/uploads/p/l/20000006_6-britannia-bread-brown.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Modern White Bread', 45.00, 42.00, '400g', 0.40, 4.20, 5, 'Bakery', 'Modern',
 265, 7, 3, 265, 1, 180, 'MD-WB-400', 'Bakery',
 2, 'Bread', 'Soft white bread for daily use.',
 'https://www.bbassets.com/media/uploads/p/l/40223051_3-modern-sandwich-supreme-bread-baked-for-sandwiches.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Parle-G Gold Biscuits', 60.00, 55.00, '200g', 0.20, 4.50, 240, 'Snack', 'Parle',
 460, 6, 4, 460, 1, 250, 'PR-GG-200', 'Biscuits & Snacks',
 6, 'Biscuits', 'Classic glucose biscuits loved by all ages.',
 'https://www.bbassets.com/media/uploads/p/l/40009934_11-parle-g-gold-gluco-biscuits.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Good Day Butter Cookies', 45.00, 40.00, '150g', 0.15, 4.40, 240, 'Snack', 'Britannia',
 480, 6, 5, 480, 2, 220, 'BR-GD-150', 'Biscuits & Snacks',
 6, 'Cookies', 'Rich buttery cookies with crispy texture.',
 'https://www.bbassets.com/media/uploads/p/l/251012_9-britannia-good-day-butter.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Sunfeast Dark Fantasy Choco Fills', 90.00, 85.00, '100g', 0.10, 4.70, 270, 'Snack', 'Sunfeast',
 510, 6, 5, 510, 2, 180, 'SF-DF-100', 'Biscuits & Snacks',
 6, 'Choco Cookies', 'Chocolate filled premium cookies.',
 'https://www.bbassets.com/media/uploads/p/l/40077104_14-sunfeast-dark-fantasy-biscuits-cookies-choco-fills.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Bingo Mad Angles Achaari Masti', 20.00, 18.00, '90g', 0.09, 4.40, 180, 'Snack', 'Bingo',
 530, 6, 7, 530, 1, 300, 'BN-MA-90', 'Chips & Snacks',
 2, 'Chips', 'Tangy achari flavored crunchy chips.',
 'https://www.bbassets.com/media/uploads/p/l/238341_24-bingo-mad-angles-achaari-masti.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Kurkure Masala Munch', 20.00, 18.00, '90g', 0.09, 4.50, 180, 'Snack', 'Kurkure',
 545, 7, 6, 545, 1, 350, 'KR-MM-90', 'Chips & Snacks',
 2, 'Namkeen', 'Spicy crunchy snack with Indian masala.',
 'https://www.bbassets.com/media/uploads/p/l/102761_18-kurkure-namkeen-masala-munch.jpg',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
),

(
 'Lays Chipps sizzlin Hot ', 25.00, 22.00, '50g', 0.05, 4.30, 180, 'Snack', 'Uncle Chipps',
 560, 6, 7, 560, 1, 280, 'UC-ST-50', 'Chips & Snacks',
 2, 'Potato Chips', 'Spicy potato chips with classic taste.',
 'https://indiyumstore.com/cdn/shop/files/lay-s-sizzhling-hot-potato-chips-50-g-product-images-o492662941-p592184747-0-202206232321-550x550.jpg?v=1721151435&width=533',
 '2025-12-02 13:38:10', '2025-12-02 13:38:10'
);


select* from Products;
>>>>>>> 1eb59c9 (fetch product data ot database apply pagenation)



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





