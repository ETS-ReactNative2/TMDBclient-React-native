import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '@components/SearchBar';
import { ColorConstants, NavigationConstants } from '@constants';
import ConnectedMenu from '@components/ConnectedMenu';
import TopOrDiscoverChoice from '@components/TopOrDiscoverChoice';
import MoviesReducer from '@reducers/MoviesReducer';
import { useNavigation } from '@react-navigation/native';

const Home = () =>
{
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() =>
  {
    dispatch(MoviesReducer.actions.startingApp())
  }, [])

  useEffect(() =>
  {
    const currentRoute = navigation.addListener('tabPress', e =>
    {
      dispatch(MoviesReducer.actions.resetCurrentMovie())
      navigation.navigate(NavigationConstants.MOVIE_LIST)
    });
    return currentRoute;
  }, [navigation])

  const connexion = useSelector(state => state.UserReducer.connexion);

  return (
    <View style={{ flex: 1, backgroundColor: ColorConstants.BACK_FIRST }}>
      <Text style={styles.title}>MOVIE TRACKER</Text>
      <SearchBar />
      <TopOrDiscoverChoice />
      {connexion ? <ConnectedMenu /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: ColorConstants.TEXT,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Home;