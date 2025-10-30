export const isApple: () => boolean = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod') || ua.includes('mac')
  }
  
  export const ScooterAndroidUrl = 'https://github.com/kingston-developer/interbrasApps/raw/main/scooter-interbras.apk'
  export const ScooterIosUrl = 'https://apps.apple.com/es/app/id1509887773'

  export const scooterLenzod = {
    android: 'https://play.google.com/store/apps/details?id=com.lenzod.scooter',
    ios: 'https://apps.apple.com/cn/app/lenzod-pro/id1556363401'
  }
  
  export const scooterTitanAndXtremeUrls = {
    android: 'https://play.google.com/store/apps/details?id=com.loby.balance.car.google&hl=pt',
    ios: 'https://apps.apple.com/br/app/minirobot/id1098535221'
  }

  export const airesAcondicionadosUrls = {
    android: 'https://play.google.com/store/apps/details?id=com.tuya.smart',
    ios: 'https://apps.apple.com/us/app/tuya-smart-life-smart-living/id1034649547'
  }