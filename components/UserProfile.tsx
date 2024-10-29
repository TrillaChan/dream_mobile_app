import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function UserProfile() {
  const userName = "Paul Doe"; // Remplacez par les données de l'utilisateur
  const notificationMessage = "Vous avez 3 notifications en attente";

  return (
    <View style={styles.container}>
      {/* Image de profil depuis le dossier assets */}
      <Image
        source={require('@/assets/images/rana-sawalha-IhuHLIxS_Tk-unsplash.jpg')} // Remplacez 'profile.jpg' par le nom de votre image
        style={styles.profileImage}
      />

      {/* Nom de l'utilisateur */}
      <Text style={styles.userName}>{userName}</Text>

      {/* Zone de notification avec icône */}
      <View style={styles.notificationContainer}>
        <FontAwesome name="envelope" size={20} color="#888" style={styles.notificationIcon} />
        <Text style={styles.notificationMessage}>{notificationMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Image ronde
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  notificationIcon: {
    marginRight: 8,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#888', // Couleur grise
    textAlign: 'center',
  },
});
