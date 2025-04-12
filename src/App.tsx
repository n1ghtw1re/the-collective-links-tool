import React, { useState, useEffect } from 'react';
import { Terminal, FolderOpen, Skull, Search } from 'lucide-react';
import { categories } from './categories';
import { useTheme } from './context/ThemeContext';
import { useSearch } from './hooks/useSearch';
import { SearchResults } from './components/SearchResults';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery, results } = useSearch(categories);

  const themeColors = {
    green: {
      text: 'text-green-400',
      textLight: 'text-green-300',
      textDark: 'text-green-600',
      textHover: 'text-green-400',
      border: 'border-green-800/50',
      borderHover: 'border-green-700/50',
      glow: 'rgba(0,255,0,0.08)',
      bg: 'bg-green-900/5',
      groupHover: 'group-hover:text-green-400',
    },
    amber: {
      text: 'text-amber-400',
      textLight: 'text-amber-300',
      textDark: 'text-amber-600',
      textHover: 'text-amber-400',
      border: 'border-amber-800/50',
      borderHover: 'border-amber-700/50',
      glow: 'rgba(255,191,0,0.08)',
      bg: 'bg-amber-900/5',
      groupHover: 'group-hover:text-amber-400',
    }
  };

  const colors = themeColors[theme];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
        setSearchQuery('');
      }
      if (e.key === '/' && !searchQuery) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchQuery, setSearchQuery]);

  const handleCategorySelect = async (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[1200px] h-[90vh] md:h-[85vh] relative">
        {/* Monitor Frame */}
        <div className="absolute inset-0 border-8 border-gray-800 rounded-lg shadow-2xl pointer-events-none"></div>
        <div className="absolute inset-0 border border-gray-700 rounded-lg pointer-events-none"></div>
        
        {/* CRT and Burn-in Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] animate-scan rounded-lg"></div>
        <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.glow}, rgba(0,0,0,0.2) 100%)` }}></div>
        <div className={`pointer-events-none absolute inset-0 ${colors.bg} rounded-lg`}></div>
        
        {/* Content Container with Scrolling */}
        <div className="absolute inset-0 overflow-auto custom-scrollbar rounded-lg p-4 sm:p-6 md:p-8">
          <div className={`${colors.text} font-mono min-h-full flex flex-col`}>
            <header className="mb-8 md:mb-12 flex flex-wrap items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`${colors.textLight} hover:${colors.textHover} transition-colors focus:outline-none focus:ring-2 focus:ring-${theme}-500`}
                aria-label="Toggle theme"
              >
                <Skull className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <Terminal className="w-6 h-6 md:w-8 md:h-8" />
              <h1 className={`text-2xl md:text-4xl font-bold tracking-tight animate-pulse ${colors.textLight}`}>
                The Collective
              </h1>
            </header>

            <div className="mb-6">
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search links... (Press '/' to focus)"
                  className={`w-full bg-black border ${colors.border} rounded p-2 ${colors.textLight} placeholder:${colors.textDark} focus:outline-none focus:ring-2 focus:ring-${theme}-500 text-sm md:text-base`}
                />
                <Search className={`absolute right-3 top-2.5 w-4 h-4 md:w-5 md:h-5 ${colors.textDark}`} />
              </div>
            </div>

            <div className="flex-grow">
              {isLoading ? (
                <div className={`flex justify-center items-center h-64 ${colors.textLight}`}>
                  Loading...
                </div>
              ) : searchQuery ? (
                <SearchResults
                  results={results || []}
                  onClose={() => setSearchQuery('')}
                />
              ) : !selectedCategory ? (
                <>
                  <div className={`mb-8 md:mb-12 ${colors.textLight} leading-relaxed text-sm md:text-base`}>
                    <p className="mb-4">
                      Back in the day, the LINKS page was the heart and soul of your website and community. 
                      They were the ultimate treasure troves, connecting curious minds to a world of endless possibilities.
                    </p>
                    <p className="mb-4">
                      On this page, you'll find a curated collection of links. Contact N1ghtw1re if you'd like your project added to our list.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(categories).map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left p-3 md:p-4 border ${colors.border} rounded flex items-center gap-3 hover:bg-${theme}-950/30 hover:${colors.borderHover} transition-colors group focus:outline-none focus:ring-2 focus:ring-${theme}-500`}
                      >
                        <FolderOpen className={`w-4 h-4 md:w-5 md:h-5 ${colors.textLight} ${colors.groupHover}`} />
                        <span className={`text-base md:text-xl ${colors.textLight}`}>{category}</span>
                        <span className={`${colors.textDark} text-xs md:text-sm ml-auto`}>[{categories[category].length}]</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`mb-4 md:mb-6 ${colors.textLight} hover:${colors.textHover} transition-colors focus:outline-none focus:ring-2 focus:ring-${theme}-500 text-sm md:text-base`}
                  >
                    [ Back to Categories ]
                  </button>
                  
                  <h2 className={`text-xl md:text-2xl mb-4 md:mb-6 ${colors.textLight} flex items-center gap-2`}>
                    <FolderOpen className="w-5 h-5 md:w-6 md:h-6" />
                    {selectedCategory}
                  </h2>
                  
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {categories[selectedCategory].map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-3 md:p-4 border ${colors.border} rounded hover:bg-${theme}-950/30 hover:${colors.borderHover} transition-colors focus:outline-none focus:ring-2 focus:ring-${theme}-500`}
                      >
                        <h3 className={`text-base md:text-lg ${colors.textLight} mb-1`}>{link.title}</h3>
                        <p className={`${colors.textDark} text-xs md:text-sm`}>{link.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className={`mt-6 md:mt-8 pt-3 md:pt-4 border-t ${colors.border} text-xs ${colors.textDark}`}>
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span>Created by</span>
                <a
                  href="https://n1ghtw1re-studios.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colors.textLight} hover:${colors.textHover} transition-colors`}
                >
                  N1ghtw1re Studios
                </a>
                <span>•</span>
                <a
                  href="mailto:n1ghtw1re@proton.me"
                  className={`${colors.textLight} hover:${colors.textHover} transition-colors`}
                >
                  n1ghtw1re@proton.me
                </a>
                <span>•</span>
                <a
                  href="https://github.com/n1ghtw1re"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colors.textLight} hover:${colors.textHover} transition-colors`}
                >
                  GitHub
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;