import md5 from 'md5';
import db from '../dbconfig.js';

export const getUserByMobile = async (mobile) => {
  try {
    const query = 'SELECT * FROM users WHERE mobile = ?';
    const [results] = await db.promise().query(query, [mobile]);
    return results.length > 0;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.promise().query(query, [email]);
    return results.length > 0;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
};

export const createUser = (fname, lname, email, mobile, passkey) => {
  const hashedPassword = md5(passkey);
  const query = 'INSERT INTO users (fname, lname, email, mobile, passkey) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [fname, lname, email, mobile, hashedPassword],(err,results)=>{
    if(err){
      console.log('createUser');
      console.error(err);
    } else{
        console.log('createUser');
        console.log(results);
      }
  });
};

export const getUserById = (u_id) => {
  try {
    const query = 'SELECT * FROM users WHERE u_id = ?';
    const [rows] = db.query(query, [u_id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  } 
};

export const updateUser = (u_id, { fname, lname, email, mobile }) => {
  const query = `
    UPDATE users 
    SET fname = ?, lname = ?, email = ?, mobile = ? 
    WHERE u_id = ?`;
  db.query(query, [fname, lname, email, mobile, u_id]);
  return getUserById(id);
};
