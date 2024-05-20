export const CompileRoadData = (data, pagination) =>{
    return new Promise((resolve, reject)=>{
        var tp = data
        tp?.docs?.map((ele, index) => {
            var ommasLen = ele?.ommas?.length
            var tempOmmasData = ele?.ommas
            if(index===0){
                var workName = [...new Set(tempOmmasData?.map((x, index)=>Object.assign({y:x.ACTIVITY_NAME, index:index, x:x})))]
                Object.assign(ele, {workName:workName})
            }
            tempOmmasData.map((innerEle, index)=>Object.assign(innerEle,{index:index+1}))
            Object.assign(ele, {
                // index: GetPageCount(pagination?.limit, pagination?.page, index),
                DeviceStatus: ele?.devices?.length ? 'Device Installed' : 'No Device Found',
                // DeviceStatusClass: ele?.devices?.length ? SuccessBg : ErrorBg,
                KMLStatus: ele?.mapData?.length ? 'KML Data Found' : 'No KML Data',
                // KMLStatusClass: ele?.mapData?.length ? SuccessBg : ErrorBg,
                // ommas details 
                CONTRACTOR_NAME: tempOmmasData?.[ommasLen - 1]?.CONTRACTOR_NAME,
                ACTIVITY_NAME: tempOmmasData?.[ommasLen - 1]?.ACTIVITY_NAME,
                PIU_NAME: tempOmmasData?.[ommasLen - 1]?.PIU_NAME,
                SANCTION_DATE : tempOmmasData?.[ommasLen - 1]?.SANCTION_DATE,
                ACTIVITY_COMPLETION_DATE : tempOmmasData?.[ommasLen - 1]?.ACTIVITY_COMPLETION_DATE,
                ACTIVITY_QUANTITY: tempOmmasData?.[ommasLen - 1]?.ACTIVITY_QUANTITY,
                ACTIVITY_START_DATE: tempOmmasData?.[ommasLen - 1]?.ACTIVITY_START_DATE,
                ACTUAL_ACTIVITY_COMPLETION_DATE: tempOmmasData?.[ommasLen - 1]?.ACTUAL_ACTIVITY_COMPLETION_DATE,
                ACTUAL_ACTIVITY_START_DATE:tempOmmasData?.[ommasLen - 1]?.ACTUAL_ACTIVITY_START_DATE ,
                AWARD_DATE: tempOmmasData?.[ommasLen - 1]?.AWARD_DATE,
                COMPLETED_ROAD_LENGTH: tempOmmasData?.[ommasLen - 1]?.COMPLETED_ROAD_LENGTH,
                COMPLETION_DATE:tempOmmasData?.[ommasLen - 1]?.COMPLETION_DATE,
                DISTRICT_NAME: tempOmmasData?.[ommasLen - 1]?.DISTRICT_NAME,
                EXECUTED_QUANTITY: tempOmmasData?.[ommasLen - 1]?.EXECUTED_QUANTITY,
                PACKAGE_No: tempOmmasData?.[ommasLen - 1]?.PACKAGE_No,
                PMIS_FINALIZE_DATE: tempOmmasData?.[ommasLen - 1]?.PMIS_FINALIZE_DATE,
                ROAD_NAME: tempOmmasData?.[ommasLen - 1]?.ROAD_NAME,
                Road_Code: tempOmmasData?.[ommasLen - 1]?.Road_Code,
                SANCTION_LENGTH: tempOmmasData?.[ommasLen - 1]?.SANCTION_LENGTH,
            })
        })
        resolve(tp)
    })
}