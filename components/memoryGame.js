import React from "react";
import { View, Text, FlatList, Alert} from "react-native";
import Cards from './cards';
import CardData from './cardData';

export default class MemoryGame extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      pairs: [],
      currentCard : [],
      score: 0
    }

    //creating clones for the 10 different cards already set
    let clone = JSON.parse(JSON.stringify(CardData));

    this.cards = CardData.concat(clone);
    this.cards.map(obj => {
      let id = Math.random()
        .toString(36)
        .substring(7);
      obj.id = id;
      obj.open = false;
    });

   }

   //Renders each card called by the renderItems attribut in
   //the main render flatlist component
   renderCards = ({ item }) => {
    return (
      <Cards
        key={item.id}
        url={item.url}
        open={item.open}
        onClick={this.onClick.bind(this, item.id)}
      />
    );
  };

  onClick = id => {
    let currentCard = this.state.currentCard;
    let pairs = [...this.state.pairs];
    let score = this.state.score;
    let cards = [...this.state.cards];
    let index = this.state.cards.findIndex(card => {
      return card.id == id;
    });

    //checks to see if selected card does not already have a pair
    if (cards[index].open == false && pairs.indexOf(cards[index].url) === -1) {
      cards[index].open = true;

      //sets the card in a temporary array (currentCard)that can be used to check with
      //for the next card click
      currentCard.push({
        index: index,
        url: cards[index].url
      });

      //if the next card matches the current card in the currentCard array, then set it in
      //pairs array
      if (currentCard.length == 2) {
        if (currentCard[0].url == currentCard[1].url) {
          score += 1;
          pairs.push(cards[index].url);

          //displays a pop up when user wins
          if (score == 10) {
            score = 10;
            Alert.alert(
              "Winner!",
              'Congratulations! You have won the game!',
              [{text: 'Reset', onPress: () => this.resetCards()}]
            );
          }
        } else {
          cards[currentCard[0].index].open = false;

          setTimeout(() => {
            cards[index].open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        currentCard = [];
      }

      this.setState({
        score: score,
        cards: cards,
        currentCard: currentCard
      });
    }
  }

  resetCards = () => {
    //close all cards
    let cards = this.cards.map(obj => {
      obj.open = false;
      return obj;
    });

    //update the state to reset the UI
    this.setState({
      currentCard: [],
      pairs: [],
      cards: cards,
      score: 0,
    });
  };

  componentDidMount() {
    this.setState({cards: this.cards});
  }

    render() {
      let contents = this.state.cards;

      //Setting all the style properties for different components
      const styles = {
        container: {
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "#fff"
        },
        body: {
          marginTop: 10
        },
        bottomContent: {
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center"
        },
        flatlistRow: {
          flex: 1,
          padding: 10
        },
        titleText: {
          marginTop: 20,
          justifyContent: 'center',
          alignContent: 'stretch',
          fontSize: 20,
          fontWeight: 'bold'
        },
        score: {
          fontSize: 40,
          fontWeight: "bold"
        },
      }
  
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Memory Matching Game</Text>
          <View style={styles.body}>
            <FlatList
              data={contents}
              renderItem={this.renderCards}
              numColumns={4}
              keyExtractor={item => item.id}
              columnWrapperStyle={styles.flatlistRow}
            />
          </View>
          <View style={styles.bottomContent}>
            <Text style={styles.score}>Score: {this.state.score}</Text>
          </View>
      </View>
    )
   }
}