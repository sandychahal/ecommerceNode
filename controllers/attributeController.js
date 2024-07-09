const {
  getAttributeByType,
  checkAttributeExists,
  createAttribute,
  getAllAttributes,
  addUpdatedAttribute,
} = require('../models/attributeModel')

const all = (req, res) => {
  getAllAttributes((err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}

const filter = (req, res) => {
  const type = req.query.type
  console.log(req.query)
  getAttributeByType(type, (err, products) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching products' })
    } else {
      res.json(products)
    }
  })
}

const addAttribute = (req, res) => {
  const { p_id, type, value, created_by, updated_by } = req.body

  if (!p_id || !type || !value || !created_by || !updated_by) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  checkAttributeExists(value, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing attribute:', checkErr)
      return res.status(500).json({ error: 'Internal server error' })
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Attribute already exists' })
    }

    createAttribute(
      p_id,
      type,
      value,
      created_by,
      updated_by,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting attribute:', insertErr)
          return res.status(500).json({ error: 'Internal server error' })
        }

        return res.status(201).json({
          id: insertResults.insertId,
          p_id,
          type,
          value,
        })
      }
    )
  })
}

const updateAttribute = (req, res) => {
  const { p_id, type, value, updated_by } = req.body;
  const id = req.params.id;

  if (!p_id || !type || !value || !updated_by) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  checkAttributeExists(id, (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing attribute:', checkErr);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (checkResults.length === 0) {
      return res.status(404).json({ error: 'Attribute not found' });
    }

    addUpdatedAttribute(id, p_id, type, value, updated_by, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error updating attribute:', insertErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(200).json({
        a_id: id,
        p_id,
        type,
        value,
        updated_by,
      });
    });
  });
};

module.exports = {
  all,
  filter,
  addAttribute,
  updateAttribute,
}
