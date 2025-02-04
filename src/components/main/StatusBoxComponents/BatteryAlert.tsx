import React from 'react';
import { View, Text } from 'react-native';

import SvgIcon from '@_components/SvgIcon';
import { StatusBatteryAlertProps } from '@_types/statusBox';


function BatteryAlert({ icon, title, description }: StatusBatteryAlertProps): React.JSX.Element {
  return (
    <View className="flex-1 items-center justify-center w-full bg-gray5 mx-auto mb-8 px-3 py-4 rounded-lg">
      <View className="w-8 h-8 mb-4">
        <SvgIcon name={icon} size={32} />
      </View>
      <Text className="text-xl font-bold text-red800 mb-2 text-center">{title}</Text>
      <Text className="text-lg text-gray100 text-center">{description}</Text>
    </View>
  );
}

export default BatteryAlert;
