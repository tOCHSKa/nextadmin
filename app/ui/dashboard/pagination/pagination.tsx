"use client"

import React from 'react'
import styles from './pagination.module.css'
import { usePathname, useRouter, useSearchParams } from "next/navigation";  // Hooks Next.js pour la navigation et les paramètres d'URL.

interface countProps {
    count: number;
}
const pagination: React.FC<countProps> = ({count}) => {

    const searchParams = useSearchParams();  // Hook pour obtenir les paramètres actuels de l'URL.
    const { replace } = useRouter();  // Hook pour effectuer des remplacements dans l'historique de navigation.
    const pathname = usePathname();  // Hook pour obtenir le chemin d'accès actuel.

    const page = parseInt(searchParams.get("page") || "1", 10);
    const ITEM_PER_PAGE = 6

    // Calcul des pages totale disponible
    const totalPages = Math.ceil(count / ITEM_PER_PAGE);

    // Vérifiez si la page précédente et la page suivante existent
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    // Fonction pour changer de page
    const handleChangePage = (type: string) => {
        // Mise à jour du paramètre de page dans l'URL
        const newPage = type === "prev" ? page - 1 : page + 1;
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());  // Mise à jour du paramètre "page"
        replace(`${pathname}?${params}`);
    };

    return (
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasPrev} onClick={ () => handleChangePage("prev") }>Previous</button>
            <button className={styles.button}disabled={!hasNext} onClick={ () => handleChangePage("next") }>Next</button>
        </div>
    )
}

export default pagination