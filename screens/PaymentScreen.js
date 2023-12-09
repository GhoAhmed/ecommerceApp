// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const PaymentScreen = ({ route }) => {
    const { total } = route.params;
    const navigation = useNavigation();
    const { dispatch } = useCart();

  // State for form fields
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleConfirmPayment = () => {
    if (!paymentMethod || !deliveryMethod || !phone || !email || !address1 || !firstName || !lastName) {
        setIsModalVisible(true);
        return;
    }

     // Pass the user and order details to ConfirmationScreen
        const user = { firstName, lastName, address1, address2, phone, email };
        const orderDetails = { paymentMethod, deliveryMethod };

    // Clear the cart
    dispatch({ type: 'CLEAR_CART' });
        
    // Navigate to the ConfirmationScreen
    navigation.navigate('Confirmation', { user, orderDetails, total });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 1"
        onChangeText={text => setAddress1(text)}
        value={address1}
      />
      <TextInput
        style={styles.input}
        placeholder="Address 2"
        onChangeText={text => setAddress2(text)}
        value={address2}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
        value={lastName}
      />

      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Payment Method:</Text>
        <Picker
          selectedValue={paymentMethod}
          onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Paypal" value="paypal" />
          <Picker.Item label="Visa" value="visa" />
          <Picker.Item label="Cash on Delivery" value="cash" />
          {/* Add more payment methods as needed */}
        </Picker>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Delivery Method:</Text>
        <Picker
          selectedValue={deliveryMethod}
          onValueChange={(itemValue, itemIndex) => setDeliveryMethod(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="Aramex" value="aramex" />
          <Picker.Item label="ExpressDel" value="expressdel" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
      {/* Modal for displaying the alert */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Missing Information</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    picker: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
    },
    confirmButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    confirmButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    // Styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
