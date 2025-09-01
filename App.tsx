import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Photo = {
  id: string;
  caption: string;
  uri: string;
  createdAt: string;
};

const STORAGE_KEY = 'photos';

const App = () => {
  const [caption, setCaption] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);


  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setPhotos(JSON.parse(data));
        }
      } catch (err) {
        console.error('Error loading photos', err);
      }
    };
    loadPhotos();
  }, []);


  const savePhotos = async (newPhotos: Photo[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPhotos));
    } catch (err) {
      console.error('Error saving photos', err);
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const asset: Asset = result.assets[0];
      if (asset.uri) {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          caption,
          uri: asset.uri,
          createdAt: new Date().toISOString(),
        };

        const updatedPhotos = [newPhoto, ...photos];
        setPhotos(updatedPhotos);
        savePhotos(updatedPhotos);
        setCaption('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Photo Journal</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter caption..."
        value={caption}
        onChangeText={setCaption}
      />

      <Button title="Pick Image" onPress={pickImage} />

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.photoCard}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50,padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  photoCard: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  photo: { width: '100%', height: 200, borderRadius: 8 },
  caption: { fontSize: 16, marginTop: 6 },
  date: { fontSize: 12, color: 'gray', marginTop: 2 },
});
