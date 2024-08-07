import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!form.email || !form.password){
      Alert.alert("Error", "Please fill in the form.");
    } else {
      setIsSubmitting(true);
      try {
        await signIn(form);
        const user = await getCurrentUser();
        setUser(user);
        setIsLoggedIn(true);
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="w-full px-4 mt-8">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain'/>
          <Text className="text-white text-2xl font-psemibold mt-10">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(newVal) => setForm({...form, password: newVal})}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <CustomButton  
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>
            <Link href={"/sign-up"} className='text-lg text-secondary font-psemibold'>sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn