import 'react-native-url-polyfill/auto'
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.nathan.aora",
    projectId: "668faf0a00225ba691b7",
    databaseId: "668fb1300019ebaaa298",
    userCollection: "668fb175002ab55bd9a6",
    videoCollection: "668fb18e0034fa4942ed",
    storageId: "668ffa120001b5eea3f2",
    bookmarkCollection: "669acae4000f3dc1492d"
}

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

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

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
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

export const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollection,
            [
                Query.orderDesc("$createdAt")
            ]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
    }
}

export const getTrendingPosts = async () => {
    try {
        const trendingPosts = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollection,
            [
                Query.orderDesc("$createdAt"),
                Query.limit(7)
            ]
        );
        return trendingPosts.documents;
    } catch (error) {
        console.log(error)
    }
}

export const getQueryResults = async (query) => {
    try {
        const queryResults = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollection,
            [
                Query.contains("title", query)
            ]
        );
        return queryResults.documents;
    } catch (error) {
        console.log(error)
    }
}

export const getUserPosts = async (user) => {
    try {
        const results = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollection,
            [
                Query.equal("users", user)
            ]
        );
        return results.documents;
    } catch (error) {
        throw new Error(error);
    }
}

const uploadFile = async (file) => {
    if (file == null)
        return ;
    try {
        const newFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            {
                name: file.fileName,
                type: file.mimeType,
                size: file.fileSize,
                uri: file.uri
            }
        );
        const fileUrl = storage.getFileView(
            appwriteConfig.storageId,
            newFile.$id
        )
        return fileUrl;
    } catch (error) {
        console.log(error.stack);
        throw new Error(error);
    }
}

export const createVideo = async ({title, thumbnail, prompt, video, userId}) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(thumbnail),
            uploadFile(video)
        ]);
        const newVideo = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollection,
            ID.unique(),
            {
                prompt: prompt,
                thumbnail: thumbnailUrl,
                title: title,
                video: videoUrl,
                users: userId
            }
        )
    } catch (error) {
        console.log(error.stack);
        throw new Error(error);
    }
}

export const getBookmark = async (userId) => {
    try {
        const bookmarked = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarkCollection,
            [
                Query.equal("users", userId)
            ]
        );
        return bookmarked.documents;
    } catch (error) {
        console.log(error);
    }
}

export const createBookmark = async (userId, videoId) => {
    try {
        const newBookmark = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarkCollection,
            ID.unique(),
            {
                users: userId,
                video: videoId
            }
        );
    } catch (error) {
        console.log(error);
    }
}

export const deleteBookmark = async (bookmarkId) => {
    try {
        const deletedBookmark = await database.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.bookmarkCollection,
            bookmarkId
        )
    } catch (error) {
        console.log(error);
    }
}