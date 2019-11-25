import React from 'react';
import { AdMobBanner } from 'expo-ads-admob';

type Props = {};
const BottomAd: React.FC<Props> = () => {
  let adMobId = 'ca-app-pub-5052932671243699/3901532438'; // prod id
  if (__DEV__) {
    let adMobId = 'ca-app-pub-3940256099942544/6300978111';
  }
  return (
    <AdMobBanner
      bannerSize='fullBanner'
      adUnitID={adMobId} // Test ID, Replace with your-admob-unit-id
      testDeviceID='EMULATOR'
      servePersonalizedAds // true or false
      onDidFailToReceiveAdWithError={this.bannerError}
    />
  );
};

export default BottomAd;
