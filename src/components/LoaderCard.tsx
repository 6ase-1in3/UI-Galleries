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
}

export const LoaderCard: React.FC<LoaderCardProps> = ({ loader, onClick, isFavorite, onToggleFavorite }) => {
    const embedUrl = loader.codepen_url.replace('/pen/', '/embed/') + '?default-tab=result&theme-id=light';

    return (
        <div
            className="bg-bg-card rounded-2xl border border-border-subtle shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full group relative"
            onClick={() => onClick(loader)}
        >
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 