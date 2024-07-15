import { View, Text, FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import useAppwrite from '../../lib/useAppwrite';
import { getQueryResults } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import { useEffect } from 'react';


const Search = () => {
  const {query} = useLocalSearchParams();
  const {data: posts, refetch} = useAppwrite(() => getQueryResults(query));
  useEffect(() => {
    refetch()
  }, [query])
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard videos={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="mb-6">
              <Text className="font-pmedium test-sm text-gray-100">Search results</Text>
              <Text className="text-2xl font-psemibold text-white">{query}</Text>
            </View>
            <SearchInput initialQuery={query}/>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title={`No results for "${query}"`}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search