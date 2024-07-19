import { View, Text, Image, Touchable, TouchableOpacity, Modal } from 'react-native'
import { icons } from '../constants';
import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({videos}) => {
  const {title, thumbnail, video, users} = videos;
  const {username, avatar} = users;
  const [play, setPlay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const openOption = () => {
    setModalVisible(true);
  }
  return (
    <View className="flex-col items-center px-4 mb-14">
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="w-full h-full px-4 justify-center items-center">
          <View className="bg-primary border-2 border-black-200 justify-center items-center w-full h-20">
            <Text className="text-white font-pmedium text-lg">bonjour</Text>
          </View>

        </View>
      </Modal>
      <View className="flex-row gap-3 items-center">
        <View className="justify-center  flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg p-0.5">
            <Image source={{uri: avatar}} className="h-full w-full rounded-lg" resizeMode='cover'/>
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
          </View>
        </View>
        <TouchableOpacity className="pt-2 " onPress={openOption}>
          <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      {play ? (
        <View className="w-full h-60 rounded-xl overflow-hidden mt-3">
          <Video 
            source={{uri: video}}
            useNativeControls={true}
            resizeMode={ResizeMode.COVER}
            className="h-full w-full"
            shouldPlay
            onPlaybackStatusUpdate={status => {
              if (status.didJustFinish)
                setPlay(false);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl overflow-hidden mt-3 relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image 
            source={{uri: thumbnail}}
            className="w-full h-full"
            resizeMode='cover'
          />
          <Image 
            source={icons.play}
            className="w-20 h-20 absolute"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard