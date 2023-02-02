import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../../components/AppHeader';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Colors} from '../../consts/Colors';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {WALLET_ACTIONS} from '../../redux/actionTypes';

const ImportFromQR: React.FC<{navigation: any}> = ({navigation}) => {
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [detectedBarcode, setDetectedBarcode] = useState('');
  const devices = useCameraDevices();
  const device = devices.back;

  const dispatch = useDispatch();

  const canUseCamera =
    device != null && hasCameraPermission && !detectedBarcode;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasCameraPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    if (barcodes.length > 0) {
      const detectedBarcodeArr = (barcodes[0]?.content?.data ?? '')
        .toString()
        .split(' ');

      if (detectedBarcodeArr.length === 12) {
        setDetectedBarcode(detectedBarcodeArr.toString());
        dispatch({
          type: WALLET_ACTIONS.SET_WALLET_PHRASE,
          payload: detectedBarcodeArr,
        });
        return;
      }
    }
  }, [barcodes, barcodes.length, navigation]);

  return (
    <View style={styles.container}>
      <AppHeader onPressBack={() => navigation.goBack()}>
        Import by QR Scan
      </AppHeader>
      <View style={styles.cameraContainer}>
        {canUseCamera && (
          <View style={{flex: 0.5}}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
            />
          </View>
        )}
        {!canUseCamera && !detectedBarcode && (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.light, marginBottom: -16}}>
              Camera Loading...
            </Text>
            <LottieView
              style={{width: 130}}
              source={require('../../assets/lottie/loading.json')}
              autoPlay
              loop
            />
          </View>
        )}
        {detectedBarcode && (
          <View style={{alignItems: 'center'}}>
            <LottieView
              style={{width: 130}}
              speed={0.7}
              source={require('../../assets/lottie/success.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() =>
                setTimeout(() => navigation.navigate('Wallet'), 500)
              }
            />
            <Text
              style={{color: Colors.light, fontWeight: '700', fontSize: 18}}>
              Seed Phrade Detected... Please wait...
            </Text>
            <View style={styles.seedContainer}>
              <Text style={styles.seedText}>{detectedBarcode}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor2,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  cameraContainer: {flex: 1, marginTop: 10, justifyContent: 'center'},
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  seedContainer: {marginVertical: 8, paddingHorizontal: 40},
  seedText: {
    fontSize: 12,
    color: Colors.light,
    textAlign: 'center',
  },
});

export default ImportFromQR;
