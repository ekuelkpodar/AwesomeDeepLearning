import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import GenerativeModelsPlayground from '../components/InteractiveDemo/GenerativeModelsPlayground';
import { getArchitecturesByCategory } from '../data/architectures';

export default function GenerativeModelsPage() {
  const { progress } = useProgress();
  const architectures = getArchitecturesByCategory('generative');

  const getCompletedCount = () => {
    return architectures.filter(arch => progress.learnedArchitectures.includes(arch.id)).length;
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 dark:from-purple-900 dark:via-pink-900 dark:to-orange-900 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Generative Models</h1>
              <p className="text-purple-100 mt-1">Creating new data from learned distributions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{architectures.length}</div>
              <div className="text-purple-100 text-sm">Architectures</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">{getCompletedCount()}/{architectures.length}</div>
              <div className="text-purple-100 text-sm">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold text-white">2014-2020</div>
              <div className="text-purple-100 text-sm">Era Span</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
            Adversarial Training
          </h3>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            GANs and StyleGAN use a generator-discriminator game to produce realistic samples through competition,
            achieving sharp, high-quality outputs but requiring careful training balance.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Iterative Refinement
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Diffusion models generate by gradually denoising from pure noise over many steps, providing stable
            training and excellent mode coverage but requiring multiple forward passes for sampling.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-300 mb-2">
            Controllable Generation
          </h3>
          <p className="text-sm text-pink-700 dark:text-pink-400">
            StyleGAN's mapping network and style injection enable unprecedented control over generated outputs,
            allowing independent modification of different attributes through disentangled latent space.
          </p>
        </div>
      </div>

      {/* Interactive Playground */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Interactive Playground
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Experiment with different generative architectures and see how they compare
          </p>
        </div>
        <GenerativeModelsPlayground />
      </div>

      {/* Architecture Cards */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Generative Architectures
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            From adversarial networks to diffusion processes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectures.map((arch) => {
            const isLearned = progress.learnedArchitectures.includes(arch.id);
            const isBookmarked = progress.bookmarkedArchitectures.includes(arch.id);

            return (
              <Link
                key={arch.id}
                to={`/architecture/${arch.id}`}
                className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                {isLearned && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {isBookmarked && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {arch.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                          {arch.year}
                        </span>
                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                          {arch.subcategory}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {arch.plainEnglish}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{arch.architecture.parameters >= 1000000
                          ? `${(arch.architecture.parameters / 1000000).toFixed(1)}M`
                          : `${(arch.architecture.parameters / 1000).toFixed(0)}K`} params
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>{arch.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timeline & Evolution */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Evolution Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The progression from adversarial training to diffusion processes
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500"></div>

          <div className="space-y-8">
            {/* GAN Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2014</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">GAN: Adversarial Revolution</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Goodfellow et al. introduced Generative Adversarial Networks, pioneering the use of adversarial
                  training for generation. The generator-discriminator game produces sharp outputs but suffers from
                  training instability and mode collapse.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Adversarial Training
                  </span>
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Minimax Game
                  </span>
                  <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    Sharp Outputs
                  </span>
                </div>
              </div>
            </div>

            {/* StyleGAN Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-pink-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">2018</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">StyleGAN: Controllable Generation</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  NVIDIA's StyleGAN revolutionized image synthesis with style-based generation. The mapping network
                  creates a disentangled latent space, enabling unprecedented control over attributes through
                  style injection at different resolutions via AdaIN.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                    Disentangled Latents
                  </span>
                  <span className="text-xs px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                    AdaIN
                  </span>
                  <span className="text-xs px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                    Style Mixing
                  </span>
                  <span className="text-xs px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                    Progressive Growing
                  </span>
                </div>
              </div>
            </div>

            {/* Diffusion Era */}
            <div className="relative pl-20">
              <div className="absolute left-5 top-2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">2020</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Diffusion: Stable & High-Quality</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Denoising Diffusion Probabilistic Models (DDPM) introduced iterative denoising as an alternative
                  to adversarial training. Diffusion models achieve state-of-the-art quality with stable training
                  and excellent mode coverage, powering DALL-E 2, Stable Diffusion, and Imagen.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    Iterative Denoising
                  </span>
                  <span className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    Stable Training
                  </span>
                  <span className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    Mode Coverage
                  </span>
                  <span className="text-xs px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                    Text-to-Image SOTA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Recommended Learning Path
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Start with Vanilla GAN
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Understand the fundamental adversarial training framework: generator-discriminator minimax game,
                training dynamics, and common challenges like mode collapse and instability.
              </p>
              <Link
                to="/architecture/gan"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Learn GAN
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Explore StyleGAN for Control
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Learn how mapping networks create disentangled representations and how AdaIN enables style control
                at different scales. Understand style mixing and the truncation trick for quality-diversity trade-offs.
              </p>
              <Link
                to="/architecture/stylegan"
                className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
              >
                Learn StyleGAN
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Master Diffusion Models
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Understand forward and reverse diffusion processes, the simple denoising objective, and how
                classifier-free guidance enables text-to-image generation. Compare with GANs and learn about
                fast sampling methods like DDIM.
              </p>
              <Link
                to="/architecture/diffusion"
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
              >
                Learn Diffusion Models
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Real-World Applications
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            How generative models are transforming industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Text-to-Image Generation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              DALL-E 2, Stable Diffusion, Midjourney: Generate photorealistic images from text descriptions.
              Used in advertising, concept art, game development. Stable Diffusion has 100M+ users, Midjourney
              achieved $200M revenue in 2023.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Advertising
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Concept Art
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Game Dev
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Photorealistic Face Generation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              StyleGAN creates indistinguishable synthetic faces at 1024×1024. Used in entertainment (movie
              background characters), privacy (synthetic datasets), research (face recognition training),
              and digital art (ThisPersonDoesNotExist.com).
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Movies/Games
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Privacy
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Digital Art
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Medical Data Augmentation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Generate synthetic medical images for rare diseases or conditions with limited training data.
              Diffusion and GANs create realistic X-rays, MRIs, and CT scans while preserving patient privacy.
              Improves diagnostic model training.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Healthcare
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Privacy
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Rare Diseases
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Image Editing & Enhancement
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Inpainting, outpainting, super-resolution, style transfer. Adobe Firefly uses diffusion for
              generative fill. Diffusion-based super-resolution (SR3) upscales 4-8× with realistic details.
              StyleCLIP enables text-guided image editing.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Photo Editing
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Super-Resolution
              </span>
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                Style Transfer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
