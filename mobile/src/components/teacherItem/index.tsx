import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface TeacherItemProps{
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher,favorited }) => {
  const [isfavorited,setIsfavorited] = useState(favorited);

  function handleLinkToWhatsapp(){
    api.post('connections',{
      user_id: teacher.id
    })

    Linking.openURL(`whatsapp://send?text=He'llo World!&phone=+${teacher.whatsapp}`)
  }

  async function handleToggleFavorited(){
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray= [];

    if(favorites){
      favoritesArray = JSON.parse(favorites);
    }

    if(favorited){
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      setIsfavorited(false)
      favoritesArray.splice(favoriteIndex,1);
    }else{
      
      favoritesArray.push(teacher);
      setIsfavorited(true)
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return(
    <View  style={styles.container} >
        <View style={ styles.profile}>
          <Image 
            style={styles.avatar} 
            source={{ uri: teacher.avatar}}
          />

          <View style={ styles.profileInfo}>
            <Text style={ styles.name} >{teacher.name}</Text>
            <Text style={styles.subject }>{teacher.subject}</Text>
          </View>
        </View>

        <Text style={styles.bio} >
          {teacher.bio}
        </Text>

        <View style={styles.footer} >
          <Text style={styles.price}>
            Preço/hora {'   '}
            <Text style={styles.priceValue}>R${teacher.cost}</Text>
          </Text>
 
          <View style={styles.buttonsContainer}>
            <RectButton
              onPress={handleToggleFavorited}
              style={[
              styles.favoriteButton,
              isfavorited ? styles.favorited : {},
              ]}
            >
              {isfavorited
                ? <Image source={unfavoriteIcon} />
                : <Image source={heartOutLineIcon} /> 
              }
            </RectButton>

            <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
              <Image source={whatsappIcon} />
              <Text style={styles.contactButtonText}>Entrar em contanto</Text>
            </RectButton>
          </View>
        </View>
    </View>
  )
}

export default TeacherItem;