export default [
  {
    title: 'MONITORING',
    key: 'MonitoringPage',
    url: '/home/plant',
    icon: 'icmn icmn-display',
  },
  {
    divider: true,
  },
  {
    title: 'SETTING',
    key: 'Settings',
    children: [
      {
        title: 'NVM SETTING',
        key: 'nvm-setting',
        url: '/setting/nvm-setting',
        icon: 'icmn icmn-cogs',
      },
      {
        title: 'WIFI',
        key: 'wifi',
        url: '/setting/wifi/station',
        icon: 'icmn icmn-connection',
      },
      {
        title: 'DATE & TIME',
        key: 'datentime',
        url: '/setting/datetime',
        icon: 'icmn icmn-calendar',
      },
    ],
  },
  {
    title: 'CONTROL',
    key: 'ControlPage',
    url: '/home/plant',
    icon: 'icmn icmn-equalizer',
  },
  {
    divider: true,
  },
  {
    title: 'DATA LOGGER',
    key: 'DataLoggerPage',
    url: '/datalogger',
    icon: 'icmn icmn-database',
  },
]
