import { Component, React } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PlayButton from '../components/PlayButton';
import Champions from '../assets/lolChampions.json';
import Anime from '../assets/anime.json';
import Animal from '../assets/animal.json';
import Kpop from '../assets/kpop.json';
import Pokemon from '../assets/pokemon.json';
import Sex from '../assets/sex.json';

let AnimeDescription = "Slice through this assortment of anime's ranging from all sorts of popularity!";

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
  
  //Fill in Sets
  populateSet(animeSet, Anime);
  populateSet(animalsSet, Animal);
  populateSet(kPopSet, Kpop);
  populateSet(pokemonSet, Pokemon);
  populateSet(sexSet, Sex);
  populateSet(leagueSet, Champions);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose a Deck</Text>
          </View>
          <View style={[styles.horiLine, {marginBottom: 20}]}/>
          <View style={styles.form}>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: animeSet, description: AnimeDescription})} title = 'Anime'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: animalsSet})} title = 'Animals'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: kPopSet})} title = 'K-Pop Groups'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: pokemonSet} )} title = 'Pokemon'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: sexSet} )} title = 'S*x'/>
            <PlayButton onPress = {() => navigation.navigate('Description', {set: leagueSet} )} title = 'LOL'/>
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