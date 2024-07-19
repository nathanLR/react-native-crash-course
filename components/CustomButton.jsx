import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  if (isLoading){
    return (
      <View
        className={`
          ${containerStyles}
          bg-secondary
          rounded-xl
          min-h-[62px]
          justify-center
          items-center
        `}
      >
        <ActivityIndicator/>
      </View>
      
    );
  } else {
  
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`
            ${containerStyles}
            bg-secondary
            rounded-xl
            min-h-[62px]
            justify-center
            items-center
        `}
    >
      <Text className={`${textStyles} text-primary font-psemibold text-lg`}>{title}</Text>
    </TouchableOpacity>
  )
} 
}

export default CustomButton