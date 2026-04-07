import { Trophy, X } from 'lucide-react';

interface GameModalProps {
  isWin: boolean;
  word: string;
  translation: string;
  onNextWord: () => void;
}

export default function GameModal({ isWin, word, translation, onNextWord }: GameModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-in]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-[slideUp_0.3s_ease-out]">
        <div className="flex flex-col items-center text-center">
          {isWin ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">¡Ganaste!</h2>
              <p className="text-gray-600 mb-2">You won!</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">¡Perdiste!</h2>
              <p className="text-gray-600 mb-2">You lost!</p>
            </>
          )}

          <div className="my-6 p-4 bg-gray-50 rounded-lg w-full">
            <p className="text-sm text-gray-500 mb-1">The word was:</p>
            <p className="text-2xl font-bold text-gray-800 uppercase">{word}</p>
            <p className="text-sm text-gray-600 mt-2">({translation})</p>
          </div>

          <button
            onClick={onNextWord}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors active:scale-95"
          >
            Good game! Next Word?
          </button>
        </div>
      </div>
    </div>
  );
}
