"use client";
import withAuth from '@/hoc/withAuth'
import Image from 'next/image'
import React from 'react'
import { LocationContainer } from '../../components/locationContainer/LocationContainer'
import styles from './LocationContainer.module.scss';
const Locations = () => {

  return (
      <div className={styles['location-wrapper']}>
          <Image src="/images/cdwLogo.png" alt="cdw-logo" width="132" height="73"/>
          <LocationContainer/>
    </div>
  )
}
export default withAuth(Locations);