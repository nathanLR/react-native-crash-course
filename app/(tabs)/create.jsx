import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { images } from "../../constants"
import FormField from "../../components/FormField"
import { useState } from "react"
import CustomButton from "../../components/CustomButton"
import * as ImagePicker from 'expo-image-picker'
import FormFieldMedia from "../../components/FormFieldMedia"
import { createVideo } from "../../lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider"
import { router } from "expo-router"

const Create = () => {
  const {user} = useGlobalContext();
  const [createForm, setCreateForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const pickMedia = async (mediaType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType
    });
    if (mediaType == ImagePicker.MediaTypeOptions.Images)
      setCreateForm({...createForm, thumbnail: result.assets[0]});
    else
      setCreateForm({...createForm, video: result.assets[0]});
  }
  const handleSubmit = async () => {
    if (!createForm.prompt || !createForm.thumbnail || !createForm.title || !createForm.video)
      Alert.alert("Error", "Please fill in all the inputs");
    else {
      setIsLoading(true);
      try {
        await createVideo({...createForm, userId: user.$id});
        setCreateForm({});
        router.push("/home");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-center flex-row mb-8">
          <Text className="text-2xl font-psemibold text-white">Upload Video</Text> 
          <View className="mt-1.5">
            <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain'/>
          </View>
        </View>
        <FormField 
          title={"Video title"}
          value={createForm.title}
          keyboardType={"default"}
          placeholder={"Give your video a catchy title..."}
          handleChangeText={(e) => setCreateForm({...createForm, title: e})}
          otherStyles={"mb-6"}
        />
        <FormFieldMedia 
          title={"Upload Video"}
          otherStyles={"mb-6"}
          value={createForm.video}
          type="video"
          onPress={() => {pickMedia(ImagePicker.MediaTypeOptions.Videos)}}
        />
        <FormFieldMedia 
          title={"Thumbnail Image"}
          otherStyles={"mb-6"}
          value={createForm.thumbnail}
          type="image"
          onPress={() => {pickMedia(ImagePicker.MediaTypeOptions.Images)}}
        />
        <FormField 
          title="AI prompt"
          value={createForm.prompt}
          keyboardType={"default"}
          placeholder="The AI prompt of your video..."
          handleChangeText={(e) => setCreateForm({...createForm, prompt: e})}
          otherStyles="mb-6"
        />
        <CustomButton 
          containerStyles="w-full"
          title="Submit & Publish"
          handlePress={handleSubmit}
          isLoading={isLoading}
        />
      </View>
      </ScrollView> 
    </SafeAreaView>
  )
}

export default Create