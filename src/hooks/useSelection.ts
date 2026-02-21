import { useState, useCallback } from 'react';

export function useSelection<T>(idKey: keyof T) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);

    const toggleSelectionMode = useCallback(() => {
        setIsSelectionMode((prev) => !prev);
        if (isSelectionMode) {
            setSelectedIds(new Set()); // Clear on exit
        }
    }, [isSelectionMode]);

    const toggleItem = useCallback((item: T) => {
        const id = String(item[idKey]);
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, [idKey]);

    const isSelected = useCallback((item: T) => {
        return selectedIds.has(String(item[idKey]));
    }, [selectedIds, idKey]);

    return {
        selectedIds,
        isSelectionMode,
        toggleSelectionMode,
        toggleItem,
        isSelected,
        clearSelection: () => setSelectedIds(new Set()),
    };
}
