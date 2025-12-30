# Contributing to Awesome Deep Learning

First off, thank you for considering contributing to Awesome Deep Learning! It's people like you that make this educational platform such a great resource for the deep learning community.

## 🌟 Ways to Contribute

There are many ways you can contribute to this project:

- **Add New Architectures**: Implement new deep learning architectures
- **Improve Documentation**: Enhance explanations, fix typos, add examples
- **Fix Bugs**: Report and fix bugs in the codebase
- **Enhance Visualizations**: Improve interactive playgrounds
- **Update Benchmarks**: Add or update performance metrics
- **Improve Code**: Optimize implementations, add tests
- **Share Feedback**: Report issues, suggest features

## 📋 Code of Conduct

This project adheres to a simple code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Deep Learning

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AwesomeDeepLearning.git
   cd AwesomeDeepLearning
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ekuelkpodar/AwesomeDeepLearning.git
   ```

4. **Install dependencies**
   ```bash
   cd ai-learning-platform
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build and test**
   ```bash
   npm run build
   ```

## 📝 Adding a New Architecture

### Step 1: Create Architecture JSON

Create a new file in `ai-learning-platform/src/data/architectures/`:

```json
{
  "id": "your-architecture-id",
  "name": "Your Architecture Name",
  "category": "cnn|rnn|transformer|etc",
  "description": "Brief description of the architecture",
  "icon": "icon-name",
  "yearIntroduced": 2024,
  "mathematics": {
    "equations": [
      {
        "name": "Equation Name",
        "latex": "\\mathbf{y} = f(\\mathbf{x})",
        "explanation": "Clear explanation of what this equation does",
        "variables": {
          "y": "Output variable",
          "x": "Input variable"
        }
      }
      // Add 5 more equations (6 total)
    ]
  },
  "code": {
    "framework": "PyTorch",
    "implementation": "# Full PyTorch implementation here",
    "keyComponents": ["Component 1", "Component 2"]
  },
  "useCases": [
    {"title": "Use Case", "description": "Description"}
  ],
  "benchmarks": {
    "Dataset": "Performance metric"
  },
  "trainingTips": [
    {"tip": "Training tip", "reason": "Why it's important"}
  ],
  "comparisons": ["other-architecture-id"],
  "resources": [
    {
      "type": "paper",
      "title": "Paper Title",
      "url": "https://arxiv.org/...",
      "description": "Paper description"
    }
  ],
  "tags": ["tag1", "tag2"],
  "difficulty": "Beginner|Intermediate|Advanced",
  "computationalRequirements": {
    "minimumVRAM": "X GB",
    "recommendedVRAM": "Y GB",
    "trainingTime": {"dataset": "time"},
    "typicalBatchSize": 32
  }
}
```

### Step 2: Register Architecture

Add your architecture to `ai-learning-platform/src/data/architectures/index.ts`:

```typescript
import yourArchitecture from './your-architecture-id.json';

export const architectures: Record<string, Architecture> = {
  // ... existing architectures
  'your-architecture-id': yourArchitecture as unknown as Architecture,
};
```

### Step 3: Test Your Addition

```bash
npm run build
# Ensure build succeeds
# Test in browser at http://localhost:5173
```

### Step 4: Submit Pull Request

```bash
git checkout -b feature/add-your-architecture
git add .
git commit -m "Add [Architecture Name] with comprehensive documentation"
git push origin feature/add-your-architecture
```

## 🎨 Code Style Guidelines

### TypeScript/React

- Use functional components with hooks
- Follow existing naming conventions
- Add TypeScript types for all props
- Use meaningful variable names
- Keep components focused and reusable

### JSON Files

- Follow the architecture template structure
- Include all 6 equations with explanations
- Provide complete PyTorch implementation
- Add relevant benchmarks and resources
- Use proper LaTeX formatting

### Commit Messages

Good commit messages:
```
Add ResNet-152 architecture with skip connections
Fix typo in LSTM equation explanation
Update Transformer benchmarks for 2024
Improve GAN playground visualization
```

Bad commit messages:
```
Update
Fix stuff
Changes
wip
```

## 🧪 Testing Checklist

Before submitting a PR, ensure:

- [ ] Build completes without errors (`npm run build`)
- [ ] All equations render correctly with KaTeX
- [ ] Code examples are syntactically correct
- [ ] Interactive playground works (if applicable)
- [ ] No console errors in browser
- [ ] Mobile responsive design maintained
- [ ] Dark mode looks good
- [ ] Architecture appears in correct category
- [ ] All links work correctly

## 📚 Documentation Standards

### Mathematical Explanations

- **Clear**: Explain in plain English what the equation does
- **Context**: Provide intuition and real-world analogies
- **Variables**: Define every variable used
- **Examples**: Include numerical examples when helpful

Good explanation:
> "THE CORE. Attention weights are computed via softmax of scaled dot products. Q, K, V = queries, keys, values. Scaling by √d_k prevents saturation. Output = weighted sum of values."

### Code Examples

- **Complete**: Runnable code, not snippets
- **Commented**: Explain non-obvious parts
- **Best Practices**: Follow PyTorch conventions
- **Tested**: Ensure code actually works

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Try to reproduce the bug
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.0.0]
```

## 💡 Feature Requests

We welcome feature suggestions! Please:

1. Check if the feature already exists
2. Clearly describe the feature
3. Explain why it would be useful
4. Provide examples if possible

## 🔄 Pull Request Process

1. **Update Documentation**: If you change functionality, update README
2. **Follow Style Guide**: Match existing code style
3. **Test Thoroughly**: Ensure everything works
4. **One Feature Per PR**: Keep PRs focused
5. **Describe Changes**: Write clear PR description
6. **Be Patient**: Maintainers will review when possible
7. **Address Feedback**: Respond to review comments

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New architecture
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Builds successfully
- [ ] Tested in browser
- [ ] No console errors
- [ ] Mobile responsive

## Screenshots (if applicable)
Add screenshots of visual changes
```

## 🎯 Priority Areas

We especially welcome contributions in:

1. **More Architectures**: Attention mechanisms, Vision Transformers, etc.
2. **Better Visualizations**: Interactive diagrams, animations
3. **Code Examples**: More diverse implementations
4. **Benchmarks**: Updated performance metrics
5. **Accessibility**: Screen reader support, keyboard navigation
6. **Performance**: Optimization, lazy loading
7. **Tests**: Unit tests, integration tests

## 📞 Questions?

- Open an [Issue](https://github.com/ekuelkpodar/AwesomeDeepLearning/issues)
- Start a [Discussion](https://github.com/ekuelkpodar/AwesomeDeepLearning/discussions)

## 🙏 Recognition

All contributors will be recognized in:
- GitHub contributors page
- Project documentation
- Release notes

Thank you for making Awesome Deep Learning better! 🎉

---

**Remember**: The best contribution is one that helps others learn. Whether it's fixing a typo or adding a complete architecture, every improvement matters!

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
