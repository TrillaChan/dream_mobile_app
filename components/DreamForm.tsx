import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { TextInput, Button, RadioButton, Menu, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
    const [dreamText, setDreamText] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [dreamType, setDreamType] = useState(''); // Type de rêve sélectionné
    const [emotionalStateBefore, setEmotionalStateBefore] = useState('');
    const [emotionalStateAfter, setEmotionalStateAfter] = useState('');
    const [characters, setCharacters] = useState('');
    const [location, setLocation] = useState('');
    const [emotionalIntensity, setEmotionalIntensity] = useState('');
    const [dreamClarity, setDreamClarity] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    const [personalMeaning, setPersonalMeaning] = useState('');
    const [overallTone, setOverallTone] = useState('neutral');
    const [hashtag1, setHashtag1] = useState('');
    const [hashtag2, setHashtag2] = useState('');
    const [hashtag3, setHashtag3] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

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
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            // Trouver les IDs des hashtags
            const hashtag1Id = await findHashtagIdByLabel(hashtag1);
            const hashtag2Id = await findHashtagIdByLabel(hashtag2);
            const hashtag3Id = await findHashtagIdByLabel(hashtag3);

            formDataArray.push({
                dreamText,
                date,
                time,
                dreamType,
                emotionalStateBefore,
                emotionalStateAfter,
                characters,
                location,
                emotionalIntensity,
                dreamClarity,
                sleepQuality,
                personalMeaning,
                overallTone,
                hashtags: [
                    { label: hashtag1 },
                    { label: hashtag2 },
                    { label: hashtag3 },
                ],
            });

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

            setDreamText('');
            setDate('');
            setTime('');
            setDreamType('');
            setEmotionalStateBefore('');
            setEmotionalStateAfter('');
            setCharacters('');
            setLocation('');
            setEmotionalIntensity('');
            setDreamClarity('');
            setSleepQuality('');
            setPersonalMeaning('');
            setOverallTone('neutral');
            setHashtag1('');
            setHashtag2('');
            setHashtag3('');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput label="Rêve" value={dreamText} onChangeText={setDreamText} style={styles.input} />
            <TextInput label="Date du Rêve" value={date} onChangeText={setDate} style={styles.input} />
            <TextInput label="Heure du Rêve" value={time} onChangeText={setTime} style={styles.input} />

            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Type de Rêve</Text>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button mode="outlined" onPress={() => setMenuVisible(true)}>
                            {dreamType || "Sélectionner le type de rêve"}
                        </Button>
                    }
                >
                    <Menu.Item onPress={() => { setDreamType("Cauchemar"); setMenuVisible(false); }} title="Cauchemar" />
                    <Divider />
                    <Menu.Item onPress={() => { setDreamType("Rêve Lucide"); setMenuVisible(false); }} title="Rêve Lucide" />
                    <Divider />
                    <Menu.Item onPress={() => { setDreamType("Rêve Ordinaire"); setMenuVisible(false); }} title="Rêve Ordinaire" />
                    <Divider />
                    <Menu.Item onPress={() => { setDreamType("Autre"); setMenuVisible(false); }} title="Autre" />
                </Menu>
            </View>

            <TextInput label="État émotionnel avant" value={emotionalStateBefore} onChangeText={setEmotionalStateBefore} style={styles.input} />
            <TextInput label="État émotionnel après" value={emotionalStateAfter} onChangeText={setEmotionalStateAfter} style={styles.input} />
            <TextInput label="Personnages" value={characters} onChangeText={setCharacters} style={styles.input} />
            <TextInput label="Lieu" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput label="Intensité émotionnelle (1-10)" value={emotionalIntensity} onChangeText={setEmotionalIntensity} keyboardType="numeric" style={styles.input} />
            <TextInput label="Clarté du rêve (1-10)" value={dreamClarity} onChangeText={setDreamClarity} keyboardType="numeric" style={styles.input} />
            <TextInput label="Qualité du sommeil (1-10)" value={sleepQuality} onChangeText={setSleepQuality} keyboardType="numeric" style={styles.input} />
            <TextInput label="Signification personnelle" value={personalMeaning} onChangeText={setPersonalMeaning} style={styles.input} />

            <Text style={styles.label}>Tonalité globale :</Text>
            <RadioButton.Group onValueChange={setOverallTone} value={overallTone}>
                <RadioButton.Item label="Positive" value="positive" />
                <RadioButton.Item label="Négative" value="negative" />
                <RadioButton.Item label="Neutre" value="neutral" />
            </RadioButton.Group>

            <TextInput label="Hashtag 1" value={hashtag1} onChangeText={setHashtag1} style={styles.input} />
            <TextInput label="Hashtag 2" value={hashtag2} onChangeText={setHashtag2} style={styles.input} />
            <TextInput label="Hashtag 3" value={hashtag3} onChangeText={setHashtag3} style={styles.input} />

            <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
                Soumettre
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    input: {
        marginBottom: 16,
        width: width * 0.8,
    },
    button: {
        marginTop: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'center',
    },
    dropdownContainer: {
        width: width * 0.8,
        marginBottom: 16,
        alignItems: 'center',
    },
});
