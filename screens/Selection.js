import { Component, React } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PlayButton from '../components/PlayButton';
import Champions from '../assets/lolChampions.json';
import Anime from '../assets/anime.json';
import Animal from '../assets/animal.json';
import Kpop from '../assets/kpop.json';
import Pokemon from '../assets/pokemon.json';
import Sex from '../assets/sex.json';


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
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose a Deck</Text>
          </View>
          <View style={styles.form}>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: animeSet})} title = 'Anime'/>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: animalsSet})} title = 'Animals'/>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: kPopSet})} title = 'K-Pop Groups'/>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: pokemonSet} )} title = 'Pokemon'/>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: sexSet} )} title = 'S*x'/>
            <PlayButton onPress = {() => navigation.navigate('Load', {set: leagueSet} )} title = 'LOL'/>
          </View>
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
        backgroundColor: "#466594"
    },
    header: {
      height: 220,
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
      flexWrap: 'wrap',
      width: "100%",
    },
    footer: {
      width: "100%",
      height: 50,
    }
});

export default Selection;