import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Details() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Details' }} />
    </View>
  );
}
