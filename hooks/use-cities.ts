import { useEffect, useState } from "react";

type UseCitiesResult = {
    cities: string[];
    loading: boolean;
    error: string | null;
};

export function useCities(countryName: string): UseCitiesResult {
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchCities() {
            if (!countryName) {
                setCities([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ country: countryName }),
                    }
                );

                if (!res.ok) {
                    throw new Error('Erreur HTTP');
                }

                const json = await res.json();

                if (cancelled) return;

                if (json.error) {
                    setError('Impossible de charger les villes.');
                    setCities([]);
                } else {
                    const list: string[] = json.data ?? [];
                    // On trie par ordre alphabétique
                    setCities(list.sort((a, b) => a.localeCompare(b)));
                }
            } catch (e) {
                console.error(e);
                if (!cancelled) {
                    setError('Erreur lors du chargement des villes.');
                    setCities([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchCities();

        return () => {
            cancelled = true;
        };
    }, [countryName]);

    return { cities, loading, error };
}