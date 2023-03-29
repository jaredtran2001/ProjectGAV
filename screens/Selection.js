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

let AnimeDescription = "Slice through this assortment of anime's ranging from all sorts of popularity!";
let kPopDescription = "Test your knowledge on the most popular kPop groups 2000 and up!";
let pokemonDescription = "Do you know your first gen pokemon?? Better go fast and make sure you're not a slow-poke";
let sexDescription = "We know why you're here ;). Act these sexual topics out. No words, all mouth!!!!";
let lolDescription = "How much more degenerate could we be if we didn't have a League of Legends category on almost all champions.";
let spanishDescription = "You've got two ways to play this throughout the game. Give hints in English, but the guesser must guess in Spanish or give hints in Spanish and the guesser must guess in English";
let animalDescription = "Blah blah blah. This category is boring try the other ones :(";


function populateSet(set, json ) {
  for(let i = 0; i < json.length; i++) {
    set.add(json[i].name);
  }
}

const Selection = ({navigation}) => {

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
            <Text style={styles.headerText}>Choose a Deck</Text>
          </View>
          <View style={[styles.horiLine, {marginBottom: 20}]}/>
          <View style={styles.form}>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: animeSet, description: AnimeDescription, category: "Anime"})} title = 'Anime'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: animalsSet, description: animalDescription, category: "Animals"})} title = 'Animals'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: kPopSet, description: kPopDescription, category: "KPOP"})} title = 'K-Pop Groups'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: pokemonSet, description: pokemonDescription, category: "Pokemon"} )} title = 'Pokemon'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: sexSet, description: sexDescription, category: "S*X"} )} title = 'S*x'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: leagueSet, description: lolDescription, category: "LOL"} )} title = 'LOL'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: spanishSet, description: spanishDescription, category: "Espanol"} )} title = 'Spanish'/>
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
        backgroundColor: "#364966"
    },
    scrollContainer: {
      alignItems: 'center',
    },
    horiLine: {
      borderBottomWidth: 1,
      borderColor: "#b38c8f",
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
      color: "white",
      marginTop: "25%",
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