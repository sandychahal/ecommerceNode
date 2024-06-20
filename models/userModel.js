import md5 from 'md5';

export const getUserByEmailOrPhone = async (emailOrPhone) => {
  const query = 'SELECT * FROM users WHERE email = ? OR mobile = ?';
  const [rows] = await global.db.execute(query, [emailOrPhone, emailOrPhone]);
  return rows[0];
};

export const createUser = async (fname, lname, email, mobile, password) => {
  const hashedPassword = md5(password);
  const query = 'INSERT INTO users (fname, lname, email, mobile, password) VALUES (?, ?, ?, ?, ?)';
  await global.db.execute(query, [fname, lname, email, mobile, hashedPassword]);
};

export const getUserById = async (u_id) => {
  const query = 'SELECT * FROM users WHERE u_id = ?';
  const [rows] = await global.db.execute(query, [u_id]);
  return rows[0];
};

export const updateUser = async (u_id, { fname, lname, email, mobile }) => {
  const query = `
    UPDATE users 
    SET fname = ?, lname = ?, email = ?, mobile = ? 
    WHERE u_id = ?
  `;
  await global.db.execute(query, [fname, lname, email, mobile, u_id]);
  return getUserById(id);
};
