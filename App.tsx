/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import './src/styles/global.css';
import tw from 'tailwind-react-native-classnames';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Netinfo, { useNetInfo } from "@react-native-community/netinfo";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={tw`text-3xl font-black text-red-600`}>{title}</Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const { ScreenReceiverModule ,BatteryModule} = NativeModules;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [screenStatus, setScreenStatus] = useState<string | null>(null);
  const [batteryLevel, setBatteryLevel]= useState<string | null>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const netinfo=useNetInfo();

  useEffect(() => {
    const checkScreenStatus = async () => {
      try {
        const isScreenOnNative = await ScreenReceiverModule.isScreenOn();
        console.log(isScreenOnNative);
        setScreenStatus(isScreenOnNative ? 'ON' : 'OFF');
      } catch (error) {
        console.error('Error checking screen status:', error);
        setScreenStatus('Error');
      }
    };

    checkScreenStatus();

    // 주기적으로 화면 상태를 확인
    const interval = setInterval(() => {
      checkScreenStatus();
    }, 10000); // 10초 간격

    return () => clearInterval(interval);
  }, []);


  
   // 배터리 퍼센트 가져오기
   useEffect(() => {
    const fetchBatteryLevel = async () => {
      try {
        const level = await BatteryModule.getBatteryLevel();
        setBatteryLevel(`${level.toFixed(0)}%`);
      } catch (error) {
        console.error('Error fetching battery level:', error);
        setBatteryLevel('Error');
      }
    };

    fetchBatteryLevel();
    const interval = setInterval(fetchBatteryLevel, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit{' '}
            <Text
              style={tw`
              font-bold
              text-blue-600
            `}>
              App.tsx, Ap
            </Text>{' '}
            to change this screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">Read the docs to discover what to do next:</Section>
          <Section title="Battery Level Test">
          {batteryLevel ? (
            <Text style={tw`text-xl font-bold text-green-600`}>
              Battery Level: {batteryLevel}
            </Text>
          ) : (
            <Text style={tw`text-xl text-red-600`}>Loading battery level...</Text>
          )}
        </Section>
        
        <Section title="Network Status Test"> 
            {netinfo ? (
              <>
                <Text style={tw`text-lg`}>
                  Type: {netinfo.type}
                </Text>
                <Text style={tw`text-lg`}>
                  , Connected: {netinfo.isConnected ? 'Connecting...' : 'DisConnecting...'}
                </Text>
              </>
            ) : (
              <Text style={tw`text-lg text-red-600`}>Checking network status...</Text>
            )}
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
