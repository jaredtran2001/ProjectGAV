import { Component, React } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayButton from '../components/PlayButton';
import Champions from '../assets/lolChampions.json';


function populateSet(set, json ) {
  for(let i = 0; i < json.length; i++) {
    set.add(json[i].name);
  }
}

const Selection = ({navigation}) => {
  
  function generateFirstWord(wordSet){
    let items = Array.from(wordSet);
    let word = items[Math.floor(Math.random() * items.length)];
    wordSet.delete(word);
    return word;
  }

  //Initialize Sets
  let animeSet = new Set();
  let animalsSet = new Set();
  let kPopSet = new Set();
  let pokemonSet = new Set();
  let sexSet = new Set();
  let leagueSet = new Set();
  
  //Fill in Sets
  animeSet.add("One Piece").add("Naruto").add("Blue Lock").add("Hunter x Hunter").add("AOT").add("Dragon Ball Z").add("SpyxFamily").add("Haikyu").add("My Hero Academia").add("JoJo's Bizarre Adventure").add("Jujutsu Kaisen").add("Chainsaw Man").add("Shield Hero").add("Full Metal Alchemist").add("Mushi-shi").add("Fairy Tale").add("Cowboy Bebop").add("Tatami Galaxy").add("Kabaneri of the Iron Fortress").add("Sailor Moon").add("Mob Psycho 100").add("Berserk").add("Yuri on Ice").add("Black Clover").add("SAO");
  animalsSet.add("Raccoon").add("Tiger").add("Swordfish").add("Lion").add("Hippo").add("Giraffe").add("Spider").add("Alligator").add("Turtle").add("Rabbit").add("Crow").add("Snake").add("Polar Bear").add("Chimpanzee").add("Horse").add("Unicorn").add("Squid");
  kPopSet.add("G-Dragon").add("Jay Park").add("Jisoo").add("Jennie").add("Jin").add("Jimin").add("Suga").add("V").add("Chen").add("Taeyang").add("Hyojung").add("Mimi").add("Yubin");
  pokemonSet.add("Pikachu").add("Eevee").add("Charizard").add("Snorlax").add("Gyarados").add("Meowth").add("Raichu").add("Mewtwo").add("Psyduck");
  sexSet.add("Doggy").add("Missionary").add("Cowgirl").add("Reverse Cowgirl").add("BJ").add("69").add("Choke").add("Anal").add("Saddling").add("Scissoring").add("Squat").add("Reverse Squat").add("Sucking Toes").add("Sucking Fingers").add("G-Spot").add("Clitoris").add("Balls").add("Sucking Ears").add("Handjob").add("Threesome").add("Foursome").add("Orgy").add("Orgasm").add("Nutting").add("Facial").add("Creampie");
  populateSet(leagueSet, Champions);

  //Create first words
  let firstAnimeWord = generateFirstWord(animeSet);
  let firstAnimalWord = generateFirstWord(animalsSet);
  let kPopFirstWord = generateFirstWord(kPopSet);
  let pokemonFirstWord = generateFirstWord(pokemonSet);
  let sexFirstWord = generateFirstWord(sexSet);
  let leagueFirstWord = generateFirstWord(leagueSet);
  return (
    <View style={styles.container}>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: animeSet, firstWord: firstAnimeWord})} title = 'Anime'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: animalsSet, firstWord: firstAnimalWord})} title = 'Animals'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: kPopSet, firstWord: kPopFirstWord})} title = 'K-Pop Stars'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: pokemonSet, firstWord: pokemonFirstWord} )} title = 'Pokemon'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: sexSet, firstWord: sexFirstWord} )} title = 'S*x'/>
        <PlayButton onPress = {() => navigation.navigate('Load', {set: leagueSet, firstWord: leagueFirstWord} )} title = 'LOL'/>
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