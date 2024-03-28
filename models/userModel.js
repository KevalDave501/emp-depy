const pool = require('../config/dbconfig');

async function getUsers() {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM users');
    connection.release();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT user_id, firstname, lastname, gender, email, password, hobbies, department_id FROM users WHERE user_id = ?', [userId]);
    connection.release();
    return user[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}


async function createUser(userData) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO users SET ?', [userData]);
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function updateUser(userId, userData) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('UPDATE users SET ? WHERE id = ?', [userData, userId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [userId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

async function getUsersWithDepartment() {
  try {
    const connection = await pool.getConnection();
    const [usersWithDepartment] = await connection.query(`
    SELECT u.user_id, u.firstname, u.lastname, u.email, u.password, u.gender, u.hobbies, d.department_name AS departmentName
    FROM users u
    JOIN departments d ON u.department_id = d.department_id
    
    `);
    connection.release();
    return usersWithDepartment;
  } catch (error) {
    console.error('Error fetching users with department:', error);
    throw error;
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersWithDepartment
};
