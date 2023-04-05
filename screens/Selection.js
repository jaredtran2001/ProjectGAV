import { Component, React } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PlayButton from '../components/PlayButton';
import Champions from '../assets/wordSets/lolChampions.json';
import Anime from '../assets/wordSets/anime.json';
import Animal from '../assets/wordSets/animal.json';
import Kpop from '../assets/wordSets/kpop.json';
import Pokemon from '../assets/wordSets/pokemon.json';
import Sex from '../assets/wordSets/sex.json';
import Spanish from '../assets/wordSets/spanish.json';
import background from '../assets/bgImages/animalBG.jpeg'
import { useFonts } from 'expo-font';
// import TextStroke from 'react-native-textstroke';
import * as ScreenOrientation from 'expo-screen-orientation';




function populateSet(set, json ) {
  for(let i = 0; i < json.length; i++) {
    set.add(json[i].name);
  }
}

let first = true;
const Selection = ({navigation}) => {
  // ScreenOrientation.unlockAsync();
  async function fixOrientation() {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  // ScreenOrientation.unlockAsync();
  // console.log(ScreenOrientation.getOrientationLockAsync());
  if(first) {
    first = false;
    fixOrientation();
  }
  // if(ScreenOrientation.getOrientationLockAsync() != PORTRAIT) {
  //   fixOrientation();
  // }

  const [fontsLoaded] = useFonts({
    'Valorant': require('../assets/fonts/Valorant-Font.ttf'),
  });
  if(!fontsLoaded) {
    return null;
  }
  let AnimeDescription = "SLICE THROUGH THIS ASSORTMENT OF ANIME'S RANGING FROM ALL SORTS OF POPULARITY!";
  let kPopDescription = "TEST YOUR KNOWLEDGE ON THE MOST POPULAR KPOP GROUPS 2000 AND UP!";
  let pokemonDescription = "DO YOU KNOW YOUR FIRST GEN POKEMON?? BETTER GO FAST AND MAKE SURE YOU'RE NOT A SLOW-POKE";
  let sexDescription = "ACT THESE SEXUAL TOPICS OUT. NO WORDS, ALL MOUTH!";
  let lolDescription = "HOW MUCH MORE DEGENERATE COULD WE BE IF WE DIDN'T HAVE A LEAGUE OF LEGENDS CATEGORY ON ALMOST ALL CHAMPIONS";
  let spanishDescription = "HINTS IN ENGLISH GUESS IN SPANISH";
  let animalDescription = "BLAH BLAH BLAH. THIS CATEGORY IS BORING TRY THE OTHER ONES";

  //Initialize Sets
  let animeSet = new Set();
  let animalsSet = new Set();
  let kPopSet = new Set();
  let pokemonSet = new Set();
  let sexSet = new Set();
  let leagueSet = new Set();
  let spanishSet = new Set();
  
  //Fill in Sets
  populateSet(animeSet, Anime);
  populateSet(animalsSet, Animal);
  populateSet(kPopSet, Kpop);
  populateSet(pokemonSet, Pokemon);
  populateSet(sexSet, Sex);
  populateSet(leagueSet, Champions);
  populateSet(spanishSet, Spanish);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            {/* <TextStroke stroke= {2} color= '#white'>  */}
              <Text style={styles.headerText}>Choose a Deck</Text>
            {/* </TextStroke> */}
          </View>
          <View style={[styles.horiLine, {marginBottom: 20}]}/>
          <View style={styles.form}>
            <PlayButton onPress = {() => navigation.push('Description', {set: animeSet, description: AnimeDescription, category: "ANIME"})} title = 'ANIME'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: animalsSet, description: animalDescription, category: "ANIMALS"})} title = 'ANIMALS'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: kPopSet, description: kPopDescription, category: "KPOP"})} title = 'KPOP'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: pokemonSet, description: pokemonDescription, category: "POKEMON"} )} title = 'POKEMON'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: sexSet, description: sexDescription, category: "S*X"} )} title = 'S*X'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: leagueSet, description: lolDescription, category: "LOL"} )} title = 'LOL'/>
            <PlayButton onPress = {() => navigation.push('Description', {set: spanishSet, description: spanishDescription, category: "SPANISH"} )} title = 'SPANISH'/>
          </View>
          <View style={[styles.horiLine, {marginTop: 20}]}/>
          <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#1f2326"
        // backgroundColor: "#364966"
    },
    scrollContainer: {
      alignItems: 'center',
    },
    horiLine: {
      borderBottomWidth: 1,
      borderColor: "#ff4656",
      // borderColor: "#b38c8f",
      width: "60%",
    },
    header: {
      height: 200,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: 'center',
    },
    headerText: {
      fontSize: 45,
      fontWeight: "bold",
      color: "#ff4656",
      // color: "white",
      marginTop: "25%",
      fontFamily: 'Valorant',
    },
    form: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: "100%",
    },
    footer: {
      width: "100%",
      height: 50,
    }
});

export default Selection;