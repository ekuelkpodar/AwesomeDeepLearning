import { MathematicsSection } from '../../types';

interface MathSectionProps {
  mathematics: MathematicsSection;
}

const MathSection = ({ mathematics }: MathSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Core Equations */}
      {mathematics.equations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Core Equations</h3>
          <div className="space-y-4">
            {mathematics.equations.map((equation, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="font-medium mb-2">{equation.name}</div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <div className="font-mono text-center text-lg">
                    {equation.latex}
                  </div>
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {equation.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forward Pass */}
      {mathematics.forwardPass.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Forward Pass Steps</h3>
          <ol className="space-y-2">
            {mathematics.forwardPass.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Backpropagation */}
      {mathematics.backpropagation && mathematics.backpropagation.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Backpropagation</h3>
          <ol className="space-y-2">
            {mathematics.backpropagation.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-500 text-white flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Loss Function */}
      {mathematics.lossFunction && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold mb-2">Loss Function</h3>
          <div className="font-mono text-lg">{mathematics.lossFunction}</div>
        </div>
      )}
    </div>
  );
};

export default MathSection;
