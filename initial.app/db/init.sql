INSERT INTO task_deadlines (name, description) VALUES
('Urgent', 'High priority tasks that need immediate attention'),
('Standart', 'Regular priority tasks with normal deadline'),
('Long-term', 'Low priority tasks with extended deadline');

INSERT INTO task_statuses (name, description) VALUES
('Created', 'Task has been created but not yet started'),
('In Process', 'Task is currently being worked on'),
('Completed', 'Task has been finished successfully');

INSERT INTO user_roles (title, description) VALUES
('Master', 'Board creator'),
('Admin', 'Intervention in board related operations is allowed'),
('Executor', 'The task performer can only change task statuses');