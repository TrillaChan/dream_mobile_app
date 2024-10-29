// TabTwoScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import DreamList from '@/components/DreamList'; // Assurez-vous que le chemin est correct

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <DreamList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
