import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: { backgroundColor: 'black', paddingTop: 5 },
      }}>
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="home" size={25} color={color} /> }}
      />
      <Tabs.Screen
        name="tracking"
        options={{ tabBarIcon: ({ color }) => <Ionicons name="water" size={25} color={color} /> }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="dumbbell" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="myworkouts"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="arm-flex" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="user" size={25} color={color} /> }}
      />
    </Tabs>
  );
}
