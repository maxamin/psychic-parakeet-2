// BookingConfirmation.jsx
import { Box, Heading, Text } from '@chakra-ui/react';

const BookingConfirmation = ({ bookingDetails }) => {
    return (
        <Box id="confirmation" p="8">
            <Heading as="h2" size="xl" mb="6">
                Tempest Reserved!
            </Heading>
            <Text>Congratulations! You've successfully booked {bookingDetails.performerName} for an electrifying performance.
                Get ready to experience a night of unparalleled entertainment.</Text>

            <p>Tempest Reserved!
                Get ready for an electrifying experience. Your booking is confirmed.</p>
            <Box mt="4">
                <Text fontWeight="bold">Booking Details:</Text>
                <Text>Date: {bookingDetails.date}</Text>
                <Text>Time: {bookingDetails.time}</Text>
                <Text>Venue: {bookingDetails.venue}</Text>
                {/* Add more details as needed */}
            </Box>
            <Text mt="4">Stay tuned for further instructions and enjoy the anticipation of the tempest that awaits!</Text>
        </Box>
    );
};

export default BookingConfirmation;
