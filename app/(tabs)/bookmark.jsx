import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import useAppwrite from '../../lib/useAppwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { deleteBookmark, getBookmark } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import { usePathname } from 'expo-router';


const Bookmark = () => {
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useGlobalContext();
  const {data: posts, setData: setPosts, refetch} = useAppwrite(() => getBookmark(user.$id));
  const pathname = usePathname();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  const toggleBookmark = async (bookmarkId) => {
    if (pathname != undefined && pathname.startsWith("/bookmark"))
      Alert.alert("Info", "This video has been removed from your bookmark");
    await deleteBookmark(bookmarkId);
    setPosts(posts.filter(post => post.$id != bookmarkId));
  }
  console.log("BOOKMARK", posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard videos={item.video} pathname={pathname} toggleBookmark={() => toggleBookmark(item.$id)}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="mb-3">
              <Text className="text-2xl font-psemibold text-white">Search results</Text>
            </View>
            <SearchInput initialQuery={query}/>
          </View>
        )}
        ListEmptyComponent={() => {
          if(query)
            return (<EmptyState title={`No results for "${query}"`}/>)
          else 
            return (<EmptyState title={"You have no videos bookmarked"}/>) 
        }
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Bookmark