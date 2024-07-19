import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { icons, images } from '../../constants'
import { router } from 'expo-router'

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts} = useAppwrite(() => getUserPosts(user.$id));
  console.log("GLOBAL USER PROFILE: ", user)
  const logout = async () => {
    const session = await signOut();
    if (session){
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    }else{
      Alert.alert("Session not found", "Something went wrong with your session");
    }
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard videos={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <TouchableOpacity
              className="items-end"
              onPress={logout}
            >
              <Image 
                source={icons.logout}
                className="h-7 w-7"
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View className="justify-center items-center mb-6">
              <View className="w-[60px] h-[60px] rounded-lg p-0.5">
                <Image source={{uri: user?.avatar }} className="h-full w-full rounded-lg" resizeMode='cover'/>
              </View>
              <Text className="font-psemibold text-lg text-white mt-3">{user?.username}</Text>
              <View className="flex-row mt-6 items-center">
                <View className="mx-5 border ">
                  <Text className="text-white font-psemibold text-lg text-center">{posts.length}</Text>
                  <Text className="text-gray-100 text-center">Posts</Text>
                </View>
                <View className="mx-5">
                  <Text className="text-white font-psemibold text-lg text-center">{10}</Text>
                  <Text className="text-gray-100 text-center">Posts</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile