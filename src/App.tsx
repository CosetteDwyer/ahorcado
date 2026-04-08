import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import HangmanDrawing from './components/HangmanDrawing';
import WordDisplay from './components/WordDisplay';
import Keyboard from './components/Keyboard';
import GameModal from './components/GameModal';
import { RefreshCw } from 'lucide-react';

const MAX_WRONG_GUESSES = 6;

interface SpanishWord {
  id: string;
  word: string;
  translation: string;
  difficulty: string;
}

function App() {
  const [currentWord, setCurrentWord] = useState<SpanishWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [loading, setLoading] = useState(true);

  const fetchRandomWord = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('spanish_words')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching word:', error);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentWord(data[randomIndex]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handlePhysicalKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();

      if (/^[a-zñ]$/.test(letter)) {
        event.preventDefault();
        handleGuess(letter);
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => window.removeEventListener('keydown', handlePhysicalKeyPress);
  }, [gameStatus, guessedLetters, currentWord, wrongGuesses]);

  useEffect(() => {
    if (!currentWord) return;

    const word = currentWord.word.toLowerCase();
    const wordLetters = new Set(word.replace(/\s/g, '').split(''));
    const guessedWordLetters = new Set([...guessedLetters].filter(letter => wordLetters.has(letter)));

    if (guessedWordLetters.size === wordLetters.size && wordLetters.size > 0) {
      setGameStatus('won');
    } else if (wrongGuesses >= MAX_WRONG_GUESSES) {
      setGameStatus('lost');
    }
  }, [guessedLetters, wrongGuesses, currentWord]);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || !currentWord) return;

    if (guessedLetters.has(letter)) return;

    setGuessedLetters(prev => new Set([...prev, letter]));

    if (!currentWord.word.toLowerCase().includes(letter)) {
      setWrongGuesses(prev => prev + 1);
    }
  };

  const handleNextWord = () => {
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
    fetchRandomWord();
  };

  if (loading || !currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center">
        <div className="animate-spin">
          <RefreshCw className="w-12 h-12 text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Ahorcado (Hangman)
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Guess the Spanish word!
        </p>

        <div className="flex flex-col items-center gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <HangmanDrawing wrongGuesses={wrongGuesses} />
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-2">
              Wrong guesses: <span className="font-bold text-red-600">{wrongGuesses}</span> / {MAX_WRONG_GUESSES}
            </p>
          </div>

          <WordDisplay word={currentWord.word} guessedLetters={guessedLetters} />

          <Keyboard
            onGuess={handleGuess}
            guessedLetters={guessedLetters}
            disabled={gameStatus !== 'playing'}
          />
        </div>
      </div>

      {gameStatus !== 'playing' && (
        <GameModal
          isWin={gameStatus === 'won'}
          word={currentWord.word}
          translation={currentWord.translation}
          onNextWord={handleNextWord}
        />
      )}
    </div>
  );
}

export default App;
