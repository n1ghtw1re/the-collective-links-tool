import React from 'react';
import { Link } from '../utils/validation';
import { useTheme } from '../context/ThemeContext';

interface SearchResultsProps {
  results: (Link & { category: string })[];
  onClose: () => void;
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
  const { theme } = useTheme();
  const colors = {
    green: {
      text: 'text-green-400',
      textLight: 'text-green-300',
      textDark: 'text-green-600',
      border: 'border-green-800/50',
    },
    amber: {
      text: 'text-amber-400',
      textLight: 'text-amber-300',
      textDark: 'text-amber-600',
      border: 'border-amber-800/50',
    }
  }[theme];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl ${colors.textLight}`}>Search Results</h2>
        <button
          onClick={onClose}
          className={`${colors.textLight} hover:${colors.text} transition-colors`}
        >
          [ Close Search ]
        </button>
      </div>
      
      {results.length === 0 ? (
        <p className={colors.textDark}>No results found</p>
      ) : (
        results.map((result, index) => (
          <a
            key={index}
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 border ${colors.border} rounded hover:bg-${theme}-950/30 transition-colors`}
          >
            <h3 className={`text-lg ${colors.textLight} mb-1`}>{result.title}</h3>
            <p className={`${colors.textDark} text-sm mb-2`}>{result.description}</p>
            <span className={`${colors.textDark} text-xs`}>Category: {result.category}</span>
          </a>
        ))
      )}
    </div>
  );
}