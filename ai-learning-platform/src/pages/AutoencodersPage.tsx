import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import AutoencoderPlayground from '../components/InteractiveDemo/AutoencoderPlayground';

const AutoencodersPage = () => {
  const { progress } = useProgress();

  const architectures = [
    {
      id: 'autoencoder',
      name: 'Vanilla Autoencoder',
      year: 1986,
      description: 'Basic unsupervised learning via reconstruction through bottleneck',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'vae',
      name: 'VAE',
      year: 2013,
      description: 'Probabilistic generative model with reparameterization trick',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'denoising-autoencoder',
      name: 'Denoising Autoencoder',
      year: 2008,
      description: 'Robust features via reconstruction from corrupted input',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            Autoencoders & Representation Learning
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Autoencoders
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl">
            Learn compressed representations through self-supervised reconstruction. From dimensionality reduction to generative modeling.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-sm text-blue-200">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">1986+</div>
              <div className="text-sm text-blue-200">Since</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-2xl font-bold">Self-Sup</div>
              <div className="text-sm text-blue-200">Learning</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Interactive Playground */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Interactive Playground</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <AutoencoderPlayground />
        </div>
      </div>

      {/* Architecture Cards */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Architectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architectures.map((arch) => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className={`h-2 bg-gradient-to-r ${arch.gradient}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {arch.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{arch.year}</p>
                    </div>
                    {isLearned && (
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{arch.description}</p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                    Learn more
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-slate-200 dark:border-slate-600">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Learning Path</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Start with Vanilla Autoencoder</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Master the basics: encoder-decoder architecture, bottleneck compression, reconstruction loss. Implement on MNIST for dimensionality reduction and anomaly detection.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Add Regularization with Denoising AE</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Learn robust feature learning by training with corrupted inputs. Experiment with different noise types (Gaussian, masking, salt-and-pepper). Apply to image denoising tasks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Master VAE for Generation</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Understand variational inference and the reparameterization trick. Implement ELBO loss (reconstruction + KL divergence). Generate new samples and explore latent space interpolation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Explore Advanced Variants</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Study β-VAE for disentanglement, VQ-VAE for discrete latents, Adversarial AE combining with GANs. Apply to real-world domains: drug discovery, anomaly detection, data compression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoencodersPage;
