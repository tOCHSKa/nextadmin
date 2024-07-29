"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface placeholder {
    placeholder: string;
}
const Search: React.FC<placeholder> = ({ placeholder }) => {

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Search;