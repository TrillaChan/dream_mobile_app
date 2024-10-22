import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; 
import { TextInput, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
    
    const [dreamText, setDreamText] = useState('');
    const [isLucidDream, setIsLucidDream] = useState(false);
    const [date, setDate] = useState('');
    const [hashtag1, setHashtag1] = useState('');
    const [hashtag2, setHashtag2] = useState('');
    const [hashtag3, setHashtag3] = useState('');

    const findHashtagIdByLabel = async (hashtag) => {
        try {
            // Récupérer les données des rêves stockées dans AsyncStorage
            const existingDreams = await AsyncStorage.getItem('dreamFormDataArray');
            let dreamsData = existingDreams ? JSON.parse(existingDreams) : [];

            // Parcourir tous les rêves pour trouver un hashtag existant
            for (let dream of dreamsData) {
                for (let hashtagKey in dream.hashtags) {
                    const hashtagStored = dream.hashtags[hashtagKey]; // Récupère l'objet du hashtag stocké
                    if (hashtagStored.label === hashtag) {
                        // Si le hashtag est trouvé, renvoie son ID
                        return hashtagStored.id;
                    }
                }
            }
            // Si le hashtag n'existe pas, crée un nouvel ID
            const newId = `hashtag-${Math.random().toString(36).substr(2, 9)}`;
            return newId;
        } catch (error) {
            console.error('Erreur lors de la gestion des hashtags:', error);
            return null;
        }
    };

    const handleDreamSubmission = async () => {
        try {
            // Récupérer le tableau actuel depuis AsyncStorage
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            // Trouver les IDs des hashtags
            const hashtag1Id = await findHashtagIdByLabel(hashtag1);
            const hashtag2Id = await findHashtagIdByLabel(hashtag2);
            const hashtag3Id = await findHashtagIdByLabel(hashtag3);

            // Ajouter le nouveau formulaire au tableau
            formDataArray.push({
                dreamText: dreamText,
                isLucidDream: isLucidDream,
                todayDate: new Date(),
                hashtags: [
                    { id: hashtag1Id, label: hashtag1 },
                    { id: hashtag2Id, label: hashtag2 },
                    { id: hashtag3Id, label: hashtag3 },
                ],
            });

            // Sauvegarder le tableau mis à jour dans AsyncStorage
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

            // Réinitialiser les champs du formulaire
            setDreamText('');
            setIsLucidDream(false);
            setHashtag1('');
            setHashtag2('');
            setHashtag3('');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Rêve"
                value={dreamText}
                onChangeText={(text) => setDreamText(text)}
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />

            <TextInput
                label="Hashtag 1"
                value={hashtag1}
                onChangeText={(hashtag1) => setHashtag1(hashtag1)}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />
            <TextInput
                label="Hashtag 2"
                value={hashtag2}
                onChangeText={(hashtag2) => setHashtag2(hashtag2)}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />
            <TextInput
                label="Hashtag 3"
                value={hashtag3}
                onChangeText={(hashtag3) => setHashtag3(hashtag3)}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />

            <View style={styles.checkboxContainer}>
                <Checkbox.Item
                    label="Rêve Lucide"
                    status={isLucidDream ? 'checked' : 'unchecked'}
                    onPress={() => setIsLucidDream(!isLucidDream)}
                />
            </View>
            <TextInput
                label="Date"
                value={date}
                onChangeText={(text) => setDate(text)}
                mode="outlined"
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />
            
            <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
                Soumettre
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});
