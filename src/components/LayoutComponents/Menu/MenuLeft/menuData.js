export default [
  {
    title: 'HOME',
    key: 'summary',
    children: [
      {
        title: 'MONITORING',
        key: 'MonitoringPage',
        url: '/home/plant',
        icon: 'icmn icmn-display',
      },
      {
        title: 'SUMMARY',
        key: 'summarypage',
        url: '/summary',
        icon: 'icmn icmn-stats-bars',
      },
    ],
  },
  {
    divider: true,
  },
  {
    title: 'SETTING',
    key: 'Settings',
    children: [
      {
        title: 'VMN SETTING',
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
    children: [
      {
        title: 'CONTROL',
        key: 'control',
        url: '/control/control',
        icon: 'icmn icmn-equalizer',
      },
      {
        title: 'PRE SETTING',
        key: 'pre-setting',
        url: '/control/preset',
        icon: 'icmn icmn-tree',
      }
    ],
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
