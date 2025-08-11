const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors()); // Allow cross-origin requests from the React app
app.use(bodyParser.json()); // Parse JSON bodies

// --- In-Memory Data Store (simulated database) ---
// In a real application, this would be a database connection.
let users = [
  { username: 'user', password: 'password' }
];

let crmData = [
  { id: 1, type: 'Lead', name: 'Alice Johnson', email: 'alice@example.com', status: 'New' },
  { id: 2, type: 'Customer', name: 'Bob Williams', email: 'bob@example.com', status: 'Active' },
  { id: 3, type: 'Lead', name: 'Charlie Davis', email: 'charlie@example.com', status: 'Contacted' },
  { id: 4, type: 'Customer', name: 'Diana Miller', email: 'diana@example.com', status: 'Active' },
  { id: 5, type: 'Lead', name: 'Eve Brown', email: 'eve@example.com', status: 'Qualified' },
];

let nextCrmId = 6;

// --- API Endpoints ---

// User Signup
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Check if user already exists
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists.' });
  }

  const newUser = { username, password };
  users.push(newUser);
  console.log('New user signed up:', newUser.username);
  // In a real app, we would not return the password. A JWT token would be returned instead.
  res.status(201).json({ user: { username: newUser.username } });
});

// User Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  // In a real app, a JWT token would be generated and returned here.
  res.status(200).json({ user: { username: user.username } });
});

// Get CRM Data
app.get('/api/crm-data', (req, res) => {
  res.status(200).json(crmData);
});

// Update a CRM record
app.put('/api/crm-data/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const index = crmData.findIndex(item => item.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'CRM item not found.' });
  }

  crmData[index] = { ...crmData[index], ...updatedItem };
  res.status(200).json(crmData[index]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
