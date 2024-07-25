import { View, Text } from "react-native";
import React from "react";

interface IInfoBox {
  title?: string;
  subtitle?: string;
  containerStyles?: string;
  textStyles?: string;
}

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  textStyles,
}: IInfoBox) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${textStyles}`}>
        {title}
      </Text>
      <Text className={`text-sm text-gray-100 font-pregular text-center`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
