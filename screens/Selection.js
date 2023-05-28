import { Component, React } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PlayButton from '../components/PlayButton';
import Champions from '../assets/wordSets/lolChampions.json';
import Anime from '../assets/wordSets/anime.json';
import Kpop from '../assets/wordSets/kpop.json';
import Pokemon from '../assets/wordSets/pokemon.json';
import Sex from '../assets/wordSets/sex.json';
import Spanish from '../assets/wordSets/spanish.json';
// import background from '../assets/bgImages/animalBG.jpeg'
import { useFonts } from 'expo-font';
import Naruto from '../assets/wordSets/naruto.json';
import Valorant from '../assets/wordSets/valorant.json';
import OnePiece from '../assets/wordSets/onePiece.json';
import kPopSong from '../assets/wordSets/kpopSong.json';
import MyHero from '../assets/wordSets/myHero.json';
// import TextStroke from 'react-native-textstroke';
import * as ScreenOrientation from 'expo-screen-orientation';
//imgs
import pokemonImg from '../assets/images/pikachu.svg';
import leageuImg from '../assets/images/league.svg';
import luffyImg from '../assets/images/luffy.svg';
import kDanceImg from '../assets/images/kdance.svg';
import kpopImg from '../assets/images/bts.svg';
import myHeroImg from '../assets/images/midoriya.svg';
import narutoImg from '../assets/images/naruto.svg';
import animeImg from '../assets/images/anya.svg';




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
  let valorantDescription = "BLAZE THROUGH YOUR FAVORITE VALORANT CHARACTER'S ABILITIES AND RISE TO THE RANKS OF IMMORTAL";
  let narutoDescription = "IT'S MY NINJA WAY TO GUESS MY FAVORITE NARUTO CHARACTERS";
  let onePieceDescription = "GUESS THE MOST ONE PIECE CHARACTERS TO BECOME THE PIRATE KING!";
  let myHeroDescription = "PLUS ULTRAAA GUESS THE VILLAINS, HEROES, AND STUDENTS OF MY HERO ACADEMIA";
  let kPopSongDescription = "DANCE YOUR WAY INTO VICTORY! TALKING IS NOT ALLOWED"
  let spanishDescription = "LOL"

  //Initialize Sets
  let animeSet = new Set();
  let narutoSet = new Set();
  let onePieceSet = new Set();
  let kPopSet = new Set();
  let pokemonSet = new Set();
  let sexSet = new Set();
  let leagueSet = new Set();
  let valorantSet = new Set();
  let kpopSongSet = new Set();
  let myHeroSet = new Set();
  let spanishSet = new Set();
  
  //Fill in Sets
  populateSet(animeSet, Anime);
  populateSet(narutoSet, Naruto);
  populateSet(onePieceSet, OnePiece);
  populateSet(kPopSet, Kpop);
  populateSet(pokemonSet, Pokemon);
  populateSet(sexSet, Sex);
  populateSet(leagueSet, Champions);
  populateSet(valorantSet, Valorant);
  populateSet(kpopSongSet, kPopSong);
  populateSet(myHeroSet, MyHero);
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
            <PlayButton img = {animeImg} onPress = {() => {first = true; navigation.push('Description', {set: animeSet, description: AnimeDescription, category: "ANIME", img: animeImg})}} title = 'ANIME'/>
            <PlayButton img = {narutoImg} onPress = {() => {first = true; navigation.push('Description', {set: narutoSet, description: narutoDescription, category: "NARUTO", img: narutoImg})}} title = 'NARUTO'/>
            <PlayButton img = {luffyImg} onPress = {() => {first = true; navigation.push('Description', {set: onePieceSet, description: onePieceDescription, category: "ONE PIECE", img: luffyImg})}} title = 'ONE PIECE'/>
            <PlayButton img = {myHeroImg} onPress = {() => {first = true; navigation.push('Description', {set: myHeroSet, description: myHeroDescription, category: "MY HERO", img: myHeroImg})}} title = 'MY HERO'/>
            <PlayButton img = {pokemonImg} onPress = {() => {first = true; navigation.push('Description', {set: pokemonSet, description: pokemonDescription, category: "POKEMON", img: pokemonImg} )}} title = 'POKEMON'/>
            <PlayButton img = {leageuImg} onPress = {() => {first = true; navigation.push('Description', {set: leagueSet, description: lolDescription, category: "LOL", img: leageuImg} )}} title = 'LOL'/>
            <PlayButton img = {kpopImg} onPress = {() => {first = true; navigation.push('Description', {set: kPopSet, description: kPopDescription, category: "KPOP", img:kpopImg })}} title = 'KPOP'/>
            <PlayButton img = {kDanceImg} onPress = {() => {first = true; navigation.push('Description', {set: kpopSongSet, description: kPopSongDescription, category: "KPOP DANCES", img:kDanceImg })}} title = 'KPOP DANCES'/>
            {/* <PlayButton img = {pokemonImg} onPress = {() => {first = true; navigation.push('Description', {set: sexSet, description: sexDescription, category: "S*X"} )}} title = 'S*X'/> */}
            {/* <PlayButton img = {pokemonImg} onPress = {() => {first = true; navigation.push('Description', {set: valorantSet, description: valorantDescription, category: "VALORANT"} )}} title = 'VALORANT'/> */}
            {/* <PlayButton img = {pokemonImg} onPress = {() => {first = true; navigation.push('Description', {set: spanishSet, description: spanishDescription, category: "SPANISH"} )}} title = 'SPANISH'/> */}
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