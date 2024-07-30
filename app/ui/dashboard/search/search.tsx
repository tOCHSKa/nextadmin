"use client";  // Directive Next.js indiquant que ce fichier est destiné au rendu côté client.

import { MdSearch } from "react-icons/md";  // Importation de l'icône de recherche depuis react-icons.
import styles from "./search.module.css";  // Importation des styles spécifiques à ce composant.
import { usePathname, useRouter, useSearchParams } from "next/navigation";  // Hooks Next.js pour la navigation et les paramètres d'URL.
import { useDebouncedCallback } from "use-debounce";  // Importation de useDebouncedCallback pour la gestion des callbacks différés.

interface PlaceholderProps {
  placeholder: string;  // Définition de l'interface pour les props du composant, ici un placeholder de type string.
}

// Déclaration du composant Search en tant que composant fonctionnel React.
const Search: React.FC<PlaceholderProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();  // Hook pour obtenir les paramètres actuels de l'URL.
  const { replace } = useRouter();  // Hook pour effectuer des remplacements dans l'historique de navigation.
  const pathname = usePathname();  // Hook pour obtenir le chemin d'accès actuel.

  // Utilisation de useDebouncedCallback pour différer l'exécution de handleSearch de 300ms.
  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);  // Création d'une instance URLSearchParams à partir des paramètres actuels.
    const searchValue = e.target.value.trim();  // Récupération et suppression des espaces en début et fin de la valeur entrée par l'utilisateur.


    params.set("page", "1")

    if (searchValue.length > 2) {  // Si la longueur de la valeur de recherche est supérieure à 2 caractères.
      params.set("q", searchValue);  // Mise à jour du paramètre "q" avec la nouvelle valeur de recherche.
    } else {
      params.delete("q");  // Suppression du paramètre "q" si la longueur de la valeur de recherche est inférieure ou égale à 2 caractères.
    }

    replace(`${pathname}?${params}`);  // Remplacement de l'URL actuelle avec les nouveaux paramètres.
  }, 300);  // Délai de 300ms avant l'exécution de handleSearch.

  return (
    <div className={styles.container}>
      <MdSearch />  
      <input
        type="text"
        placeholder={placeholder}  // Placeholder passé en props.
        className={styles.input}  // Style appliqué à l'input.
        onChange={handleSearch}  // Déclenchement de handleSearch à chaque changement de valeur dans l'input.
      />
    </div>
  );
};

export default Search;  // Exportation du composant Search par défaut.
