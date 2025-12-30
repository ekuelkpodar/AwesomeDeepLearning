# 🚀 Quick Start Guide

Get up and running with Deep Learning Hub in 2 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start the Development Server

```bash
npm run dev
```

The app will automatically open in your browser at **http://localhost:3000**

## Step 3: Start Exploring!

### 🏠 Homepage
- Overview of all architecture categories
- Quick stats about your learning progress
- Featured architectures to get started

### 📚 Learning Paths
Click "Learning Paths" in the navigation to find curated learning sequences:
- **Beginner Path**: Start here if you're new to deep learning
- **Computer Vision**: Master CNNs and vision models
- **NLP Engineer**: Learn transformers and language models
- **Generative AI**: Create with GANs and diffusion models

### 🔍 Search
Use the search bar to find specific architectures by name, tag, or description.

### 📖 Architecture Pages
Click any architecture to see:
- Plain English explanation
- Interactive visualization
- Complete code implementations
- Training tips and benchmarks
- Your personal notes

### 📊 Compare
Go to the Compare page to analyze multiple architectures side-by-side.

## Features to Try

1. **Toggle Dark Mode** - Click the sun/moon icon in the navigation
2. **Bookmark Architectures** - Click the bookmark icon on any architecture page
3. **Mark as Learned** - Track your progress with the checkmark button
4. **Take Notes** - Add personal insights on each architecture page
5. **Filter by Category** - Use the sidebar to browse by type

## What's Included

Currently, the app includes:
- ✅ **2 Complete Architectures**: ResNet-50 and Transformer (with full details)
- ✅ **12 Categories**: All major architecture types organized
- ✅ **6 Learning Paths**: Structured learning sequences
- ✅ **Full UI**: All pages and features working
- ✅ **Dark Mode**: Beautiful dark theme
- ✅ **Progress Tracking**: Local storage of your learning journey

## Adding More Architectures

Want to add more architectures? It's easy!

1. Copy the format from `src/data/architectures/resnet50.json`
2. Create a new JSON file with your architecture data
3. Import it in `src/data/architectures/index.ts`
4. Refresh the app - it will automatically appear!

See the main README.md for detailed instructions.

## Development Tips

### Hot Module Replacement
The dev server supports HMR - your changes appear instantly!

### File Locations
- **Pages**: `src/pages/`
- **Components**: `src/components/`
- **Data**: `src/data/architectures/`
- **Styles**: `src/index.css` and `tailwind.config.js`

### Building for Production

```bash
npm run build
```

Creates an optimized build in the `dist/` directory.

### Running Production Build

```bash
npm run start
```

Builds and serves the app on port 3000.

## Need Help?

- Check the main [README.md](README.md) for full documentation
- Look at existing architecture files for examples
- All your progress is saved locally in your browser

---

**Ready to master deep learning architectures? Let's go! 🧠🚀**
