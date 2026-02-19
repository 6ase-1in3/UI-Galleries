import React, { useEffect, useRef } from 'react';

// Using simple SVG icons to avoid dependency issues if Lucide isn't picking up
const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

const IconExternalLink = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);

const IconCode = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);

interface LoaderData {
    title: string;
    codepen_url: string;
}

interface PreviewModalProps {
    loader: LoaderData | null;
    onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ loader, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!loader) return null;

    const embedUrl = loader.codepen_url.replace('/pen/', '/embed/') + '?default-tab=result&theme-id=light';
    const fullUrl = loader.codepen_url.replace('/pen/', '/full/');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-text-primary">
            <div
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div
                ref={modalRef}
                className="relative w-full max-w-5xl bg-bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-white">
                    <h2 className="text-xl font-semibold truncate pr-4">{loader.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="flex-1 bg-gray-50 relative min-h-[400px]">
                    <iframe
                        src={embedUrl}
                        title={loader.title}
                        className="w-full h-full absolute inset-0 border-0"
                        allowFullScreen
                    />
                </div>

                <div className="px-6 py-4 border-t border-border-subtle bg-white flex justify-end gap-3">
                    <a
                        href={loader.codepen_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <IconCode /> View Code
                    </a>
                    <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        <IconExternalLink /> Full Screen
                    </a>
                </div>
            </div>
        </div>
    );
};
