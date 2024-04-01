CREATE TABLE resource_sharing (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    material_name VARCHAR(255),
    quantity INT,
    availability_status ENUM('Available', 'Unavailable'),
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);
--
--

INSERT INTO resource_sharing (user_id, material_name, quantity, availability_status)
VALUES
    (1, 'Yarn', 5, 'Available'),
    (2, 'Wood', 10, 'Available'),
    (3, 'Embroidery Thread', 3, 'Unavailable'),
    (4, 'Leather', 8, 'Available'),
    (5, 'Origami Paper', 15, 'Available');