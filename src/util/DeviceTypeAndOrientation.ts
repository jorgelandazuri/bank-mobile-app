import {Dimensions, ScaledSize} from 'react-native';

//https://shellmonger.com/2017/07/26/handling-orientation-changes-in-react-native/

const Device = require('react-native-device-detection');
export module DeviceTypeAndOrientation {

  /**
   * Returns true if the screen is in portrait mode
   */
  export function isPortrait(): boolean {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  /**
   * Returns true of the screen is in landscape mode
   */
  export function isLandscape(): boolean {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  }

  /**
   * Returns true if the device is a tablet
   */
  export function isTablet(): boolean {
    return Device.isTablet
  }

  /**
   * Returns true if the device is a phone
   */
  export function isPhone(): boolean {
    return !isTablet();
  }

}
