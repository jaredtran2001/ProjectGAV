import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const WordGetter = (props) => {
    async function generateWord(wordSet) {
        let items = Array.from(wordSet);
        let word = items[Math.floor(Math.random() * items.length)];
        wordSet.delete(word);
        return word;
    }
    let output = generateWord(props.set);
    return (
        <Text style = {styles.text}>{output}</Text>
    );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: 500,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  }
});

export default WordGetter;