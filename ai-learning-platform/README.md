# 🧠 Deep Learning Hub

> A comprehensive, interactive educational web application for mastering 150+ AI and deep learning architectures.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## ✨ Features

### 🎯 Comprehensive Architecture Coverage
- **150+ Neural Network Architectures** across 12 major categories
- From classic CNNs to modern Transformers, GANs, and Diffusion Models
- Complete coverage of:
  - Feedforward & Fully Connected Networks
  - Convolutional Neural Networks (CNNs)
  - Recurrent & Sequence Models (RNNs, LSTMs, GRUs)
  - Transformers (BERT, GPT, LLaMA, Claude, etc.)
  - Autoencoders & VAEs
  - Generative Models (GANs & Diffusion)
  - Graph Neural Networks
  - Reinforcement Learning
  - And more!

### 📚 Rich Learning Content
Each architecture includes:
- **Plain English Explanation** - Understand the core concept intuitively
- **Interactive Architecture Visualization** - Visual layer-by-layer breakdown
- **Mathematical Foundation** - Core equations and derivations
- **Multi-Framework Code** - PyTorch, TensorFlow/Keras, and JAX implementations
- **Training Tips** - Hyperparameters, common issues, and solutions
- **Performance Benchmarks** - Accuracy, speed, and memory metrics
- **Real-World Use Cases** - Industry applications and examples
- **Additional Resources** - Papers, tutorials, and implementations

### 🎨 Modern, Beautiful UI
- **Dark Mode** - Eye-friendly interface with automatic theme detection
- **Fully Responsive** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Polished user experience
- **Accessibility** - ARIA labels and keyboard navigation support

### 🔍 Powerful Search & Filtering
- **Full-Text Search** - Find architectures by name, description, or tags
- **Category Filters** - Filter by architecture type
- **Difficulty Levels** - Beginner, Intermediate, Advanced
- **Year Range** - Explore architectures by publication date

### 📊 Comparison Tools
- **Side-by-Side Comparison** - Compare up to 4 architectures
- **Detailed Metrics** - Parameters, performance, requirements
- **Feature Analysis** - Key innovations and trade-offs

### 🎓 Guided Learning Paths
- **Curated Sequences** - Structured learning from beginner to expert
- **Progress Tracking** - Track what you've learned
- **6 Learning Paths**:
  - Complete Beginner Path
  - Computer Vision Specialist
  - NLP Engineer Path
  - Generative AI Master
  - Modern Deep Learning (2020+)
  - Reinforcement Learning Path

### 💾 Personal Progress Tracking
- **Mark as Learned** - Track your progress
- **Bookmarks** - Save architectures for later
- **Personal Notes** - Add your own insights
- **Time Tracking** - See how much time you've invested
- **Local Storage** - All progress saved in your browser

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd ai-learning-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)
   - If not, manually navigate to that URL

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Running Production Server

```bash
npm run start
```

This builds the app and starts an Express server on port 3000.

## 📁 Project Structure

```
ai-learning-platform/
├── src/
│   ├── components/           # React components
│   │   ├── Navigation/       # Nav bar and sidebar
│   │   ├── ArchitecturePage/ # Architecture detail components
│   │   ├── Visualization/    # Network visualizations
│   │   ├── CodeEditor/       # Code display components
│   │   ├── Comparison/       # Comparison tools
│   │   └── Common/           # Shared components
│   ├── data/                 # Architecture data
│   │   ├── architectures/    # JSON files for each architecture
│   │   ├── categories.ts     # Category definitions
│   │   └── papers/           # Paper references
│   ├── pages/                # Main page components
│   │   ├── HomePage.tsx
│   │   ├── ArchitectureDetailPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── ComparisonPage.tsx
│   │   └── LearningPathsPage.tsx
│   ├── contexts/             # React contexts
│   │   ├── ThemeContext.tsx  # Dark mode
│   │   └── ProgressContext.tsx # User progress
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── server/                   # Express server
│   └── server.js
├── public/                   # Static assets
│   ├── images/
│   ├── icons/
│   └── models/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **D3.js** - Network visualizations
- **Vite** - Build tool and dev server

### Backend
- **Express.js** - Production server
- **Node.js** - Runtime environment

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

## 📖 Usage Guide

### Browsing Architectures
1. Use the **sidebar** to navigate by category
2. Click on any architecture to view details
3. Use the **search page** for advanced filtering

### Learning
1. Visit **Learning Paths** to start structured learning
2. Choose a path that matches your skill level
3. Follow the sequence and mark architectures as learned
4. Track your progress on the dashboard

### Comparing Architectures
1. Go to the **Compare** page
2. Select 2-4 architectures
3. View side-by-side comparison of features, performance, and requirements

### Taking Notes
- On any architecture page, scroll to the "Your Notes" section
- Add personal insights, observations, or reminders
- Notes are automatically saved to your browser

## 🔧 Customization

### Adding New Architectures

1. **Create a JSON file** in `src/data/architectures/`:
   ```json
   {
     "id": "your-architecture-id",
     "name": "Your Architecture Name",
     "category": "cnn",
     "year": 2024,
     "description": "...",
     // ... other fields
   }
   ```

2. **Import it** in `src/data/architectures/index.ts`:
   ```typescript
   import yourArchitecture from './your-architecture.json';

   export const architectures = {
     // ... existing architectures
     'your-architecture-id': yourArchitecture as Architecture,
   };
   ```

3. The architecture will automatically appear in the app!

### Modifying Categories
Edit `src/data/categories.ts` to add or modify categories and subcategories.

### Customizing Styles
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Theme colors are defined in the Tailwind config

## 🎓 Architecture Data Format

Each architecture JSON includes:

```typescript
{
  id: string;
  name: string;
  category: string;
  subcategory: string;
  year: number;
  authors: string[];
  paper: string;
  paperUrl: string;
  description: string;
  plainEnglish: string;
  keyInnovation: string;
  architecture: {
    layers: Layer[];
    parameters: number;
    depth: number;
  };
  mathematics: {
    equations: Equation[];
    forwardPass: string[];
    backpropagation?: string[];
  };
  code: {
    pytorch: string;
    tensorflow?: string;
    jax?: string;
  };
  useCases: UseCase[];
  benchmarks: Benchmarks;
  trainingTips: TrainingTips;
  // ... and more
}
```

See `src/types/index.ts` for the complete type definitions.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied:
```bash
# Change the port in vite.config.ts
server: {
  port: 3001,  # Use a different port
}
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### TypeScript Errors
```bash
# Check for type issues
npm run lint
```

## 📝 License

MIT License - feel free to use this project for learning and education!

## 🤝 Contributing

This is an educational project. To contribute:
1. Add more architectures with complete data
2. Improve visualizations
3. Add interactive demos
4. Enhance documentation
5. Fix bugs

## 🙏 Acknowledgments

- All the brilliant researchers who created these architectures
- The open-source community for amazing tools and libraries
- Papers with Code for architectural insights

## 📬 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the console for error messages
3. Ensure all dependencies are installed correctly

---

**Built with ❤️ for the deep learning community**

Happy Learning! 🚀🧠
