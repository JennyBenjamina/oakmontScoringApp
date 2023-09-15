import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const ScoreCard = () => {
  const scoreCard = [
    {
      text: ['Hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Out'],
    },
    {
      text: ['Yards', '1', '2', '3', '4', '5', '6', '7', '8', '9', '3500'],
    },
    {
      text: ['Par', '5', '4', '3', '4', '3', '4', '4', '5', '4', '36'],
    },
    {
      text: ['stroke index', '1', '2', '3', '4', '5', '6', '7', '8', '9', ''],
    },
    {
      text: ['Player 1', '', '', '', '', '', '', '', '', '', ''],
    },
    {
      text: ['Player 2', '', '', '', '', '', '', '', '', '', ''],
    },
  ];

  const userScore = [
    {
      text: ['Score', '', '', '', '', '', '', '', '', '', ''],
    },
    { text: ['Adj Score', '', '', '', '', '', '', '', '', '', ''] },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.insideContainerTitles}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
        <View style={styles.insideContainer}>
          {scoreCard.map((row) => (
            <FlatList
              data={row.text}
              numColumns={11}
              style={{
                flex: 1,
                flexDirection: 'row',
                // borderWidth: 1,
                // padding: 40,
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    // flexDirection: 'row',
                    // margin: 0,
                    borderWidth: 1,
                  }}
                >
                  <Text style={{}}>{item}</Text>
                </View>
              )}
            />
          ))}
        </View>
      </View>
      <View style={styles.container}></View>
    </>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  insideContainerTitles: {
    flex: 1,
    backgroundColor: 'pink',
  },
  insideContainer: {
    flex: 8,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    // height: 50,
    flex: 1,
    // width: 50,
  },
});
