import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, SafeAreaView, View, TouchableHighlight, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ColorConstants, NavigationConstants } from '@constants';
import MoviesReducer from '@reducers/MoviesReducer';

const MovieList = () =>
{
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const discoverMovies = useSelector(state => state.MoviesReducer.discoverMovies);
  const topMovies = useSelector(state => state.MoviesReducer.topMovies);
  const watchList = useSelector(state => state.UserReducer.watchList);
  const watchedList = useSelector(state => state.UserReducer.watchedList);
  const searchedMovie = useSelector(state => state.MoviesReducer.searchedMovie);
  const filter = useSelector(state => state.MoviesReducer.filter);

  let list;
  switch (filter) {
    case 'TOP':
      list = topMovies;
      break;
    case 'DISCOVER':
      list = discoverMovies;
      break;
    case 'SEARCH':
      list = searchedMovie;
      break;
    case 'LISTE':
      list = watchList;
      break;
    case 'VU':
      list = watchedList;
      break;

    default:
      list = discoverMovies;
      break;
  }

  const renderList = movie =>
  {
    return (
      <TouchableHighlight
        onPress={() =>
        {
          dispatch(MoviesReducer.actions.setCurrentMovie(movie.id))
          navigation.navigate(NavigationConstants.MOVIE);
        }}
      >
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/original/' + movie.poster_path, }}
          style={{ width: 180, height: 250, marginBottom: 20, borderRadius: 8 }}
          key={`${movie.original_title}`}
        />
      </TouchableHighlight>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList
          data={list}
          renderItem={({ item }) => renderList(item)}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <Text style={styles.title}>{filter}</Text>}
          numColumns={2}
          refreshing={true}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          initialNumToRender={6}
          removeClippedSubviews={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: ColorConstants.TEXT,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MovieList;
