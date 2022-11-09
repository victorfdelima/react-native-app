import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* import screen for navigation */
import HomeScreen from './Views/ClientList/UserList'
import UserDetails from './Views/Details/UserDetails'
import CreateNewUser from './Views/NewClient/CreateNewUser'
import Login from './Views/Login/Login'
import Register from './Views/NewUser/Register';
/* create stack for navigation */

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
          name='Login' 
          component={Login} 
          options={{
            headerShown: false,
          }}/>
      <Stack.Screen 
          name='Register' 
          component={Register} 
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen 
          name='Users List' 
          component={HomeScreen} 
          options={{title: 'Clientes Cadastrados'}}/>
        <Stack.Screen 
          name='User Details'
          component={UserDetails}
          options={{title: 'Editar ou visualizar Cliente'}}/>
        <Stack.Screen 
          name='Create New User'
          component={CreateNewUser}
          options={{title: 'Cadastrar novo Cliente'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}