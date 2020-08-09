import React, { useEffect, useState } from 'react';
import { View,Image,Text }  from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { AppLoading } from 'expo';
import { Archivo_400Regular,Archivo_700Bold,useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular,Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import LandingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/api';

import styles from './styles';

function Landing(){
  const { navigate } = useNavigation();
  const [TotalConnections,setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      setTotalConnections(response.data);
    })
  },[])


  function handleNavigationToGiveClassPage(){
    navigate('GiveClasses');
  }

  function handleNavigationToStudyPages(){
    navigate('Study');
  }


  let [ fontsLoaded ] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading/>
  } else{
    return(
      <View style={styles.container}>
        <Image source={LandingImg} style={styles.banner}/>
        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}
          <Text style={styles.titlebold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            style={[styles.button,styles.buttonPrimary]}
            onPress={handleNavigationToStudyPages}
          >
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>
          <RectButton 
            style={[styles.button,styles.buttonSecondary]}
            onPress={handleNavigationToGiveClassPage}
          >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>
          
          <Text style={styles.totalConnections}>
            Tolta de { TotalConnections } conexões já realizadas
            <Image source={heartIcon} />
          </Text>
      </View>
    )
  }
    
}

export default Landing;