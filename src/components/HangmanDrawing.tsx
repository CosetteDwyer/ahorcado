interface HangmanDrawingProps {
  wrongGuesses: number;
}

export default function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  const parts = [
    <circle key="head" cx="140" cy="70" r="20" stroke="currentColor" strokeWidth="3" fill="none" className="animate-[fadeIn_0.3s_ease-in]" />,
    <line key="body" x1="140" y1="90" x2="140" y2="150" stroke="currentColor" strokeWidth="3" className="animate-[fadeIn_0.3s_ease-in]" />,
    <line key="left-arm" x1="140" y1="110" x2="110" y2="130" stroke="currentColor" strokeWidth="3" className="animate-[fadeIn_0.3s_ease-in]" />,
    <line key="right-arm" x1="140" y1="110" x2="170" y2="130" stroke="currentColor" strokeWidth="3" className="animate-[fadeIn_0.3s_ease-in]" />,
    <line key="left-leg" x1="140" y1="150" x2="120" y2="180" stroke="currentColor" strokeWidth="3" className="animate-[fadeIn_0.3s_ease-in]" />,
    <line key="right-leg" x1="140" y1="150" x2="160" y2="180" stroke="currentColor" strokeWidth="3" className="animate-[fadeIn_0.3s_ease-in]" />
  ];

  return (
    <svg width="280" height="250" className="text-gray-800">
      <line x1="20" y1="230" x2="150" y2="230" stroke="currentColor" strokeWidth="4" />
      <line x1="80" y1="230" x2="80" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="80" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="currentColor" strokeWidth="4" />
      {parts.slice(0, wrongGuesses)}
    </svg>
  );
}
