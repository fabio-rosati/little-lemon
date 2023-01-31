import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

import OnboardingScreen from "./screens/OnboardingScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});