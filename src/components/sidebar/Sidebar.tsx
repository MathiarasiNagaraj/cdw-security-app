"use client";
import React, { useState } from 'react';
import {HiMiniBars3} from 'react-icons/hi2';
import { AiOutlineClose} from 'react-icons/ai';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { SIDEBAR_ROUTES, TOPBAR_ROUTE } from '../../constants/route-constants'
import { usePathname, useSearchParams } from 'next/navigation';
import withAuth from '@/hoc/withAuth';



const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false);
  const pathname = usePathname();

  const location = pathname.split('/')[1];
  const showSidebar = () => setSidebar(!sidebar);

  const sidebarClasses = [styles['sidebar-nav']];
  if (sidebar) {
    sidebarClasses.push(styles['active']);
  }
  const routes = SIDEBAR_ROUTES.map((route) => <Link href={`${route.url(location)}`} key={route.name} className={styles['nav-items']}>{ route.name}</Link>)

  return (
    <>

        <div className={styles['nav']}>
          <div className={styles['nav-icon']}>
            <HiMiniBars3 onClick={showSidebar} />
   
          </div>
        <h1>{''}</h1>
        </div>
    <div  className={styles['sidebarnav--wrapper']}>
        <nav  className={sidebarClasses.join(' ')} >
          <div className={styles['sidebar-wrapper']}>
            <div className={styles['text']}>
            <div  className={styles['nav-icon-close']}>
               <AiOutlineClose onClick={showSidebar} />
            </div>
            <Link href="/">
          <Image className={styles['logo']} src='/images/cdwLogoWhite.png' alt='cdw-logo' height='70' width='125' />
          
            </Link> 
            <h4>{location} OFFICE</h4>
            <div className={styles['nav-item-wrapper']}>
              {routes}
              </div>
              </div>
          </div>
        </nav>
        </div>

    </>
  );
};


export default Sidebar;