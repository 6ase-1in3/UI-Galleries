import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';

export function useSyncFavorites(localFavorites: string[], setLocalFavorites: (urls: string[]) => void) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Track Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Sync Logic
    useEffect(() => {
        if (!user) return;

        const userDocRef = doc(db, 'users', user.uid);

        // 1. Initial Merge: Push localStorage to Firestore if Firestore is empty or just joined
        const initialSync = async () => {
            try {
                const docSnap = await getDoc(userDocRef);
                if (!docSnap.exists() && localFavorites.length > 0) {
                    await setDoc(userDocRef, { favorites: localFavorites });
                } else if (docSnap.exists()) {
                    // Merge local into remote
                    const remoteFavs = docSnap.data().favorites || [];
                    const merged = Array.from(new Set([...remoteFavs, ...localFavorites]));
                    if (merged.length !== remoteFavs.length) {
                        await setDoc(userDocRef, { favorites: merged }, { merge: true });
                    }
                }
            } catch (err) {
                console.error("Firebase Initial Sync Error:", err);
            }
        };

        initialSync();

        // 2. Listen for Remote Changes
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const remoteFavs = doc.data().favorites || [];
                // Only update if different to avoid loops
                if (JSON.stringify(remoteFavs) !== JSON.stringify(localFavorites)) {
                    setLocalFavorites(remoteFavs);
                }
            }
        });

        return unsubscribe;
    }, [user]);

    // Function to update (used by App.tsx)
    const toggleCloudFavorite = useCallback(async (newFavorites: string[]) => {
        if (!user) return;
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, { favorites: newFavorites }, { merge: true });
        } catch (err) {
            console.error("Firebase Update Error:", err);
        }
    }, [user]);

    return { user, loading, toggleCloudFavorite };
}
