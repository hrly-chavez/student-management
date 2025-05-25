import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you export 'db' from your firebase config

interface Student {
  fname: string;
  lname: string;
  course: string;
  idNumber: string;
  sex: string;
  birthDate: string;
}

export default function AddStudentScreen() {
  const [student, setStudent] = useState<Student>({
    fname: '',
    lname: '',
    course: '',
    idNumber: '',
    sex: '',
    birthDate: '',
  });

  const router = useRouter();

  const handleChange = (key: keyof Student, value: string) => {
    setStudent(prev => ({ ...prev, [key]: value }));
  };

  const handleAddStudent = async () => {
    const { fname, lname, course, idNumber, sex, birthDate } = student;

    if (!fname || !lname || !course || !idNumber || !sex || !birthDate) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'students'), student);
      Alert.alert('Success', 'Student added successfully!');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to add student.');
      console.error('Add Student Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={student.fname}
        onChangeText={(text) => handleChange('fname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={student.lname}
        onChangeText={(text) => handleChange('lname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={student.course}
        onChangeText={(text) => handleChange('course', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Number"
        value={student.idNumber}
        onChangeText={(text) => handleChange('idNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex"
        value={student.sex}
        onChangeText={(text) => handleChange('sex', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date (YYYY-MM-DD)"
        value={student.birthDate}
        onChangeText={(text) => handleChange('birthDate', text)}
      />
      <Button title="Save Student" onPress={handleAddStudent} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});



