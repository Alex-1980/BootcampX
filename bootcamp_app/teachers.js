const { Pool } = require('pg');
const process = require('process');

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query((`
SELECT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teacher, cohort
ORDER BY teacher;
`), values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    })
  })
  .catch(err => console.error('query error', err.stack));