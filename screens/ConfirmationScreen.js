import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';


const ConfirmationScreen = ({ route }) => {
  const { user, orderDetails } = route.params;
  const navigation = useNavigation();
 

  const handleDownloadInvoice = async () => {
    try {
      // Destructure user and orderDetails to access the required information
      const { firstName, lastName, address1, address2, phone, email } = user;
      const { paymentMethod, deliveryMethod, total } = orderDetails;

      // Generate HTML content dynamically
      const htmlContent = `
        <html>
          <body>
            <h1>Invoice</h1>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Address 1: ${address1}</p>
            <p>Address 2: ${address2}</p>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Payment Method: ${paymentMethod}</p>
            <p>Delivery Method: ${deliveryMethod}</p>
            <p>Total: ${total}</p>
          </body>
        </html>
      `;

      if (Platform.OS === 'web') {
        // Fallback for web platform
        const blob = new Blob([htmlContent], { type: 'application/pdf' });
      
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'invoice.pdf';
        document.body.appendChild(link); // Append the link to the body
        link.click();
        document.body.removeChild(link); // Remove the link from the body
      }
       else {
        // For mobile platforms (iOS, Android)
        const { uri } = await Print.printToFileAsync({ html: htmlContent });

        // Download the file using FileSystem
        const downloadResult = await FileSystem.downloadAsync(
          uri,
          `${FileSystem.documentDirectory}invoice.pdf`
        );

        if (downloadResult.status === 200) {
          // The file has been downloaded successfully
          console.log('PDF downloaded', downloadResult.uri);

          // Navigate back to the home screen
          navigation.navigate('Home');
          
        } else {
          // Handle download failure
          console.error('PDF download failed', downloadResult);
        }
      }
    } catch (error) {
      console.error('Error generating or downloading PDF', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Payment Successful!</Text>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadInvoice}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  downloadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
