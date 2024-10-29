// TabThreeScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import UserProfile from '@/components/UserProfile'; // Assurez-vous que le chemin est correct

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
