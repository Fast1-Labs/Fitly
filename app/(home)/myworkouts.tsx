import { useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateWorkout from '~/components/CreateWorkout';
import WorkoutListItem from '~/components/WorkoutListItem';
import { useWorkoutStore } from '~/store/useWorkoutStore';

export default function WorkoutHistory() {
  const { userId } = useAuth();
  const { fetchWorkouts, workouts, deleteWorkout } = useWorkoutStore();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchWorkouts(userId);
    }
    setLoading(false);
  }, []);

  const handleDeleteWorkout = (id: string) => {
    Alert.alert('Delete Workout', 'Are you sure you want to delete this workout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteWorkout(id),
      },
    ]);
  };
  if (loading) return <ActivityIndicator className="self-center" size="large" />;

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView className="flex-1">
        <View className="border-b-hairline border-gray-300 p-6">
          <Text className="text-2xl font-bold text-green-500">Create Your Own Workout</Text>
        </View>
        <View className="flex-1 p-4">
          {workouts.length > 0 ? (
            <FlashList
              data={workouts}
              estimatedItemSize={workouts.length}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="flex-row items-center gap-2">
                  <WorkoutListItem item={item} />
                  <View className="gap-2">
                    <Link asChild href={`/edit/${item.id}`}>
                      <Pressable>
                        <FontAwesome name="edit" size={25} color="gray" />
                      </Pressable>
                    </Link>
                    <Pressable
                      onPress={() => handleDeleteWorkout(item.id.toString())}
                      className="justify-end">
                      <FontAwesome name="trash" size={25} color="red" />
                    </Pressable>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">
              No workouts have been found! Lets create one!
            </Text>
          )}
        </View>
        <Pressable
          className="absolute bottom-4 right-4 rounded-full bg-green-500 p-4"
          onPress={() => setModalVisible(true)}>
          <FontAwesome name="plus" size={20} color="black" />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <CreateWorkout userId={userId ?? ''} onClose={() => setModalVisible(false)} />
        </Modal>
      </SafeAreaView>
    </View>
  );
}
