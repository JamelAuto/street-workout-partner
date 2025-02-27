const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require('dotenv').config();
const User = require('./models/User');
const WorkoutEntry = require('./models/WorkoutEntry');
const jwt = require('jsonwebtoken');
const pool = require("./db");
const prometheus = require('prom-client');

// Create a Registry to register metrics
const register = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const chatRequestsTotal = new prometheus.Counter({
  name: 'chat_requests_total',
  help: 'Total number of chat requests'
});

const authenticatedUsersTotal = new prometheus.Gauge({
  name: 'authenticated_users_total',
  help: 'Total number of authenticated users'
});

const workoutEntriesTotal = new prometheus.Counter({
  name: 'workout_entries_total',
  help: 'Total number of workout entries created'
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(chatRequestsTotal);
register.registerMetric(authenticatedUsersTotal);
register.registerMetric(workoutEntriesTotal);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Middleware to measure request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});


// Add conversation history storage (in memory - replace with database for production)
const conversations = new Map();

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message, sessionId = Date.now().toString() } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.log('OpenAI API Key:', 'undefined or empty');
    return res.status(500).json({ error: 'OpenAI API key is not configured' });
  }

  // Get or initialize conversation history
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, [
      {
        role: 'system',
        content: "You are an expert in street workout, with extensive knowledge of bodyweight exercises, muscle building, strength, endurance, flexibility, and training techniques. Be precise and concise with the advices you give based on the user performance"      }
    ]);
  }

  const conversationHistory = conversations.get(sessionId);
  
  // Add user message to history
  conversationHistory.push({ role: 'user', content: message });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: conversationHistory,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Add assistant's response to history
    const assistantMessage = response.data.choices[0].message;
    conversationHistory.push(assistantMessage);

    // Limit history length (optional)
    if (conversationHistory.length > 10) {
      // Keep system message and last 9 messages
      conversations.set(sessionId, [
        conversationHistory[0],
        ...conversationHistory.slice(-9)
      ]);
    }

    res.json({ 
      reply: assistantMessage.content,
      sessionId: sessionId 
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Auth routes
app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Workout routes
app.post('/workouts', async (req, res) => {
  try {
    const workout = await WorkoutEntry.create(req.user.id, req.body);
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/workouts', async (req, res) => {
  try {
    const workouts = await WorkoutEntry.getByUserId(req.user.id);
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
