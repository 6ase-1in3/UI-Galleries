import React from 'react';
import { LoaderCard } from './LoaderCard';

interface LoaderData {
    title: string;
    codepen_url: string;
}

interface GalleryGridProps {
    loaders: LoaderData[];
    onSelectLoader: (loader: LoaderData) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ loaders, onSelectLoader }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
            {loaders.map((loader, index) => (
                <LoaderCard
                    key={`${loader.title}-${index}`}
                    loader={loader}
                    onClick={onSelectLoader}
                />
            ))}
        </div>
    );
};
