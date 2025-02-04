import React from 'react';
import { View, Text } from 'react-native';

import { FamilyInfo } from '@_types/familyInfo';

function FamilyInfoBox({ name, relationship, phoneNumber }: FamilyInfo): React.JSX.Element {
  return (
    <View className="flex-row rounded-lg py-4 px-2 w-full justify-between items-center">
      <View className="flex-row items-center flex-1">
        <Text 
          className="text-lg font-bold text-gray100 mr-2 w-1/3"
          numberOfLines={1}
          ellipsizeMode="clip"
        >
          {name}
        </Text>
        <Text 
          className="text-base text-gray50 w-2/3 truncate"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {relationship}
        </Text>
      </View>
      <View className="w-1/3">
        <Text className="text-lg text-center text-gray100">{phoneNumber}</Text>
      </View>
    </View>
  );
}

export default FamilyInfoBox;
