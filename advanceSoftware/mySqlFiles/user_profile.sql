CREATE TABLE user_profile (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    craft_skills TEXT,
    craft_interests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-----

----
INSERT INTO user_profile (username, email, password, craft_skills, craft_interests)
VALUES
    ('Abdullah', 'abdullah@gmail.com', 'a12345', 'Sewing, Painting', 'DIY, Gardening'),
    ('Fatima', 'fatima@gmail.com', 'f12345', 'Woodworking, Sculpting', 'Photography, Cooking'),
    ('Mohammed', 'mohammed@gmail.com', 'm12345', 'Embroidery, Quilting', 'Pottery, Drawing'),
    ('Nour', 'nour@gmail.com', 'n12345', 'Candle Making, Leathercraft', 'Calligraphy, Jewelry Making'),
    ('Leila', 'leila@gmail.com', 'l12345', 'Paper Crafts, Origami', 'Sewing, Cross-stitch');
----
----