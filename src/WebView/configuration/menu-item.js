import MQTT from "../../Form/reader-configuration/MQTT";
import Configuration from "../../Form/reader-configuration/configuraiton/configuration";
import Mode from "../../Form/reader-configuration/mode/mode";
import Network from "../../Form/reader-configuration/network/network";
import Summary from "../../Form/reader-configuration/summary/Summary";

export const menuItems = [
    {
        label: 'Summary', //Status version region OS Timezone
        value: '/forms/profile-settings',
        Screen : <Summary/>
    },
    {
        label: 'Configuration',
        value: '/forms/profile-settings',
        Screen : <Configuration/>
    },
    {
        label: 'Network',
        value: '/forms/profile-settings/profile',
        Screen : <Network/>
    },
    {
        label: 'NTP',
        value: '/forms/profile-settings/password',
    },
    {
        label: 'Logs', // Logs, RC Logs
        value: '/forms/profile-settings/billing',
    },
    {
        label: 'Certificates',
        value: '/forms/profile-settings/notification',
    },
    {
        label: 'Mode',
        value: '/forms/profile-settings/integration',
        Screen : <Mode/>
    },
];
