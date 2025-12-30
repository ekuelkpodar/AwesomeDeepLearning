import { Link } from 'react-router-dom';
import { getArchitecturesByCategory } from '../data/architectures';
import CNNPlayground from '../components/InteractiveDemo/CNNPlayground';
import { useProgress } from '../contexts/ProgressContext';

const ConvolutionalNetworksPage = () => {
  const cnnArchs = getArchitecturesByCategory('cnn');
  const { progress } = useProgress();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <span className="text-4xl mr-3">🖼️</span>
              Convolutional Neural Networks (CNNs)
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              The powerhouse of computer vision. CNNs use convolution operations to automatically learn spatial hierarchies of features from images. From handwritten digits to self-driving cars, CNNs revolutionized how machines understand visual data.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Architectures</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{cnnArchs.length}</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Progress</div>
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                  {cnnArchs.filter(a => progress.learnedArchitectures.includes(a.id)).length}/{cnnArchs.length}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-8xl">👁️</div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Core CNN Concepts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">⊞</span>
              Convolution Operation
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Small filters (kernels) slide across the image, performing element-wise multiplication and summation. Each filter learns to detect specific patterns like edges, textures, or complex shapes. Weight sharing dramatically reduces parameters compared to fully connected layers.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">↓</span>
              Pooling Layers
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Reduce spatial dimensions while retaining important features. Max pooling keeps the strongest activations, providing translation invariance and reducing computation. Typical 2×2 pooling halves width and height.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Feature Hierarchies
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Early layers detect low-level features (edges, colors). Middle layers combine these into mid-level patterns (textures, simple shapes). Deep layers recognize high-level concepts (faces, objects). This hierarchical learning mimics the human visual cortex.
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Spatial Invariance
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              CNNs can recognize objects regardless of their position in the image (translation invariance via pooling) and scale (via multiple filter sizes). This makes them robust to variations in real-world images.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive CNN Playground */}
      <CNNPlayground />

      {/* Architecture Timeline */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">CNN Evolution Timeline</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="space-y-8">
            {/* LeNet-5 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                1998
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold">LeNet-5</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Yann LeCun's pioneering CNN for handwritten digit recognition. Established the conv-pool-conv-pool-fc pattern.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">60K params</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-xs">MNIST: 99%+</span>
                </div>
              </div>
            </div>

            {/* AlexNet */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                2012
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold">AlexNet</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  The deep learning revolution starts here! Won ImageNet 2012 by a huge margin. Introduced ReLU, dropout, and GPU training at scale.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-xs">60M params</span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-xs">ImageNet Top-5: 84.7%</span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-xs font-bold">Breakthrough!</span>
                </div>
              </div>
            </div>

            {/* VGG */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                2014
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold">VGG-16 / VGG-19</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Proved depth matters. Simple, uniform architecture using only 3×3 convolutions. Still widely used for transfer learning.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 rounded text-xs">138M params</span>
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 rounded text-xs">ImageNet Top-5: 90%</span>
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 rounded text-xs">16-19 layers</span>
                </div>
              </div>
            </div>

            {/* ResNet */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                2015
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-bold">ResNet</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Residual connections enabled training 100+ layer networks. Solved vanishing gradient problem. Superhuman performance on ImageNet.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">25M params (ResNet-50)</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">ImageNet Top-5: 96.4%</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded text-xs">50-152 layers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Cards */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Explore CNN Architectures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {cnnArchs.map(arch => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            const isBookmarked = progress.bookmarkedArchitectures.includes(arch.id);

            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="card hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
              >
                {/* Status badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {isLearned && (
                    <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {isBookmarked && (
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {arch.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {arch.year}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                      {arch.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {arch.plainEnglish}
                </p>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600 dark:text-slate-400">
                        {arch.architecture.depth} layers
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {(arch.architecture.parameters / 1000000).toFixed(1)}M params
                      </span>
                    </div>
                    <div className="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                      Learn →
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Why CNNs Work */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Why Convolutional Neural Networks Work So Well</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">1. Parameter Sharing</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A 3×3 filter with 9 weights is reused across the entire image. For a 224×224 image, a fully connected layer would need 50K weights per neuron, but convolution uses just 9. This reduces parameters by 5000× while learning translation-invariant features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">2. Spatial Hierarchy</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Stacking conv layers builds a hierarchy: edges → textures → patterns → parts → objects. This matches how the human visual cortex works (V1 → V2 → V4 → IT). Each layer "sees" a larger receptive field, enabling recognition of increasingly complex structures.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">3. Translation Invariance</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Pooling provides robustness to small translations. A cat moved 5 pixels right activates different neurons in early layers, but pooling ensures later layers produce the same "cat detected" signal. This is crucial for real-world vision where objects appear at different positions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">4. Inductive Bias</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                CNNs encode the assumption that nearby pixels are more related than distant ones (locality) and that features should work everywhere (translation equivariance). These biases dramatically reduce the hypothesis space, enabling learning from less data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="text-2xl font-bold mb-4">Real-World CNN Applications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-bold mb-2">Autonomous Vehicles</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Tesla, Waymo use CNNs to detect pedestrians, vehicles, lane markings, and traffic signs in real-time from camera feeds.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🏥</div>
            <h3 className="font-bold mb-2">Medical Imaging</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              CNNs detect cancer in X-rays, segment tumors in MRIs, and diagnose diabetic retinopathy from retinal scans—often exceeding human accuracy.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold mb-2">Face Recognition</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              iPhone Face ID, Facebook photo tagging, and security systems use CNNs to recognize faces with 99%+ accuracy across lighting and pose variations.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">📸</div>
            <h3 className="font-bold mb-2">Image Enhancement</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Google Photos, Photoshop's Neural Filters use CNNs for super-resolution, denoising, colorization, and artistic style transfer.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🛰️</div>
            <h3 className="font-bold mb-2">Satellite Analysis</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              CNNs analyze satellite imagery for deforestation monitoring, crop yield prediction, disaster response, and urban planning.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="font-bold mb-2">Gaming & AR</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Motion capture, gesture recognition, and augmented reality apps use CNNs to track body pose and understand 3D scenes from 2D images.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
        <h2 className="text-2xl font-bold mb-4">📚 Recommended Learning Path</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold">Start with LeNet-5</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Understand the fundamentals: convolution, pooling, and how CNNs learn hierarchical features. Train on MNIST to see it work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold">Study AlexNet's Breakthrough</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Learn why ReLU, dropout, and data augmentation enabled the deep learning revolution. Understand GPU training and large-scale datasets.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold">Explore VGG's Simplicity</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                See how depth and uniform architecture (3×3 convs) achieve great results. Learn transfer learning with VGG features.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold">Master ResNet's Skip Connections</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Understand how residual learning enables training 100+ layer networks and solves vanishing gradients.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
            <div>
              <h3 className="font-bold">Experiment & Build</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Use the playground above to design your own CNNs. Try different architectures on CIFAR-10, then tackle ImageNet or your own dataset.
              </p>
            </div>
          </div>
        </div>

        <Link to="/learning-paths" className="btn-primary mt-6 inline-block">
          View Full Learning Path
        </Link>
      </div>
    </div>
  );
};

export default ConvolutionalNetworksPage;
