import React from 'react'
import PageHeader from '../../../shared/page-header'
import AddReaderMaster from '../../../Form/master/reader-master/add-reader-master'
import { useModal } from '../../../shared/modal-views/use-modal';
import { ReaderHealthData } from '../../../dummyData/reader-health-data';
import ReaderHealthCard from './reader-health-card';

export default function ReaderHealthMaster() {
  const { openModal, closeModal } = useModal();

  return (
    <div>
      <PageHeader metaTitle={'Reader Health'} btnText={'Add Reader'} children={<AddReaderMaster closeModal={closeModal} />} title={'Add Reader'} titleClass={'text-center'} customSize={700} />
      <div className='grid grid-cols-3 gap-4'>
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
