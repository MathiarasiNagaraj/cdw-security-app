
'use client';
import Loader from '@/components/loader/Loader';
import withAuth from '@/hoc/withAuth';
import { getRecordByBranchAndDate, getRecordByBranchAndDateAndEmpID } from '@/services/record';
import { getCurrentDate } from '@/utils/common-utils';
import { usePathname, useSearchParams } from 'next/navigation';
import React,{useState,useEffect} from 'react'
import  RecordPagination  from '../../components/recordPagination/RecordPagination'
import styles from './ViewRecordsContainer.module.scss'
 const ViewRecordsContainer = () => {

    const [data, setData] = useState<string[][]>([]);
   const pathname = usePathname();

    const [date,setDate] = useState(getCurrentDate());

   const [isLoading, setIsLoading] = useState(true);
   const searchParams = useSearchParams();
   const branch = pathname.split('/')[1];
    useEffect(() => {
      const getData = async () => {
      
       
        if (branch) {
          const data = await getRecordByBranchAndDate(branch, date);
          
          setData(data);
          setIsLoading(false);
  
        }
      }
      getData();
    }, [branch]);
    const onDataFilterHandler = async(data) => {

      setIsLoading(true);
      if (branch) {
        setDate(data.date)

        const filterdata = await getRecordByBranchAndDateAndEmpID(branch, data.date, data.id);
       
        setData(filterdata);
        setIsLoading(false);
      }
      
    }  
  return (
    <div className={` ${styles['temperature-wrapper']}`}>
    {isLoading ? <Loader /> :
      <RecordPagination records={data} setFilteredData={onDataFilterHandler} date={date} />}
    </div>
  )
}

export default withAuth(ViewRecordsContainer);