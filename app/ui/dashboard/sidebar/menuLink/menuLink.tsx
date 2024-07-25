"use client"

import Link from 'next/link'
import React from 'react'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation';


interface menuLinkProps{
    path: string;
    icon: React.ReactNode;
    title: string;
}

const menuLink: React.FC<menuLinkProps> = ({path, icon, title})  => {

const pathname = usePathname();

  return (
    <Link href={path} className={`${styles.container} ${pathname === path && styles.active}`}>
        {icon}
        {title}
    </Link>
  )
}

export default menuLink
