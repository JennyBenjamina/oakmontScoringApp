import { FlatList, SectionList, StyleSheet } from 'react-native';

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Player, ScoreCardProps } from '../types/player';

import { useUser } from '@clerk/clerk-expo';

import { ScorecardData } from '../types/player';

const ScoreCard: React.FC<ScoreCardProps> = ({
  players,
  notEditable,
  handleScoreChange,
  roomId,
}) => {
  const initialScorecardData: ScorecardData = {
    title: '',
    horizontal: false,
    data: [],
  };

  const { user } = useUser();

  const [scorecardData, setScorecardData] = useState(initialScorecardData);

  const fetchScorecardData = async () => {
    const res = await fetch('http://192.168.1.69:4000/scorecard');
    const data = await res.json();

    return data;
  };

  // CREATE SCORECARD DATA!

  useEffect(() => {
    const getScorecardData = async () => {
      const scorecardDataFromServer = await fetchScorecardData();
      setScorecardData(scorecardDataFromServer);
    };
    getScorecardData();
    console.log(user?.id);
  }, []);

  const handleScoreChange2 = (playerId: number, id: string, eScore: number) => {
    // export interface roomData {
    //   id: number;
    //   title: string;
    //   player: Player[];
    // }

    const itemToUpdate = scorecardData.data.find((item: any) => item.id === id);

    const outScoreUpdate = scorecardData.data.find(
      (item: any) => item.hole === 'out'
    );

    const inScoreUpdate = scorecardData.data.find(
      (item: any) => item.hole === 'in'
    );

    const totalScoreUpdate = scorecardData.data.find(
      (item: any) => item.hole === 'total'
    );

    if (outScoreUpdate && Number(itemToUpdate?.hole) < 10) {
      let outScore = scorecardData.data
        .slice(0, 9)
        .reduce((acc: any, curr: any) => {
          return acc + Number(curr.score);
        }, 0);
      outScore = outScore + Number(eScore);
      outScoreUpdate.score = outScore.toString();
    }

    if (inScoreUpdate && Number(itemToUpdate?.hole) > 9) {
      let inScore = scorecardData.data
        .slice(10, 19)
        .reduce((acc: any, curr: any) => {
          return acc + Number(curr.score);
        }, 0);
      inScore = inScore + Number(eScore);
      inScoreUpdate.score = inScore.toString();
    }

    if (totalScoreUpdate) {
      const totalScore =
        Number(inScoreUpdate?.score) + Number(outScoreUpdate?.score);
      totalScoreUpdate.score = totalScore.toString();
    }

    if (itemToUpdate) {
      const currScore = eScore - itemToUpdate.par;
      if (currScore < 0) {
        itemToUpdate.background = 'red';
      } else if (currScore > 0) {
        itemToUpdate.background = 'blue';
      } else if (currScore === 0) {
        itemToUpdate.background = '#FEFCAD';
      }

      itemToUpdate.score = eScore.toString();

      const updatedData = scorecardData.data.map((item) =>
        item.id === id ? itemToUpdate : item
      );

      const updatedScorecardData = {
        ...scorecardData, // Keep other properties of the first section
        data: updatedData, // Replace the 'data' property with the updated data
      };
      // Include other sections if needed
      setScorecardData(updatedScorecardData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{}}>
          <Text
            style={[styles.scorecardHeaders, { backgroundColor: '#92977E' }]}
          >
            Hole
          </Text>
          <Text
            style={[styles.scorecardHeaders, { backgroundColor: '#FEFCAD' }]}
          >
            Yards
          </Text>
          <Text
            style={[styles.scorecardHeaders, { backgroundColor: '#E6E18F' }]}
          >
            Par
          </Text>
          <Text
            style={[styles.scorecardHeaders, { backgroundColor: '#FEFCAD' }]}
          >
            Stroke Index
          </Text>

          {/* add flatlist here of the players */}
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <Text
                style={[
                  styles.scorecardHeaders,
                  { backgroundColor: '#FEFCAD' },
                ]}
              >
                {item?.name}
              </Text>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        {scorecardData ? (
          <SectionList
            style={{
              backgroundColor: 'red',
              //   margin: 40,
              //   padding: 10,
            }}
            sections={[scorecardData]}
            // keyExtractor={(item) => item.id}
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
                        {notEditable ? (
                          <View>
                            {players.map((player) => (
                              <Text
                                key={player.id}
                                style={[
                                  styles.scorecardInside,
                                  { backgroundColor: item.background },
                                ]}
                              >
                                {player.scores.find(
                                  (score) => score.hole === item.hole
                                )?.score ?? ''}
                              </Text>
                            ))}
                          </View>
                        ) : (
                          <View>
                            {players.map((player) => (
                              <TextInput
                                onChangeText={(val) =>
                                  handleScoreChange(
                                    player.id,
                                    item.hole,
                                    Number(val),
                                    roomId
                                  )
                                }
                                keyboardType="numeric"
                                value={
                                  player.scores
                                    .find((score) => score.hole === item.hole)
                                    ?.score?.toString() ?? ''
                                }
                                style={[
                                  styles.scorecardInside,
                                  { backgroundColor: item.background },
                                ]}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <Text>Loading...</Text>
                )}
              </>
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          />
        ) : (
          <Text>loading</Text>
        )}
      </View>
    </View>
  );
};

export default ScoreCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    // borderWidth: 3,
    // flex: 1,
    // flexDirection: 'row',
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
