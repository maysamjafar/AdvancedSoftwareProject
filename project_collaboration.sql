USE saf;
CREATE TABLE project_collaboration (
    collaboration_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    user_id INT,
    task_assignment TEXT,
    communication_tools VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES craft_project(project_id),
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);
--
-----
---
INSERT INTO project_collaboration (project_id, user_id, task_assignment, communication_tools)
VALUES
    (1, 1, 'Knit the first half of the scarf', 'Chat Messaging'),
    (1, 2, 'Knit the second half of the scarf', 'Video Calls'),
    (2, 3, 'Carve the body of the bird', 'Email Communication'),
    (2, 4, 'Paint the finished sculpture', 'Group Chat'),
    (3, 5, 'Embroider specific quilt sections', 'Task Management System');