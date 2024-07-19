import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';


const Bookmark = () => {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard videos={item}/>
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
      />
    </SafeAreaView>
  )
}

export default Bookmark