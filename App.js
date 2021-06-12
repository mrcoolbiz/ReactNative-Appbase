// BASE
import React, {Component} from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";

// NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// UI KITTEN
import * as eva from "@eva-design/eva";
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { default as theme } from "./assets/styles/custom-theme.json";

// SCREENS
import HomeScreen from "./screens/HomeScreen";

const {Navigator, Screen} = createBottomTabNavigator()

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      theme: "dark",
      fontLoaded: false,
      dbReady: false,
    };
  }

  componentDidMount = async() => {
    // Load Fonts
    await Font.loadAsync({
      laSolid: require("./assets/fonts/la-solid-900.ttf"),
    }).then(() => {
      console.log("Font was Loaded");
      this.setState({
        fontLoaded: true,
      });
    });
  }

  render() {

  const Stack = createStackNavigator();
  const currentTheme = this.state.theme;

  const BottomTabBar = ({navigation, state}) => (
    <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])} style={{paddingBottom: 20, paddingTop: 10}}>
      <BottomNavigationTab
        title={(evaProps) => <Text {...evaProps}>Home</Text>}
        icon={(props) => (
          <Text {...props} style={{ fontFamily: "laSolid", fontSize: 20 }}>
            &#xf015;
          </Text>
        )}
      />
    </BottomNavigation>
  )

  const TabNavigator = () => (
    <Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='Home' component={HomeScreen} initialParams={{...this.state}}/>
    </Navigator>
  )

  function AppSys() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeStack" component={TabNavigator} />
      </Stack.Navigator>
    )
  }

  if (this.state.fontLoaded) {
    return (
      <ApplicationProvider {...eva} theme={{...eva[this.state.theme], ...theme}}>
          <NavigationContainer>
            {/* Status Bar */}
            <StatusBar
            barStyle={
              currentTheme == "light" ? "dark-content" : "light-content"
            }
            hidden={false}
            translucent={true}
            />
            <AppSys />
          </NavigationContainer>
        </ApplicationProvider>
    );
  } else {
    return (
      <ApplicationProvider {...eva} theme={{...eva[this.state.theme], ...theme}}>
        <Layout>
          {/* Status Bar */}
          <StatusBar
            barStyle={
              currentTheme == "light" ? "dark-content" : "light-content"
            }
            hidden={false}
            translucent={true}
          />
          <Text>Loading...</Text>
        </Layout>
      </ApplicationProvider>
    );
  }
}
}
