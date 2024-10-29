// DreamItem.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DreamItem({ dream, index, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Pour gérer l'accordéon
  const [editableDream, setEditableDream] = useState(dream);

  const handleSave = async () => {
    setIsEditing(false);
    onUpdate(index, editableDream);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle pour l’accordéon
  };

  const handleChange = (field, value) => {
    setEditableDream({ ...editableDream, [field]: value });
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity onPress={handleToggleExpand} style={styles.dreamButton}>
        <Text style={styles.dreamButtonText}>Rêve {index + 1}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.dreamDetails}>
          {isEditing ? (
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
                value={editableDream.type}
                onChangeText={(text) => handleChange('type', text)}
                placeholder="Type"
              />
              <Button title="Sauvegarder" onPress={handleSave} />
            </>
          ) : (
            <>
              <Text>Rêve: {dream.dreamText}</Text>
              <Text>Date: {dream.date}</Text>
              <Text>Type: {dream.type}</Text>
              {/* Affichez les autres champs ici */}
            </>
          )}
          <Button title={isEditing ? "Annuler" : "Modifier"} onPress={() => setIsEditing(!isEditing)} />
          <Button title="Supprimer" onPress={() => onDelete(index)} color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  dreamButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  dreamButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dreamDetails: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
