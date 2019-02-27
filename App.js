/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import HomeScreen from "./src/screen/HomeScreen";
import {Provider} from 'react-redux'
import Store from "./src/Store/configureStore"


export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <HomeScreen/>
            </Provider>
        )
    }
}


