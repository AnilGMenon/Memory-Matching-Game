import React from 'react';
import {StyleSheet, View, TouchableHighlight, Image} from "react-native";

export default class Cards extends React.Component {
    render() { 
        //setting a default card image
        let url= 'https://dwglogo.com/wp-content/uploads/2017/11/Shopify_logo_01.png';

        if (this.props.open) {
        url = this.props.url;
        }

        return (
        <View style={styles.card}>
            <TouchableHighlight
                onPress={this.props.onClick}
                underlayColor={"#f1f1f1"}
            >
                <Image 
                    style={{
                        width: 100,
                        height: 100,
                    }} 
                    ref="image" 
                    source={{uri: url}} 
                />
            </TouchableHighlight>
        </View>
        )
    }
    
}
const styles = StyleSheet.create({
    card: {
      flex: 1,
      alignItems: "center"
    },
    card_text: {
      fontSize: 40,
      fontWeight: "bold"
    }
  })