import React, { useEffect } from 'react'
import PageHeader from '../../../shared/page-header'
import AddReaderMaster from '../../../Form/master/reader-master/add-reader-master'
import { useModal } from '../../../shared/modal-views/use-modal';
import { ReaderHealthData } from '../../../dummyData/reader-health-data';
import ReaderHealthCard from './reader-health-card';
import { HitApi } from '../../../Store/Action/Api/ApiAction';

export default function ReaderHealthMaster() {
  const { openModal, closeModal } = useModal();

useEffect(()=>{
  let json = {}

  // HitApi(json)

},[])

  return (
    <div>
      <PageHeader btnText={'Add Reader'} children={<AddReaderMaster closeModal={closeModal} />} title={'Add Reader'} titleClass={'text-center'} customSize={700} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          ReaderHealthData?.map((data,index)=>{
            return(
              <div key={index}> 
               <ReaderHealthCard data={data}/>
              </div>
            )
          })
        }
       
      </div>

    </div>
  )
}
