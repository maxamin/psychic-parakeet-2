import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  VStack,
  useToast,
  Canvas,
} from '@chakra-ui/react';
import { FaBarcode } from 'react-icons/fa';

const fakeHttpPost = (endpoint, data) => {
  console.log(`Posting to ${endpoint}:`, data);
  // Fake an HTTP POST request
  return new Promise((resolve) => setTimeout(resolve, 1000, { success: true }));
};

const hashCode = (s) => {
  // Simple hash function for demonstration purposes
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const generateBarcode = (hash) => {
  // We can't actually generate a barcode without a library,
  // so we just return a string representation of the hash
  return hash.toString();
};

const Component1 = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [paymentReceived, setPaymentReceived] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    await fakeHttpPost('/submit-email', { email });
    const hash = hashCode(email);
    const part1 = hash.toString(36).toUpperCase(); // Generate a part1 code
    const part2 = generateBarcode(hash); // Generate a barcode
    setCode(part1);
    setBarcode(part2);
    setLoading(false);
    setPaymentReceived(true);
    fakeHttpPost('/send-code', { email, code: part1, barcode: part2 });
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit} isLoading={loading}>
        Submit
      </Button>
      {loading && <Spinner />}
      {paymentReceived && (
        <Box>
          <Text>Payment received</Text>
          <Text>Code: {code}</Text>
          <Text>Barcode: {barcode}</Text>
        </Box>
      )}
    </VStack>
  );
};

const Component2 = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    // For now, since we can't actually compare with a server-stored value,
    // we'll just simulate a success if the entered code is not empty.
    if (code && hashCode(email).toString(36).toUpperCase() === code) {
      setError('');
      toast({
        title: 'Success',
        description: 'The code matches the email',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setError('Error: Code and email do not match.');
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Enter your code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleVerify}>Verify</Button>
      {error && <Text color="red.500">{error}</Text>}
    </VStack>
  );
};

const Index = () => {
  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Component1 />
        <Component2 />
      </VStack>
    </Box>
  );
};

export default Index;
