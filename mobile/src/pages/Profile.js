import React from "react";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

function Profile() {
  const route = useRoute();
  const routeParams = route.params;
  const githubUsername = routeParams["github_username"];

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
}

export default Profile;
