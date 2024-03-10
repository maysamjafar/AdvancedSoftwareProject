CREATE TABLE craft_project (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
    materials TEXT,
    group_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
----
-----
INSERT INTO craft_project (title, description, difficulty_level, materials, group_size)
VALUES
    ('Hand-Knitted Scarf', 'Learn to knit a beautiful scarf.', 'Beginner', 'Yarn, Knitting Needles', 1),
    ('Wooden Bird Sculpture', 'Create a wooden sculpture of a bird.', 'Intermediate', 'Wood, Carving Tools', 1),
    ('Quilt with Embroidery', 'Make a quilt with intricate embroidery.', 'Advanced', 'Fabric, Embroidery Thread', 2),
    ('Handmade Leather Wallet', 'Craft a stylish leather wallet.', 'Intermediate', 'Leather, Stitching Tools', 1),
    ('Origami Crane Mobile', 'Construct a mobile with origami paper cranes.', 'Intermediate', 'Origami Paper, Strings', 1);
