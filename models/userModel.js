import md5 from 'md5';
import db from '../dbconfig.js';

export const getUserBymobile = (mobile) => {
  const query = 'SELECT * FROM users WHERE  mobile = ?';
  db.query(query,[mobile],(results) => {  
  if(results.length>0){
    return true;
  }
});
};

export const getUserByEmail = (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query,[email],(results) => {  
    if(results.length>0){
      return true;
    }
});
};

export const createUser = (fname, lname, email, mobile, passkey) => {
  const hashedPassword = md5(passkey);
  const query = 'INSERT INTO users (fname, lname, email, mobile, passkey) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [fname, lname, email, mobile, hashedPassword]);
};

export const getUserById = (u_id) => {
  const query = 'SELECT * FROM users WHERE u_id = ?';
  const [rows] = db.query(query, [u_id]);
  return rows[0];
};

export const updateUser = (u_id, { fname, lname, email, mobile }) => {
  const query = `
    UPDATE users 
    SET fname = ?, lname = ?, email = ?, mobile = ? 
    WHERE u_id = ?
  `;
  db.query(query, [fname, lname, email, mobile, u_id]);
  return getUserById(id);
};
