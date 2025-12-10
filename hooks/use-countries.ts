import { useEffect, useState } from "react";

export type CountryOption = {
    name: string;   // name.common en anglais
    code: string;   // cca2 (FR, JP, etc.)
};

type UseCountriesResult = {
    countries: CountryOption[];
    loading: boolean;
    error: string | null;
}

export function useCountries(): UseCountriesResult {
    const [countries, setCountries] = useState<CountryOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchCountries() {
            try {
                setLoading(true);
                setError(null);

                // On ne garde que ce qui nous intéresse
                const res = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,cca2'
                );
                if (!res.ok) {
                    throw new Error('Erreur lors du chargement des pays');
                }

                type RestCountry = {
                    name: { common: string };
                    cca2: string;
                };

                const data: RestCountry[] = await res.json();

                if (cancelled) return;

                const mapped: CountryOption[] = data
                    .filter((c) => c.name?.common && c.cca2)
                    .map((c) => ({
                        name: c.name.common,
                        code: c.cca2,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                setCountries(mapped);
            } catch (e) {
                console.error(e);
                if (!cancelled) {
                    setError('Impossible de charger la liste des pays.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchCountries();

        return () => {
            cancelled = true;
        };
    }, []);

    return { countries, loading, error };
}