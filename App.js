import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});