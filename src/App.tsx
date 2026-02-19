import { useState } from 'react'
import { GalleryGrid } from './components/GalleryGrid'
import { PreviewModal } from './components/PreviewModal'
import { loadersData } from './data/loaders'
import { buttonsData } from './data/buttons'
import { cardsData } from './data/cards'
import { menusData } from './data/menus'
import { uiCardsData } from './data/uiCards'
import { sidebarsData } from './data/sidebars'

type Category = 'loaders' | 'buttons' | 'profile-cards' | 'hamburger-menus' | 'ui-cards' | 'sidebars';

function App() {
    const [selectedLoader, setSelectedLoader] = useState<{ title: string; codepen_url: string } | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('loaders');

    const handleSelectLoader = (loader: { title: string; codepen_url: string }) => {
        setSelectedLoader(loader);
    };

    const getCategoryData = () => {
        switch (activeCategory) {
            case 'loaders': return loadersData;
            case 'buttons': return buttonsData;
            case 'profile-cards': return cardsData;
            case 'hamburger-menus': return menusData;
            case 'ui-cards': return uiCardsData;
            case 'sidebars': return sidebarsData;
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
                        A hand-picked collection of {currentData.length} premium CSS {activeCategory.replace('-', ' ')} designs.
                    </p>
                </div>

                <GalleryGrid key={activeCategory} loaders={currentData} onSelectLoader={handleSelectLoader} />
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
