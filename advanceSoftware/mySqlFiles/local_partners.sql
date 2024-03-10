CREATE TABLE local_partners (
    partner_id INT PRIMARY KEY AUTO_INCREMENT,
    partner_name VARCHAR(255) NOT NULL,
    partner_type VARCHAR(50),
    location VARCHAR(255),
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--

---
INSERT INTO local_partners (partner_name, partner_type, location, contact_info)
VALUES
    ('Crafty Corner', 'Craft Store', '123 Main Street, Cityville', 'info@craftycorner.com'),
    ('Woodworks Workshop', 'Workshop', '456 Oak Avenue, Woodsville', 'contact@woodworksworkshop.com'),
    ('Embroidery Excellence', 'Artisan', '789 Silk Lane, Threadville', 'info@embroideryexcellence.com'),
    ('Leathercraft Haven', 'Craft Store', '101 Leather Street, Leatherland', 'support@leathercrafthaven.com'),
    ('Origami Oasis', 'Workshop', '234 Paper Lane, Origamiville', 'workshop@origamioasis.com');