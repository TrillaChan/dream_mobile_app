import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DreamList from '@/components/DreamList';

export default function TabTwoScreen() {


  return (
    <View style={styles.container}>
    <Text style={styles.title}>Tab One</Text>
    <DreamList />
  </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
});
