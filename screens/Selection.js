import { Component, React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayButton from '../components/PlayButton';

const Selection = ({navigation}) => {
  
  function generateFirstWord(wordSet){
    let items = Array.from(wordSet);
    let word = items[Math.floor(Math.random() * items.length)];
    wordSet.delete(word);
    console.log(word);
    return word;
  }

  //Initialize Sets
  let animeSet = new Set();
  let animalsSet = new Set();
  let kPopSet = new Set();
  let pokemonSet = new Set();
  
  //Fill in Sets
  animeSet.add("one piece").add("naruto").add("blue lock").add("hunterxhunter").add("AOT").add("Dragon Ball Z").add("SpyxFamily").add("Haikyu").add("My Hero Academia").add("JoJo's Bizarre Adventure").add("Jujutsu Kaisen").add("Chainsaw Man").add("Shield Hero").add("Full Metal Alchemist");
  animalsSet.add("raccoon").add("tiger").add("swordfish").add("lion").add("hippo").add("giraffe").add("spider").add("alligator").add("turtle").add("rabbit").add("crow").add("snake");
  kPopSet.add("G-Dragon").add("Jay Park").add("Jisoo").add("Jennie").add("Jin").add("Jimin").add("Suga").add("V").add("Chen").add("Taeyang").add("Hyojung").add("Mimi").add("Yubin");
  pokemonSet.add("Pikachu").add("Eevee").add("Charizard").add("Snorlax").add("Gyarados").add("Meowth").add("Raichu").add("Mewtwo").add("Psyduck");
  
  //Create first words
  let firstAnimeWord = generateFirstWord(animeSet);
  let firstAnimalWord = generateFirstWord(animalsSet);
  let kPopFirstWord = generateFirstWord(kPopSet);
  let pokemonFirstWord = generateFirstWord(pokemonSet);
  return (
    <View style={styles.container}>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: animeSet, firstWord: firstAnimeWord})} title = 'Anime'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: animalsSet, firstWord: firstAnimalWord})} title = 'Animals'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: kPopSet, firstWord: kPopFirstWord})} title = 'K-Pop Stars'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: pokemonSet, firstWord: pokemonFirstWord} )} title = 'Pokemon'/>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Selection;