interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
}

export default function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
  return (
    <div className="flex gap-2 mb-8">
      {word.split('').map((letter, index) => {
        const isGuessed = guessedLetters.has(letter.toLowerCase());
        const isSpace = letter === ' ';

        return (
          <div
            key={index}
            className={`w-12 h-16 flex items-center justify-center border-b-4 ${
              isSpace ? 'border-transparent' : 'border-gray-400'
            }`}
          >
            <span className={`text-3xl font-bold uppercase transition-all ${
              isGuessed || isSpace ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
              {isSpace ? '' : (isGuessed ? letter : '')}
            </span>
          </div>
        );
      })}
    </div>
  );
}
