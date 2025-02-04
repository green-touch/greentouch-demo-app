import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { requestNotificationPermission } from '@_services/requestNotificationPermission';
import Header from '@_components/main/Header';
import WhiteBox from '@_layouts/WhiteBox';
import StatusBox from '@_components/main/StatusBox';
import CallButton from '@_components/main/CallButton';
import WelfareNew from '@_components/main/WelfareNew';

import { SampleHomeScreenProps } from '@_types/bottomBar';
import { useUserStateStore,UserState } from '@_store/userStateStore';
import { NativeModules, NativeEventEmitter } from 'react-native';


const { ForegroundServiceModule } = NativeModules;

function SampleHomeScreen({ navigation }: SampleHomeScreenProps): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');

  const {
    batteryStatus,
    screenStatus,
    networkConnected,
    screenOffDuration,
    userState,
    code,
    setBatteryStatus,
    setScreenStatus,
    setNetworkConnected,
    setScreenOffDuration,
    setUserState,
  } = useUserStateStore();

// Foreground Service 시작
useEffect(() => {
  const startForegroundService = async () => {
    try {
      await ForegroundServiceModule.startService();
      console.log('Foreground Service started');
    } catch (error) {
      console.error('Error starting service:', error);
    }
  };

  const stopForegroundService = async () => {
    try {
      await ForegroundServiceModule.stopService();
      console.log('Foreground Service stopped');
    } catch (error) {
      console.error('Error stopping service:', error);
    }
  };

  requestNotificationPermission(); // 알림 권한 요청
  startForegroundService();

  return () => {
    stopForegroundService();
  };
}, []);

// Foreground Service 이벤트 리스너 등록
useEffect(() => {
  const eventEmitter = new NativeEventEmitter(ForegroundServiceModule);
  const subscription = eventEmitter.addListener('UserStateUpdate', (data) => {
    console.log('상태 업데이트 이벤트 수신:', data);

    // Zustand 전역 상태 업데이트
    setBatteryStatus(
      data.batteryLevel ?? batteryStatus.level,
      data.isCharging ?? batteryStatus.isCharging
    );
    setScreenStatus(data.screenStatus ?? screenStatus);
    setNetworkConnected(data.networkStatus ?? networkConnected);
    setScreenOffDuration(data.screenOffDuration ?? screenOffDuration);
    setUserState(data.userState ?? userState, data.code ?? code);
  });
  
  
  return () => {
    subscription.remove();
  };
}, [setBatteryStatus, setScreenStatus, setNetworkConnected, setScreenOffDuration, setUserState]);



  return (
    <>
      <SafeAreaView className="flex-1 bg-gray5">
        <Header />
        <ScrollView>
          <WhiteBox styleName="mt-4 items-center">
            <View className="w-16 h-16 mb-4">
              <Image className="w-full h-full" source={require('../assets/images/img_user.png')} />
            </View>
            <Text className="text-xl mb-6">{name}</Text>
            <StatusBox code={code} batteryLevel={batteryStatus.level} networkConnected={networkConnected} userState={userState}></StatusBox>
            <CallButton />
            <Text className="text-gray50 mt-4">마지막 업데이트 : 2024.12.12 12:33</Text>
          </WhiteBox>
          <WhiteBox>
            <Text className="text-xl font-bold mb-6">복지관 소식</Text>
            <WelfareNew />
          </WhiteBox>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SampleHomeScreen;