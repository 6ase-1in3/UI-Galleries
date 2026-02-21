import { useState } from 'react'
import { GalleryGrid } from './components/GalleryGrid'
import { PreviewModal } from './components/PreviewModal'
import { ExportModal } from './components/ExportModal'
import { loadersData } from './data/loaders'
import { buttonsData } from './data/buttons'
import { cardsData } from './data/cards'
import { menusData } from './data/menus'
import { uiCardsData } from './data/uiCards'
import { sidebarsData } from './data/sidebars'
import { artEffectsData } from './data/artEffects'
import { navEffectsData } from './data/navEffects'
import { chartEffectsData } from './data/chartEffects'
import { transitionEffectsData } from './data/transitionEffects'
import { switchEffectsData } from './data/switchEffects'
import { galleryData } from './data/gallery'
import useLocalStorage from './hooks/useLocalStorage'
import { useSelection } from './hooks/useSelection'
import { useSyncFavorites } from './hooks/useSyncFavorites'
import { loginWithGoogle, logout } from './lib/firebase'

type Category =
    | 'loaders'
    | 'buttons'
    | 'profile-cards'
    | 'hamburger-menus'
    | 'ui-cards'
    | 'sidebars'
    | 'art-effects'
    | 'nav-effects'
    | 'chart-effects'
    | 'transition-effects'
    | 'switch-effects'
    | 'gallery'
    | 'favorites';

const CATEGORIES: { id: Category; label: string }[] = [
    { id: 'loaders', label: 'Loaders' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'profile-cards', label: 'Profile Cards' },
    { id: 'hamburger-menus', label: 'Menus' },
    { id: 'ui-cards', label: 'UI Cards' },
    { id: 'sidebars', label: 'Sidebars' },
    { id: 'art-effects', label: 'Art Effects' },
    { id: 'nav-effects', label: 'Nav Effects' },
    { id: 'chart-effects', label: 'Charts' },
    { id: 'transition-effects', label: 'Transitions' },
    { id: 'switch-effects', label: 'Switches' },
    { id: 'gallery', label: 'Gallery' },
];

