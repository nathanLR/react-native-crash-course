import 'react-native-url-polyfill/auto'
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.nathan.aora",
    projectId: "668faf0a00225ba691b7",
    databaseId: "668fb1300019ebaaa298",
    userCollection: "668fb175002ab55bd9a6",
    videoCollection: "668fb18e0034fa4942ed",
    storageId: "668ffa120001b5eea3f2"
}

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

export const createUser = async ({email, password, username}) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        const newAvatar = avatars.getInitials(username);
        const newUser = await database.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollection,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username: username,
                email: email,
                password: password,
                avatar: newAvatar
            }
        )
        await signIn(email, password);
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async ({email, password}) => {
    try {
        const userSession = await account.createEmailPasswordSession(email, password);
        return userSession;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (currentAccount == null) throw Error;
        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollection,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (currentUser == null) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}