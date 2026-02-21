import React from 'react';

interface ExportModalProps {
    selectedItems: { title: string; category: string }[];
    onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ selectedItems, onClose }) => {
    const generateListText = () => {
        const grouped: Record<string, string[]> = {};
        selectedItems.forEach(item => {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push(item.title);
        });

        return Object.entries(grouped)
            .map(([cat, items]) => `${cat} = ${items.join(', ')}`)
            .join('\n');
    };

    const text = generateListText();

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">AI Reference List</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Copy this list to share with your AI Agent.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="bg-gray-900 rounded-xl p-4 mb-6 ring-1 ring-white/10">
                        <pre className="text-blue-400 font-mono text-sm overflow-auto max-h-60 leading-relaxed whitespace-pre-wrap">
                            {text || "No items selected."}
                        </pre>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleCopy}
                            disabled={!text}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
