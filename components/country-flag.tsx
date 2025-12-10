import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
    countryCode?: string;   // ex: "FR"
    countryName: string;    // ex: "France"
    size?: number;
}

/**
 * Affiche le drapeau d'un pays si on a un code ISO2.
 * Sinon, affiche un petit rond avec les initiales du pays.
 * 
 * Pour le drapeau, on utilise flagsapi.com :
 *  https://flagsapi.com/FR/flat/64.png
 */
export function CountryFlag({ countryCode, countryName, size = 40 }: Props) {
    if (!countryCode) {
        const initial = countryName.charAt(0).toUpperCase() || "?";

        return (
            <View
                style={[
                    styles.placeholder,
                    { width: size, height: size, borderRadius: size / 2 },
                ]}
            >
                <ThemedText style={styles.placeholderText}>{initial}</ThemedText>
            </View>
        );
    }

    const url = `https://flagsapi.com/${countryCode}/flat/64.png`;

    return (
        <Image
            source={{ uri: url }}
            style={{ width: size, height: size, borderRadius: 8 }}
            resizeMode="cover"
        />
    );
}

const styles = StyleSheet.create({
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#4B5563",
        backgroundColor: "#111827",
    },
    placeholderText: {
        fontSize: 14,
    },
});