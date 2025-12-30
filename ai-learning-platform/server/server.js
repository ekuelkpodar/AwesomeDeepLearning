import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory (after build)
app.use(express.static(join(__dirname, '../dist')));

// API routes can be added here if needed
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Deep Learning Hub API is running' });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🧠  Deep Learning Hub Server                           ║
║                                                           ║
║   Server running on: http://localhost:${PORT}               ║
║                                                           ║
║   Ready to explore 150+ AI architectures!                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
