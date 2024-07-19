import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const FormFieldMediaImage = ({value, onPress}) => {
    if (value != null){
        return (
            <View className="rounded-2xl mt-2 overflow-hidden w-full h-60 ">
                <Image 
                    source={{uri: value.uri}}
                    className="w-full h-full"
                    resizeMode='contain'
                />
            </View>
        );
    }else{
        return (
            <TouchableOpacity onPress={onPress} className=" justify-center items-center border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 flex-row mt-2">
                <Image 
                    source={icons.upload}
                    className="h-5 w-5"
                    resizeMode='contain'
                />
                <Text className="text-white font-pregular ml-2">Choose a file</Text>
            </TouchableOpacity>
        );
    }
}

const FormFieldMediaVideo = ({value, onPress}) => {
    const [play, setPlay] = useState(false);
    if (value != null){
        return (<View className="rounded-2xl mt-2 overflow-hidden w-full h-60">
            <Video 
                source={{uri: value.uri}}
                useNativeControls
                className="w-full h-full"
                resizeMode={ResizeMode.COVER}
                shouldPlay
                onPlaybackStatusUpdate={status => {
                    if (status.didJustFinish)
                        setPlay(false);
                }}
            />
        </View>);
    }else{
        return (
            <TouchableOpacity onPress={onPress} className=" justify-center items-center border-2 border-black-200 rounded-2xl w-full h-60 px-4 bg-black-100 flex-row mt-2">
                <View className="h-12 w-12 items-center justify-center border border-secondary border-dashed">
                    <Image 
                        source={icons.upload}
                        className="h-6 w-6"
                        resizeMode='contain'
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const FormFieldMedia = ({title, otherStyles, value, type, onPress}) => {
  
    return (
    <View className={`${otherStyles} py-2`}>
        <Text className="text-base text-green-100 font-pmedium">{title}</Text>
        {type == "video" ? <FormFieldMediaVideo value={value} onPress={onPress}/> : <FormFieldMediaImage onPress={onPress} value={value}/>}
    
    </View>
  )
}

export default FormFieldMedia