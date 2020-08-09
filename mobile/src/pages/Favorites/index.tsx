import React, { useState } from 'react';
import { View } from 'react-native';

import PageHeader from '../../components/PageHeader';

import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/teacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Favorites(){
  const [favorites,setFavorites] = useState([]);

  function loadfavorites(){
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response);
        
        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadfavorites();
  })


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <PageHeader title="Meus Proffys Favoritos"/>

        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >

          {favorites.map((teacher: Teacher) => (
            <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              favorited
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Favorites;