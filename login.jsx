import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerText}>Login Here</Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <AntDesign name="heart" size={32} color="#fff" />
          <AntDesign
            name="plus"
            size={16}
            color="#000"
            style={styles.plusIcon}
          />
        </View>

        <Text style={styles.title}>Admin Login</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Feather
              name={hidePassword ? 'eye-off' : 'eye'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default AdminLoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EF2C2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 28,
  },

  card: {
    backgroundColor: '#EFFFF8',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: 40,
  },

  iconCircle: {
    alignSelf: 'center',
    backgroundColor: '#222',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  plusIcon: {
    position: 'absolute',
    bottom: 14,
    right: 18,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },

  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },

  loginButton: {
    backgroundColor: '#0C9A8D',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  
})


