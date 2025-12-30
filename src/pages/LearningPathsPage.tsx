import { Link } from 'react-router-dom';
import { LearningPath } from '../types';
import { useProgress } from '../contexts/ProgressContext';

const learningPaths: LearningPath[] = [
  {
    id: 'beginner',
    name: 'Complete Beginner Path',
    description: 'Start from scratch and build a solid foundation in deep learning architectures',
    difficulty: 'Beginner',
    estimatedHours: 40,
    architectures: ['perceptron', 'mlp', 'cnn-basic', 'lenet5', 'alexnet', 'resnet50'],
    prerequisites: [],
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision Specialist',
    description: 'Master the evolution of computer vision architectures from CNNs to Vision Transformers',
    difficulty: 'Intermediate',
    estimatedHours: 60,
    architectures: ['lenet5', 'alexnet', 'vgg16', 'resnet50', 'resnet101', 'densenet121', 'efficientnetb0', 'vit', 'swin-transformer'],
    prerequisites: ['Basic understanding of CNNs'],
  },
  {
    id: 'nlp-engineer',
    name: 'NLP Engineer Path',
    description: 'Journey through NLP architectures from RNNs to modern large language models',
    difficulty: 'Advanced',
    estimatedHours: 80,
    architectures: ['rnn', 'lstm', 'gru', 'transformer', 'bert', 'gpt2', 'gpt3', 't5', 'llama2', 'mistral'],
    prerequisites: ['Understanding of sequence models'],
  },
  {
    id: 'generative-ai',
    name: 'Generative AI Master',
    description: 'Learn to create with GANs, VAEs, and Diffusion Models',
    difficulty: 'Advanced',
    estimatedHours: 70,
    architectures: ['autoencoder', 'vae', 'gan', 'dcgan', 'stylegan', 'stylegan2', 'ddpm', 'stable-diffusion', 'dalle2'],
    prerequisites: ['Strong understanding of deep learning'],
  },
  {
    id: 'modern-dl',
    name: 'Modern Deep Learning (2020+)',
    description: 'Focus on cutting-edge architectures and techniques from recent years',
    difficulty: 'Advanced',
    estimatedHours: 50,
    architectures: ['vit', 'swin-transformer', 'mae', 'dino', 'llama2', 'llama3', 'mistral', 'stable-diffusion-xl', 'gpt4'],
    prerequisites: ['Solid foundation in transformers and CNNs'],
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning Path',
    description: 'Master RL algorithms from DQN to AlphaZero',
    difficulty: 'Advanced',
    estimatedHours: 60,
    architectures: ['dqn', 'double-dqn', 'dueling-dqn', 'a3c', 'ppo', 'ddpg', 'sac', 'alphazero', 'muzero'],
    prerequisites: ['Understanding of neural networks and basic RL concepts'],
  },
];

const LearningPathsPage = () => {
  const { progress } = useProgress();

  const getPathProgress = (path: LearningPath): number => {
    const learned = path.architectures.filter(id =>
      progress.learnedArchitectures.includes(id)
    ).length;
    return (learned / path.architectures.length) * 100;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card">
        <h1 className="text-4xl font-bold mb-4">Learning Paths</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Follow curated paths designed to take you from beginner to expert in specific domains.
          Each path is carefully structured to build knowledge progressively.
        </p>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {learningPaths.map(path => {
          const progressPercent = getPathProgress(path);
          const difficultyColors = {
            'Beginner': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
            'Intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
            'Advanced': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
          };

          return (
            <div key={path.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{path.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {path.description}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[path.difficulty]}`}>
                  {path.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {path.estimatedHours} hours
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300">
                  {path.architectures.length} architectures
                </span>
              </div>

              {/* Prerequisites */}
              {path.prerequisites && path.prerequisites.length > 0 && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <div className="text-sm font-medium mb-1">Prerequisites:</div>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                    {path.prerequisites.map((prereq, idx) => (
                      <li key={idx}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Your Progress</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {progressPercent.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Architecture List Preview */}
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Included Architectures:</div>
                <div className="flex flex-wrap gap-1">
                  {path.architectures.slice(0, 6).map(archId => (
                    <span
                      key={archId}
                      className={`px-2 py-1 text-xs rounded ${
                        progress.learnedArchitectures.includes(archId)
                          ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {archId}
                      {progress.learnedArchitectures.includes(archId) && ' ✓'}
                    </span>
                  ))}
                  {path.architectures.length > 6 && (
                    <span className="px-2 py-1 text-xs text-slate-500">
                      +{path.architectures.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={progressPercent > 0 ? `/?path=${path.id}` : `/?path=${path.id}&start=true`}
                className="btn-primary w-full text-center"
              >
                {progressPercent === 0 ? 'Start Learning' :
                 progressPercent === 100 ? 'Review Path' :
                 'Continue Learning'}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-4">📚 Learning Tips</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Start with paths that match your current skill level</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Follow the sequence - each architecture builds on previous concepts</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Implement the code examples to reinforce learning</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Take notes and experiment with variations</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-secondary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Read the original papers for deeper understanding</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LearningPathsPage;
