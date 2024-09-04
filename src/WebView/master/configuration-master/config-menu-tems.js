import Configuration from "../../../Form/reader-configuration/configuraiton/configuration";
import Network from "../../../Form/reader-configuration/network/network";
import Summary from "../../../Form/reader-configuration/summary/Summary";
import BatchingAndRetention from "./tabs-summary/batching-and-retention/batching-and-retention";
import Certificates from "./tabs-summary/certificates/Certificates";
import Connection from "./tabs-summary/connection/Connection";
import Topic from "./tabs-summary/topic/Topic";

export const ConfigmenuItems = [
    {
        label: 'Connection', //Status version region OS Timezone
        // value: '/forms/profile-settings',
        Screen : <Connection/>
    },
    {
        label: 'Topic',
        // value: '/forms/profile-settings',
        Screen : <Topic/>
    },
    {
        label: 'Certifaicates',
        // value: '/forms/profile-settings/profile',
        Screen : <Certificates/>
    },
    {
        label: 'Batching and Retention',
        Screen : <BatchingAndRetention/>
    },
   
  
];
