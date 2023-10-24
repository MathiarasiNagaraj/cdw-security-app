"use client";
import React, { useState } from 'react';
import {HiMiniBars3} from 'react-icons/hi2';
import { AiOutlineClose} from 'react-icons/ai';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { SIDEBAR_ROUTES, TOPBAR_ROUTE } from '../../constants/route-constants'
import { usePathname } from 'next/navigation';
import withAuth from '@/hoc/withAuth';
import { useRecoilState } from "recoil";
import { filterSidebar, sidebars } from "@/state/atom/Record";


const Sidebar = () => {

  const [sidebar, setSidebar] = useState(false);
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebars);
  const [isFilterOpen, setFilterOpen] = useRecoilState(filterSidebar);
  const paths = pathname.split('/');
  const location = paths[1];
  const route = paths[paths.length - 1];

  const topbar = TOPBAR_ROUTE(route);
  const showSidebar = () => {
    setSidebar(true);
    setFilterOpen(false);
}
  const sidebarClasses = [styles['sidebar-nav']];
  if (sidebar) {
    sidebarClasses.push(styles['active']);
    //setSidebarOpen(true);
  
  }

  if (isFilterOpen) {
    const index = sidebarClasses.indexOf(styles["active"]);
    if (index !== -1) {
      sidebarClasses.splice(index, 1);
    }
}
  const closeSidebar = () => {
    setSidebar(false);
   // setSidebarOpen(false);
 }

  const routes = SIDEBAR_ROUTES.map((route) => <Link href={`${route.url(location)}`} key={route.name} className={styles['nav-items']} onClick={closeSidebar} >{ route.name}</Link>)

  return (
    <>

        <div className={styles['nav']}>
          <div className={styles['nav-icon']}>
           <span onClick={showSidebar}> <HiMiniBars3  /> </span> 
   
          </div>
        <h1>{topbar}</h1>
        </div>
    <div  className={styles['sidebarnav--wrapper']}>
        <nav  className={sidebarClasses.join(' ')} >
          <div className={styles['sidebar-wrapper']}>
            <div className={styles['text']}>
            <div  className={styles['nav-icon-close']}>
            <span onClick={closeSidebar}>  <AiOutlineClose  /></span>  
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


export default withAuth(Sidebar);