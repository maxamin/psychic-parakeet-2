// PerformerCard.jsx
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const PerformerCard = ({ name, description, imageSrc }) => {
    return (
        <Box textAlign="center" p="4">
            <Image src={imageSrc} alt={name} mb="3" borderRadius="full" boxSize="150px" />
            <Heading as="h3" size="md" mb="2">
                {name}
            </Heading>
            <Text>{description}</Text>
        </Box>
    );
};

export default PerformerCard;
