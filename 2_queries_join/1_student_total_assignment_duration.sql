SELECT SUM(duration) AS total_duraton
FROM assignment_submissions
JOIN students ON students.id = assignment_submissions.student_id
WHERE students.name = 'Ibrahim Schimmel';