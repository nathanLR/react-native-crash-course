import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router';

const SearchInput = ({initialQuery}) => {
    const [query, setQuery] = useState(initialQuery || '');
    const pathname = usePathname();
    const search = () => {
        if (query){
            if (pathname.startsWith("/search"))
                router.setParams({query});
            else
                router.push(`/search/${query}`)
        }
    }
  return (
    <View className="items-center border-2 border-black-200 focus:border-secondary rounded-2xl w-full h-16 px-4 bg-black-100 flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base w-full"
            keyboardType='default'
            onChangeText={(e) => setQuery(e)}
            placeholder='Search for a video topic'
            placeholderTextColor="#7b7b8b"
            value={query}
        />
        <TouchableOpacity onPress={search}>
            <Image 
                source={icons.search}
                className="w-6 h-6"
                resizeMode='contain'
            /> 
        </TouchableOpacity>
        
    </View>
  )
}

export default SearchInput