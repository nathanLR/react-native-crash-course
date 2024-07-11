import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

const FormField = ({title, value, handleChangeText, otherStyles, keyboardType, placeholder}) => {
  
  const [showPassword, setShowPassword] = useState(false);

    return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className="text-base text-green-100 font-pmedium">{title}</Text>
        <View className="items-center border-2 border-black-200 rounded-2xl focus:border-secondary w-full h-16 px-4 bg-black-100 flex-row">
            <TextInput 
                className="flex-1 text-white font-psemibold text-base w-full"
                value={value}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={keyboardType == "password" && !showPassword}
            />
            {
                keyboardType == "password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className="w-6 h-6"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    </View>
  )
}

export default FormField