import { useState, useEffect } from 'react'
import { GalleryGrid } from './components/GalleryGrid'
import { PreviewModal } from './components/PreviewModal'
import { loadersData } from './data/loaders'
import { buttonsData } from './data/buttons'
import { cardsData } from './data/cards'
import { menusData } from './data/menus'
import { uiCardsData } from './data/uiCards'
import { sidebarsData } from './data/sidebars'
import useLocalStorage from './hooks/useLocalStorage'

type Category = 'loaders' | 'buttons' | 'profile-cards' | 'hamburger-menus' | 'ui-cards' | 'sidebars' | 'favorites';

function App() {
    const [selectedLoader, setSelectedLoader] = useState<{ title: string; codepen_url: string } | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('loaders');
    const [favorites, setFavorites] = useLocalStorage<string[]>('css-gallery-favorites', []);

    const handleSelectLoader = (loader: { title: string; codepen_url: string }) => {
        setSelectedLoader(loader);
    };

    const handleToggleFavorite = (e: React.MouseEvent, loader: { title: string; codepen_url: string }) => {
        e.stopPropagation();
        setFavorites((prev) => {
            if (prev.includes(loader.codepen_url)) {
                return prev.filter(url => url !== loader.codepen_url);
            } else {
                return [...prev, loader.codepen_url];
            }
        });
    };

    const getCategoryData = () => {
        const allItems = [
            ...loadersData,
            ...buttonsData,
            ...cardsData,
            ...menusData,
            ...uiCardsData,
            ...sidebarsData
        ];

        switch (activeCategory) {
            case 'loaders': return loadersData;
            case 'buttons': return buttonsData;
            case 'profile-cards': return cardsData;
            case 'hamburger-menus': return menusData;
            case 'ui-cards': return uiCardsData;
            case 'sidebars': return sidebarsData;
            case 'favorites':
                return allItems.filter(item => favorites.includes(item.codepen_url));
            default: return loadersData;
        }
    };

    const getCategoryTitle = (cat: Category) => {
        switch (cat) {
            case 'loaders': return 'Loaders';
            case 'buttons': return 'Buttons';
            case 'profile-cards': return 'Profile Cards';
            case 'hamburger-menus': return 'Hamburger Menus';
            case 'ui-cards': return 'UI Cards';
            case 'sidebars': return 'Sidebars';
            case 'favorites': return 'My Favorites';
            default: return 'Collection';
        }
    }

    const currentData = getCategoryData();

    return (
        <div className="min-h-screen bg-bg-base font-sans pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border-subtle overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 min-w-max gap-4">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 shrink-0">
                            CSS Gallery
                        </h1>

                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-2">
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shadow-inner">
                                {['loaders', 'buttons', 'profile-cards', 'hamburger-menus', 'ui-cards', 'sidebars'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveCategory(tab as Category)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 capitalize whitespace-nowrap ${activeCategory === tab
                                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                            }`}
                                    >
                                        {tab.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setActiveCategory('favorites')}
                                className={`ml-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1.5 ${activeCategory === 'favorites'
                                        ? 'bg-yellow-50 text-yellow-600 shadow-sm ring-1 ring-yellow-400/20'
                                        : 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={activeCategory === 'favorites' ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Favorites <span className="bg-gray-200 text-gray-700 py-0.5 px-1.5 rounded-full text-xs">{favorites.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8">
                <div className="px-6 mb-8">
                    <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        {getCategoryTitle(activeCategory)}
                    </h2>
                    <p className="mt-2 text-lg text-text-secondary">
                        {activeCategory === 'favorites'
                            ? `Your personal collection of ${currentData.length} saved designs.`
                            : `A hand-picked collection of ${currentData.length} premium CSS ${activeCategory.replace('-', ' ')} designs.`
                        }
                    </p>
                </div>

                <GalleryGrid
                    key={activeCategory}
                    loaders={currentData}
                    onSelectLoader={handleSelectLoader}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                />
            </main>

            {/* Footer */}
            <footer className="border-t border-border-subtle mt-12 py-8 text-center text-text-secondary text-sm">
                <p>© 2026 CSS Loader Gallery. All rights reserved.</p>
            </footer>

            {/* Modal */}
            {selectedLoader && (
                <PreviewModal
                    loader={selectedLoader}
                    onClose={() => setSelectedLoader(null)}
                />
            )}
        </div>
    )
}

export default App
