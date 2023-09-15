import { FlatList, SectionList, StyleSheet } from 'react-native';

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

const scroll = () => {
  const [scorecardData, setScorecardData] = useState([]);

  const fetchScorecardData = async () => {
    const res = await fetch('http://192.168.1.69:4000/scorecard');
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const getScorecardData = async () => {
      const scorecardDataFromServer = await fetchScorecardData();
      setScorecardData(scorecardDataFromServer);
    };
    getScorecardData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.taskTitle}>ScoreCard</Text> */}
      <View style={{}}>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#92977E' }]}>
          Hole
        </Text>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#FEFCAD' }]}>
          Yards
        </Text>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#E6E18F' }]}>
          Par
        </Text>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#FEFCAD' }]}>
          Stroke Index
        </Text>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#FEFCAD' }]}>
          Score
        </Text>
        <Text style={[styles.scorecardHeaders, { backgroundColor: '#E6E18F' }]}>
          Adj. Score
        </Text>
      </View>
      <SectionList
        style={{
          backgroundColor: 'red',
          //   margin: 40,
          //   padding: 10,
        }}
        sections={scorecardData}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) => (
          <>
            {section.horizontal ? (
              <FlatList
                style={{ backgroundColor: 'purple' }}
                horizontal
                data={section.data}
                renderItem={({ item }) => (
                  <View style={styles.taskItem}>
                    <Text
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#92977E' },
                      ]}
                    >
                      {item.hole}
                    </Text>
                    <Text
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#FEFCAD' },
                      ]}
                    >
                      {item.yards}
                    </Text>
                    <Text
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#E6E18F' },
                      ]}
                    >
                      {item.par}
                    </Text>
                    <Text
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#FEFCAD' },
                      ]}
                    >
                      {item.strokeIndex}
                    </Text>
                    <TextInput
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#FEFCAD' },
                      ]}
                    />
                    <TextInput
                      style={[
                        styles.scorecardInside,
                        { backgroundColor: '#E6E18F' },
                      ]}
                    />
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            ) : null}
          </>
        )}
        renderItem={({ item, section }) => {
          return null;
        }}
      />
    </View>
  );
};

export default scroll;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    // borderWidth: 3,
    // flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  taskItem: {
    // padding: 10,
    // marginVertical: 15,
    fontSize: 10,
    // borderWidth: 1,
    width: 40,
    backgroundColor: 'yellow',
  },
  taskTitle: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  scorecardHeaders: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 30,
    backgroundColor: 'blue',
    width: 40,
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#80B192',
  },
  scorecardInside: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#80B192',
    height: 30,
  },
});
