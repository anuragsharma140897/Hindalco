export const CompileModeForApiJson = (data) => {
    return new Promise((resolve, reject) => {
        const ANTENNA = data?.tagMetaData?.includes("ANTENNA");
        const RSSI = data?.tagMetaData?.includes("RSSI");
        const CHANNEL = data?.tagMetaData?.includes("CHANNEL");
        const SEEN_COUNT = data?.tagMetaData?.includes("SEEN_COUNT");

        const objectIndex = data?.tagMetaData?.findIndex(item =>
            typeof item === 'object' && item !== null && 'userDefined' in item
        );

        var json = {
            match: data?.filter?.match,
            operation: data?.filter?.operation,
            value: data?.filter?.value,
            modeSpecificUnit: data?.modeSpecificSettings?.interval?.unit,
            modeSpecificvalue: data?.modeSpecificSettings?.interval?.value,
            ANTENNA: ANTENNA,
            RSSI: RSSI,
            CHANNEL: CHANNEL,
            SEEN_COUNT: SEEN_COUNT,
            userDefined: data?.tagMetaData?.[objectIndex]?.userDefined,
            type: data?.type
        }
        resolve(json)
    })
}


export const CompileModeForUpdate = (data) => {
    return new Promise((resolve, reject) => {
        const ANTENNA = data?.ANTENNA
        const RSSI =  data?.RSSI
        const CHANNEL =  data?.CHANNEL
        const SEEN_COUNT =  data?.SEEN_COUNT

        var tagMetaData = []

        if(ANTENNA){
            tagMetaData.push("ANTENNA")
        }
        if(RSSI){
            tagMetaData.push("RSSI")
        }
        if(CHANNEL){
            tagMetaData.push("CHANNEL")
        }
        if(SEEN_COUNT){
            tagMetaData.push("SEEN_COUNT")
        }
        if(data?.userDefined){
            tagMetaData.push({userDefined:data.userDefined})
        }
        else{
            tagMetaData.push({userDefined:""})
        }


        var json = {
            filter:{match:data.match,operation:data?.operation,value:data?.value,},
            modeSpecificSettings:{interval:{unit:data?.modeSpecificUnit,value:parseInt(data?.modeSpecificvalue)}},
            tagMetaData : tagMetaData,
            type: data?.type
        }
        resolve(json)
    })
}