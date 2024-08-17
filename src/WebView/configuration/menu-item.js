import MQTT from "../../Form/reader-configuration/MQTT";

export const menuItems = [
    {
        label: 'Summary', //Status version region OS Timezone
        value: '/forms/profile-settings',
        Screen : <MQTT/>
    },
    {
        label: 'Configuration',
        value: '/forms/profile-settings',
        Screen : <MQTT/>
    },
    {
        label: 'Network',
        value: '/forms/profile-settings/profile',
    },
    {
        label: 'NTP',
        value: '/forms/profile-settings/password',
    },
    {
        label: 'Status',
        value: '/forms/profile-settings/team',
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
    },
    {
        label: 'Reboot',
        value: '/forms/profile-settings/integration',
    },
];
