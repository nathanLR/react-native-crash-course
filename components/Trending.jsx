import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1.1
  }
}
const zoomOut = {
  0: {
    scale: 1.1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id == item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
          <Video 
            source={{uri: item.video}}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            className=" bg-white/10 h-72 w-52 rounded-[35px] my-5"
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish)
                setPlay(false);
            }}
          />
      ): (
        <TouchableOpacity
          className="justify-center items-center relative"
          onPress={() => setPlay(true)}
        >
          <ImageBackground 
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black"
            source={{uri: item.thumbnail}}
            resizeMode='cover'
          />
          <Image 
            source={icons.play}
            className="absolute h-8 w-8"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        onViewableItemsChanged={({viewableItems}) => {
          if (viewableItems.length > 0){
            setActiveItem(viewableItems[0].item)
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70 
        }}
        contentOffset={{x: 170}}
        renderItem={({item}) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        horizontal={true}
    />
  )
}

export default Trending