// TabOneScreen.tsx
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import DreamForm from '@/components/DreamForm';

export default function TabOneScreen() {

  console.log("Coucou");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <DreamForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
