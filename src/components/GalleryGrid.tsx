import React from 'react';
import { LoaderCard } from './LoaderCard';

interface LoaderData {
    title: string;
    codepen_url: string;
}

interface GalleryGridProps {
    loaders: LoaderData[];
    onSelectLoader: (loader: LoaderData) => void;
    favorites: string[];
    onToggleFavorite: (e: React.MouseEvent, loader: LoaderData) => void;
    isSelectionMode?: boolean;
    isSelected?: (item: LoaderData) => boolean;
    onToggleSelect?: (e: React.MouseEvent, item: LoaderData) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
    loaders,
    onSelectLoader,
    favorites,
    onToggleFavorite,
    isSelectionMode = false,
    isSelected,
    onToggleSelect
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
            {loaders.map((loader) => (
                <LoaderCard
                    key={loader.codepen_url}
                    loader={loader}
                    onClick={onSelectLoader}
                    isFavorite={favorites.includes(loader.codepen_url)}
                    onToggleFavorite={onToggleFavorite}
                    isSelectionMode={isSelectionMode}
                    isSelected={isSelected?.(loader)}
                    onToggleSelect={onToggleSelect}
                />
            ))}
        </div>
    );
};
