import React, { useState } from 'react';
import { TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';

const SearchBar = (props) =>
{
	const dispatch = useDispatch();
	const [search, setsearch] = useState(null);

	return (
		<View>

			<TextInput
				style={{
					padding: 10,
					paddingTop: 50,
				}}
				inputAccessoryViewID={inputAccessoryViewID}
				onChangeText={text => setsearch(text)}
			/>
			<Button style={buttonStyle} onClick={() =>
			{
				dispatch({ type: 'SEARCH', search: search })
			}} title='OK' />


		</View >
	);
}

export default SearchBar;