CREATE TABLE finished_projects (
    finished_project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    user_id INT,
    image_url VARCHAR(255),
    description TEXT,
    share_date TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES craft_project(project_id),
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);
--
--

--
INSERT INTO finished_projects (project_id, user_id, image_url, description, share_date)
VALUES
    (1, 1, 'https://beautifulhand.com/project1.jpg', 'Beautiful hand-knitted scarf', '2024-03-06 15:30:00'),
    (2, 2, 'https://woodensculpture.com/project2.jpg', 'Wooden sculpture of a bird', '2024-03-07 12:45:00'),
    (3, 3, 'https://embroidery.com/project3.jpg', 'Quilt with intricate embroidery', '2024-03-08 18:20:00'),
    (4, 4, 'https://handmade.com/project4.jpg', 'Handmade leather wallet', '2024-03-09 09:10:00'),
    (5, 5, 'https://origami.com/project5.jpg', 'Origami paper crane mobile', '2024-03-10 14:55:00');