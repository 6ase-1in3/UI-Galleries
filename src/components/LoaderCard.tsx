import React from 'react';

interface LoaderData {
    title: string;
    codepen_url: string;
}

interface LoaderCardProps {
    loader: LoaderData;
    onClick: (loader: LoaderData) => void;
    isFavorite: boolean;
    onToggleFavorite: (e: React.MouseEvent, loader: LoaderData) => void;
    isSelectionMode?: boolean;
    isSelected?: boolean;
    onToggleSelect?: (e: React.MouseEvent, loader: LoaderData) => void;
}

export const LoaderCard: React.FC<LoaderCardProps> = ({
    loader,
    onClick,
    isFavorite,
    onToggleFavorite,
    isSelectionMode = false,
    isSelected = false,
    onToggleSelect
}) => {
    const embedUrl = loader.codepen_url.replace('/pen/', '/embed/') + '?default-tab=result&theme-id=light';

    return (
        <div
            onClick={() => isSelectionMode && onToggleSelect ? onToggleSelect({} as any, loader) : onClick(loader)}
            className={`group relative bg-white rounded-xl border border-border-subtle overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 shadow-blue-500/20' : ''
                }`}
        >
            {/* Selection Checkbox Overlay */}
            {isSelectionMode && (
                <div className="absolute top-3 left-3 z-30">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                            ? 'bg-blue-500 border-blue-500 text-white scale-110'
                            : 'bg-white/80 border-gray-300 text-transparent backdrop-blur-sm'
                        }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}
            <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={(e) => onToggleFavorite(e, loader)}
                    className={`p-2 rounded-full shadow-sm backdrop-blur-md transition-all duration-200 ${isFavorite
                        ? 'bg-yellow-100 text-yellow-500 hover:bg-yellow-200'
                        : 'bg-white/90 text-gray-400 hover:text-yellow-500 hover:bg-white'
                        }`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
            </div>

            {isFavorite && (
                <div className="absolute top-3 right-3 z-20 group-hover:opacity-0 transition-opacity duration-200">
                    <div className="bg-yellow-400 text-white p-1.5 rounded-full shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}

            <div className="relative h-64 bg-gray-50 overflow-hidden">
                {/* Magic Scaling Wrapper */}
                <div className="w-[200%] h-[200%] origin-top-left transform scale-50 pointer-events-none select-none">
                    <iframe
                        src={embedUrl}
                        title={loader.title}
                        className="w-full h-full border-0"
                        loading="lazy"
                        tabIndex={-1}
                    />
                </div>
                {/* Interaction Overlay */}
                <div className="absolute inset-0 bg-transparent z-10"></div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between bg-white relative z-20">
                <h3 className="text-lg font-medium text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                    {loader.title}
                </h3>
                <p className="text-sm text-text-secondary">Click to view details</p>
            </div>
        </div>
    );
};
