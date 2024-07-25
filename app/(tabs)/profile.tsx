import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import {
  getAllPosts,
  getCurrentUser,
  getLatestPosts,
  getUserPosts,
  searchPosts,
  signOut,
} from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/Globalprovider";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const { setUser, user, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: any) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="contain"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              textStyles="text-lg"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={String(posts.length) || "0"}
                subtitle="Posts"
                containerStyles="mr-10"
                textStyles="text-xl"
              />

              <InfoBox title="1.2k" subtitle="Followers" textStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
