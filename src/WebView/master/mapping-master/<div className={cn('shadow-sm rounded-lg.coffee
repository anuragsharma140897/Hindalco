<div className={cn('shadow-sm rounded-lg flex items-center justify-between group-hover:cursor-pointer', ele?.id === reduxMappingMaster?.mappingJson?.selectedReaderID ? 'bg-red-lighter text-red-main font-bold tracking-wider border border-red-main' : 'bg-white ')}>
          <div className='flex justify-between items-center'>
            <label className='group-hover:cursor-pointer'><FaAngleRight /></label>
            <label className='group-hover:cursor-pointer'>Reader : {ele?.placementName}</label>
          </div>
          <div className='border bg-red-main p-1 rounded-lg text-white' onClick={() => handleRemove(ele)}>
            <label className='group-hover:cursor-pointer'><FaTimes /></label>
          </div>
        </div>
        <label className='group-hover:cursor-pointer'>{ele?.id}</label>