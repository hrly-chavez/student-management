import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure db is exported from firebase.ts

export default function HomeScreen() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'students'));
      const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/add-student')}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.idNumber}</Text>
            <Text style={styles.cell}>{item.fname} {item.lname}</Text>
            <Text style={styles.cell}>{item.course}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No students found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginBottom: 15 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', marginBottom: 10 },
  cell: { flex: 1, fontSize: 16 },
});
