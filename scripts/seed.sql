-- Insert sample data into Brands table
INSERT INTO Brands (logo, name, description, category, status) VALUES
  ('https://example.com/swiggy_logo.png', 'Swiggy', 'Food delivery platform', 'Food & Beverage', 'Active'),
  ('https://example.com/zomato_logo.png', 'Zomato', 'Restaurant discovery and food delivery platform', 'Food & Beverage', 'Active'),
  ('https://example.com/amazon_logo.png', 'Amazon', 'E-commerce platform', 'Retail', 'Active'),
  ('https://example.com/flipkart_logo.png', 'Flipkart', 'E-commerce platform', 'Retail', 'Active'),
  ('https://example.com/myntra_logo.png', 'Myntra', 'Fashion e-commerce platform', 'Fashion', 'Active'),
  ('https://example.com/oyo_logo.png', 'OYO', 'Hospitality company for budget hotels and homes', 'Hospitality', 'Active'),
  ('https://example.com/uber_logo.png', 'Uber', 'Ride-hailing and food delivery platform', 'Transportation', 'Active'),
  ('https://example.com/ola_logo.png', 'Ola', 'Ride-hailing and food delivery platform', 'Transportation', 'Active'),
  ('https://example.com/netflix_logo.png', 'Netflix', 'Streaming service for movies and TV shows', 'Entertainment', 'Active'),
  ('https://example.com/spotify_logo.png', 'Spotify', 'Music streaming service', 'Entertainment', 'Active');

-- Insert sample data into Vouchers table
INSERT INTO Vouchers (brand_id, banner_image, faq, highlights_description, highlights, expiration_date, discount_percentage) VALUES
  (1, 'https://example.com/swiggy_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Get amazing discounts on your favorite restaurants', '["Flat 50% off on first 5 orders", "Free delivery on orders above Rs. 99"]', '2024-12-31', 50),
  (2, 'https://example.com/zomato_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Discover new restaurants and enjoy exclusive offers', '["Get 25% off on your first order", "Cashback on selected restaurants"]', '2024-12-31', 25),
  (3, 'https://example.com/amazon_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Shop for a wide range of products at great prices', '["Up to 70% off on electronics", "Free delivery for Prime members"]', '2024-12-31', 70),
  (4, 'https://example.com/flipkart_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'India\'s largest online marketplace', '["Big Billion Days Sale", "Discounts on fashion, electronics, and more"]', '2024-12-31', 60),
  (5, 'https://example.com/myntra_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Fashion for every occasion', '["Flat 40% off on latest trends", "Free shipping on orders above Rs. 999"]', '2024-12-31', 40),
  (6, 'https://example.com/oyo_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Stay comfortably with OYO at affordable prices', '["Get Rs. 500 off on your first booking", "Exclusive deals for app users"]', '2024-12-31', 20),
  (7, 'https://example.com/uber_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Ride-hailing and food delivery services', '["Get 50% off on your first ride", "Discounts on Uber Eats orders"]', '2024-12-31', 50),
  (8, 'https://example.com/ola_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Book a cab or order food with Ola', '["Save on your daily commute", "Cashback on food orders"]', '2024-12-31', 30),
  (9, 'https://example.com/netflix_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Stream unlimited movies and TV shows', '["One month free trial", "Exclusive content available"]', '2024-12-31', 100),
  (10, 'https://example.com/spotify_banner.png', '{"question1": "answer1", "question2": "answer2"}', 'Listen to your favorite music anytime, anywhere', '["Ad-free listening experience", "Create and share playlists"]', '2024-12-31', 50);
