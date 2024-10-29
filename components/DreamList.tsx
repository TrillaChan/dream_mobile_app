// DreamList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [expandedDreamIndex, setExpandedDreamIndex] = useState(null); // Pour gérer l'accordéon
  const [isEditingIndex, setIsEditingIndex] = useState(null); // Pour gérer l'édition en ligne
  const [editableDream, setEditableDream] = useState({});

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('dreamFormDataArray');
      const dreamFormDataArray = data ? JSON.parse(data) : [];
      setDreams(dreamFormDataArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        console.log('This route is now unfocused.');
      };
    }, [])
  );

  const toggleDreamDetails = (index) => {
    setExpandedDreamIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleDeleteDream = async (index) => {
    // Pour éviter que l'utilisateur appuie sur un autre bouton avant que la suppression soit terminée
    try {
      console.log("Tentative de suppression du rêve à l'index :", index);
  
      // Filtrer la liste pour exclure l'élément à l'index donné
      const updatedDreams = dreams.filter((_, i) => i !== index);
      console.log("Liste des rêves mise à jour localement :", updatedDreams);
  
      // Mettre à jour AsyncStorage avec la nouvelle liste sans le rêve supprimé
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
      console.log("AsyncStorage mis à jour avec la nouvelle liste après suppression.");
  
      // Mettre à jour l'état local après la mise à jour d'AsyncStorage
      setDreams(updatedDreams);
      setExpandedDreamIndex(null); // Fermer l'accordéon si le rêve supprimé était ouvert
  
      // Vérification supplémentaire : récupérer la liste pour confirmer la suppression
      const refreshedData = await AsyncStorage.getItem('dreamFormDataArray');
      console.log("Vérification de la liste dans AsyncStorage après suppression :", JSON.parse(refreshedData));
    } catch (error) {
      console.error('Erreur lors de la suppression du rêve:', error);
    }
  };
  


  const handleEditDream = (index) => {
    setIsEditingIndex(index);
    setEditableDream(dreams[index]);
  };

  const handleSaveDream = async () => {
    const updatedDreams = [...dreams];
    updatedDreams[isEditingIndex] = editableDream;
    setDreams(updatedDreams);
    await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
    setIsEditingIndex(null);
  };

  const handleChange = (field, value) => {
    setEditableDream({ ...editableDream, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Liste des Rêves :</Text>

      {dreams.map((dream, index) => (
        <View key={index} style={styles.dreamItem}>
          <TouchableOpacity onPress={() => toggleDreamDetails(index)} style={styles.dreamButton}>
            <Text style={styles.buttonText}>Rêve {index + 1}</Text>
          </TouchableOpacity>

          {expandedDreamIndex === index && (
            <View style={styles.dreamDetails}>
              {isEditingIndex === index ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editableDream.dreamText}
                    onChangeText={(text) => handleChange('dreamText', text)}
                    placeholder="Rêve"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.date}
                    onChangeText={(text) => handleChange('date', text)}
                    placeholder="Date"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.time}
                    onChangeText={(text) => handleChange('time', text)}
                    placeholder="Heure"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.dreamType}
                    onChangeText={(text) => handleChange('dreamType', text)}
                    placeholder="Type de rêve"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.emotionBefore}
                    onChangeText={(text) => handleChange('emotionBefore', text)}
                    placeholder="État émotionnel avant"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.emotionAfter}
                    onChangeText={(text) => handleChange('emotionAfter', text)}
                    placeholder="État émotionnel après"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.characters}
                    onChangeText={(text) => handleChange('characters', text)}
                    placeholder="Personnages"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.location}
                    onChangeText={(text) => handleChange('location', text)}
                    placeholder="Lieu"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.emotionIntensity}
                    onChangeText={(text) => handleChange('emotionIntensity', text)}
                    placeholder="Intensité émotionnelle"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.dreamClarity}
                    onChangeText={(text) => handleChange('dreamClarity', text)}
                    placeholder="Clarté du rêve"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.sleepQuality}
                    onChangeText={(text) => handleChange('sleepQuality', text)}
                    placeholder="Qualité du sommeil"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.personalMeaning}
                    onChangeText={(text) => handleChange('personalMeaning', text)}
                    placeholder="Signification personnelle"
                  />
                  <TextInput
                    style={styles.input}
                    value={editableDream.overallTone}
                    onChangeText={(text) => handleChange('overallTone', text)}
                    placeholder="Tonalité globale"
                  />
                  <Button title="Sauvegarder" onPress={handleSaveDream} />
                  <Button title="Annuler" onPress={() => setIsEditingIndex(null)} color="gray" />
                </>
              ) : (
                <>
                  <Text style={styles.dreamText}>Rêve: {dream.dreamText}</Text>
                  <Text style={styles.dreamText}>Date: {dream.date}</Text>
                  <Text style={styles.dreamText}>Heure: {dream.time}</Text>
                  <Text style={styles.dreamText}>Type: {dream.dreamType}</Text>
                  <Text style={styles.dreamText}>État émotionnel avant: {dream.emotionBefore}</Text>
                  <Text style={styles.dreamText}>État émotionnel après: {dream.emotionAfter}</Text>
                  <Text style={styles.dreamText}>Personnages: {dream.characters}</Text>
                  <Text style={styles.dreamText}>Lieu: {dream.location}</Text>
                  <Text style={styles.dreamText}>Intensité émotionnelle: {dream.emotionIntensity}</Text>
                  <Text style={styles.dreamText}>Clarté du rêve: {dream.dreamClarity}</Text>
                  <Text style={styles.dreamText}>Qualité du sommeil: {dream.sleepQuality}</Text>
                  <Text style={styles.dreamText}>Signification personnelle: {dream.personalMeaning}</Text>
                  <Text style={styles.dreamText}>Tonalité globale: {dream.overallTone}</Text>
                  <Text style={styles.dreamText}>Hashtags:</Text>
                  {dream.hashtags.map((hashtag, i) => (
                    <Text key={i} style={styles.dreamText}>
                      {i + 1}. {hashtag.label}
                    </Text>
                  ))}
                  <View style={styles.buttonContainer}>
                    <Button title="Modifier" onPress={() => handleEditDream(index)} />
                    <Button title="Supprimer" onPress={() => handleDeleteDream(index)} color="red" />
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dreamItem: {
    width: '100%',
  },
  dreamButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dreamDetails: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
