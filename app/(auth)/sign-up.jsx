import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password){
      Alert.alert("Error", "Please fill in the form.");
    }else{
      setIsSubmitting(true);
      try {
        const user = await createUser(form);
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
          <Text className="text-white text-2xl font-psemibold mt-10">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-7"
            keyboardType="default"
          />
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
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account ?
            </Text>
            <Link href={"/sign-in"} className='text-lg text-secondary font-psemibold'>sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp