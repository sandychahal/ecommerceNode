export const updateUser = async (id, { fname, lname, email, phone }) => {
    const query = `
      UPDATE users 
      SET fname = ?, lname = ?, email = ?, phone = ? 
      WHERE id = ?
    `;
    await global.db.execute(query, [fname, lname, email, phone, id]);
    return getUserById(id);
  };
  