function App() {
    const [selectedLoader, setSelectedLoader] = useState<{ title: string; codepen_url: string } | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('loaders');
    const [favorites, setFavorites] = useLocalStorage<string[]>('css-gallery-favorites', []);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { user, toggleCloudFavorite } = useSyncFavorites(favorites, setFavorites);
    const selection = useSelection<{ title: string; codepen_url: string; category?: string }>('codepen_url');

    const handleSelectLoader = (loader: { title: string; codepen_url: string }) => {
        setSelectedLoader(loader);
    };

    const handleToggleFavorite = (e: React.MouseEvent, loader: { title: string; codepen_url: string }) => {
        e.stopPropagation();
        const newFavs = favorites.includes(loader.codepen_url)
            ? favorites.filter(url => url !== loader.codepen_url)
            : [...favorites, loader.codepen_url];

        setFavorites(newFavs);
        if (user) {
            toggleCloudFavorite(newFavs);
        }
    };

    const getCategoryData = () => {
        const allItems = [
            ...loadersData.map(i => ({ ...i, category: 'Loader' })),
            ...buttonsData.map(i => ({ ...i, category: 'Button' })),
            ...cardsData.map(i => ({ ...i, category: 'Profile Card' })),
            ...menusData.map(i => ({ ...i, category: 'Menu' })),
            ...uiCardsData.map(i => ({ ...i, category: 'UI Card' })),
            ...sidebarsData.map(i => ({ ...i, category: 'Sidebar' })),
            ...artEffectsData.map(i => ({ ...i, category: 'Art Effect' })),
            ...navEffectsData.map(i => ({ ...i, category: 'Nav Effect' })),
            ...chartEffectsData.map(i => ({ ...i, category: 'Chart' })),
            ...transitionEffectsData.map(i => ({ ...i, category: 'Transition' })),
            ...switchEffectsData.map(i => ({ ...i, category: 'Switch' })),
            ...galleryData.map(i => ({ ...i, category: 'Gallery' })),
        ];

        switch (activeCategory) {
            case 'loaders': return loadersData.map(i => ({ ...i, category: 'Loader' }));
            case 'buttons': return buttonsData.map(i => ({ ...i, category: 'Button' }));
            case 'profile-cards': return cardsData.map(i => ({ ...i, category: 'Profile Card' }));
            case 'hamburger-menus': return menusData.map(i => ({ ...i, category: 'Menu' }));
            case 'ui-cards': return uiCardsData.map(i => ({ ...i, category: 'UI Card' }));
            case 'sidebars': return sidebarsData.map(i => ({ ...i, category: 'Sidebar' }));
            case 'art-effects': return artEffectsData.map(i => ({ ...i, category: 'Art Effect' }));
            case 'nav-effects': return navEffectsData.map(i => ({ ...i, category: 'Nav Effect' }));
            case 'chart-effects': return chartEffectsData.map(i => ({ ...i, category: 'Chart' }));
            case 'transition-effects': return transitionEffectsData.map(i => ({ ...i, category: 'Transition' }));
            case 'switch-effects': return switchEffectsData.map(i => ({ ...i, category: 'Switch' }));
            case 'gallery': return galleryData.map(i => ({ ...i, category: 'Gallery' }));
            case 'favorites': return allItems.filter(item => favorites.includes(item.codepen_url));
            default: return loadersData.map(i => ({ ...i, category: 'Loader' }));
        }
    };

    const getCategoryTitle = (cat: Category) =>
        CATEGORIES.find(c => c.id === cat)?.label ?? (cat === 'favorites' ? 'My Favorites' : 'Collection');

    const currentData = getCategoryData();

    return (
        <div className="min-h-screen bg-bg-base font-sans pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border-subtle overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 min-w-max gap-4">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 shrink-0">
                            CSS Gallery
                        </h1>

                        {/* Navigation Tabs */}
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shadow-inner">
                            {CATEGORIES.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveCategory(id)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${activeCategory === id
                                        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setActiveCategory('favorites')}
                            disabled={selection.isSelectionMode && activeCategory !== 'favorites'}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1.5 shrink-0 ${activeCategory === 'favorites'
                                ? 'bg-yellow-50 text-yellow-600 shadow-sm ring-1 ring-yellow-400/20'
                                : 'text-gray-500 hover:text-yellow-600 hover:bg-yellow-50'
                                } ${selection.isSelectionMode && activeCategory !== 'favorites' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={activeCategory === 'favorites' ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Favorites <span className="bg-gray-200 text-gray-700 py-0.5 px-1.5 rounded-full text-xs">{favorites.length}</span>
                        </button>

                        <div className="flex items-center gap-2 shrink-0 ml-auto">
                            {/* Selection Toggle */}
                            <button
                                onClick={selection.toggleSelectionMode}
                                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${selection.isSelectionMode
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {selection.isSelectionMode ? 'Exit Selection' : 'Selection Mode'}
                            </button>

                            {selection.isSelectionMode && (
                                <button
                                    onClick={() => setIsExportModalOpen(true)}
                                    className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/25 flex items-center gap-2 hover:bg-green-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    Export List ({selection.selectedIds.size})
                                </button>
                            )}

                            <div className="h-8 w-px bg-gray-200 mx-1"></div>

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 p-1 pl-2 hover:bg-gray-100 rounded-full transition-colors border border-transparent hover:border-gray-200"
                                    >
                                        <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-gray-200" />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                                                <p className="text-sm font-medium text-gray-900 truncate">{user.displayName}</p>
                                            </div>
                                            <button
                                                onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={loginWithGoogle}
                                    className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-xl shadow-lg hover:bg-black transition-all flex items-center gap-2"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Sign In
                                </button>
                            )}
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
                            : `A hand-picked collection of ${currentData.length} premium CSS designs.`
                        }
                    </p>
                </div>

                <GalleryGrid
                    key={activeCategory}
                    loaders={currentData}
                    onSelectLoader={handleSelectLoader}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    isSelectionMode={selection.isSelectionMode}
                    isSelected={selection.isSelected}
                    onToggleSelect={(_, item) => selection.toggleItem(item)}
                />
            </main>

            {/* Footer */}
            <footer className="border-t border-border-subtle mt-12 py-8 text-center text-text-secondary text-sm">
                <p>© 2026 CSS Loader Gallery. All rights reserved.</p>
            </footer>

            {/* Modals */}
            {selectedLoader && (
                <PreviewModal
                    loader={selectedLoader}
                    onClose={() => setSelectedLoader(null)}
                />
            )}

            {isExportModalOpen && (
                <ExportModal
                    selectedItems={getCategoryData().filter(item => selection.selectedIds.has(item.codepen_url))}
                    onClose={() => setIsExportModalOpen(false)}
                />
            )}
        </div>
    )
}

export default App
