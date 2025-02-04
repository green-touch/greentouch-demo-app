import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';

import { MyInfoScreenProps } from '@_types/bottomBar';

import SvgIcon from '@_components/SvgIcon';
import WhiteBox from '@_layouts/WhiteBox';
import MyInfoWhiteBox from '@_components/myInfo/MyInfoWhiteBox';
import FamilyInfoBox from '@_components/myInfo/FamilyInfoBox';

import { FamilyInfo } from '@_types/familyInfo';
import PlatformSpecificButton from '@_components/PlatformSpecificButton';

function MyInfoScreen({ navigation }: MyInfoScreenProps): React.JSX.Element {
  const [name, setName] = useState<string>('홍길동');
  const [welfareName, setWelfareName] = useState<string>('행복 복지관');
  const [address, setAddress] = useState<string>(
    `서울특별시 종로구 세종대로 23길 \n 희망아파트 A동 B호`,
  );
  const [phoneNumber, setPhoneNumber] = useState<string>('010-1234-5678');
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo[]>([
    {
      name: '박준혁',
      relationship: 'PM',
      phoneNumber: '010-1234-5678',
    },
    {
      name: '박진하',
      relationship: 'ReactNative',
      phoneNumber: '010-1234-5678',
    },
    {
      name: '조나은',
      relationship: 'Kotlin',
      phoneNumber: '010-1234-5678',
    },
    {
      name: '선우용여',
      relationship: '우주킹킹킹킹킹킹킹킹',
      phoneNumber: '010-1234-5678',
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-gray5">
      <ScrollView>
        <View className="w-full bg-gray0 px-4 py-6 flex-row">
          <View className="w-1/5 mr-3 items-center justify-center">
            <Image
              className="w-16 h-16 rounded-full"
              source={require('@_assets/images/img_user.png')}
            />
          </View>
          <View className="justify-center w-4/5">
            <Text className="text-xl mb-1 text-gray100">{name}</Text>
            <View className="flex-row">
              <SvgIcon name="MapFilled" size={18} />
              <Text className="text-gray70 font-bold text-sm ml-1">{welfareName}</Text>
              <Text className="text-gray70 text-sm"> 소속</Text>
            </View>
          </View>
        </View>
        <MyInfoWhiteBox title="거주지" content={address} styleName="mt-4" />
        <MyInfoWhiteBox title="전화번호" content={phoneNumber} />
        <WhiteBox>
          <Text className="font-bold text-xl mb-5 text-gray100">나의 비상연락망</Text>
          <View className="gap-y-4">
            {familyInfo.map((family, index) => (
              <FamilyInfoBox
                key={index}
                name={family.name}
                relationship={family.relationship}
                phoneNumber={family.phoneNumber}
              />
            ))}
          </View>
        </WhiteBox>
        <PlatformSpecificButton onPress={() => console.log('로그아웃하기')}>
          <View className="w-20 mb-4 justify-center items-center mx-auto">
            <Text className="text-sm text-gray50 text-center">로그아웃하기</Text>
          </View>
        </PlatformSpecificButton>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyInfoScreen;
