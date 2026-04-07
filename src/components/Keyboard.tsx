interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: Set<string>;
  disabled: boolean;
}

const SPANISH_LETTERS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({ onGuess, guessedLetters, disabled }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {SPANISH_LETTERS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map(letter => {
            const isGuessed = guessedLetters.has(letter.toLowerCase());
            return (
              <button
                key={letter}
                onClick={() => onGuess(letter.toLowerCase())}
                disabled={disabled || isGuessed}
                className={`w-10 h-10 text-lg font-semibold rounded transition-all ${
                  isGuessed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white active:scale-95'
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
