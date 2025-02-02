// BookingFlow.jsx
import { Box, Heading, FormControl, FormLabel, Input, Select, Button, Text } from '@chakra-ui/react';

const BookingFlow = () => {
  return (
    <Box id="booking" p="8">
      <Heading as="h2" size="xl" mb="6">
        Booking Made Effortlessly
      </Heading>

      <Text>Our user-friendly interface ensures a discreet and smooth booking process. Reserve your private performance with just a few clicks, bringing the NeonTempest experience directly to your doorstep.</Text>
     <Text>Select date, time, and venue. Confirm your booking with ease.

     </Text>

      <Box maxW="md" mx="auto">
        <form>
          <FormControl mb="4">
            <FormLabel htmlFor="date">Select Date:</FormLabel>
            <Input type="date" id="date" name="date" isRequired />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="time">Select Time:</FormLabel>
            <Input type="time" id="time" name="time" isRequired />
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="venue">Select Venue:</FormLabel>
            <Select id="venue" name="venue" isRequired>
              <option value="venue1">Venue 1</option>
              <option value="venue2">Venue 2</option>
              {/* Add more venue options as needed */}
            </Select>
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Confirm Booking
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default BookingFlow;
