import {
    chakra, Container, Stack, HStack,
    VStack, Flex, Text, Image, Box, Heading, Button
} from '@chakra-ui/react';
import {useState} from "react";

function UsernameForm() {
    return (
        <form>
            <label>
                Username:
                <input type="text" name="username"/>
            </label>
        </form>
    );
}

function OAuthQRCodeForm() {
    return (
        <form>
            <p>Scan this QR code to sign in with OAuth.</p>
            {/* Placeholder for QR code */}
            <div className="qr-code-placeholder"></div>
        </form>
    );
}

function UploadPhotoForm() {
    return (
        <form>
            <label>
                Upload your profile photo:
                <input type="file" name="photo" accept="image/*"/>
            </label>
            <button type="submit">Upload</button>
        </form>
    );
}

function PaymentDetailsForm() {
    return (
        <form>
            <label>
                Payment Details:
                <input type="text" name="payment-details"/>
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

const overviewList = [
    {
        id: 1,
        label: 'Join the Party',
        subLabel: 'How to Use Metamask',
        form: 'UsernameForm',
        formLabel: 'Pick a username'

    },

    {
        id: 2,
        label: 'We got your back.',
        subLabel: 'security, authentication, safety',
        form: 'OAuthQRCodeForm',
        formLabel: 'Authenticate'

    },
    {
        id: 3,
        label: 'Expression and Creativity',
        subLabel: 'profile, photos, & content',
        form: 'UploadPhotoForm',
        formLabel: 'Add an avatar'

    },
    {
        id: 4,
        label: 'Earn Money',
        subLabel: 'gigs, clients, payments',
        form: 'PaymentDetailsForm',
        formLabel: 'Payment Details'

    }
];

function get_ol(which) {
    for (let o of overviewList) {
        if (o.id.toString() === which.toString()) {
            return o
        }
    }
}


const OverviewSection = () => {
    const [currentStepId, setCurrentStepId] = useState(1);


    function FormStep() {
        const curo = get_ol(currentStepId)

        // Render the form based on the current step
        // The forms will need to be defined or imported. Here's just a placeholder.
        const currentStepLabel = curo.label
        return <div>
            <form aria-labelledby={`form-step-${currentStepId}`}>
            </form>
            <Stack align="center">
                <Heading fontSize="2xl">{currentStepLabel}</Heading>
            </Stack>
        </div>

    }

    function OverviewForm() {
        // Form for current step
        const formComponents = {
            UsernameForm: <UsernameForm/>,
            OAuthQRCodeForm: <OAuthQRCodeForm/>,
            UploadPhotoForm: <UploadPhotoForm/>,
            PaymentDetailsForm: <PaymentDetailsForm/>
        };
        let targetName = null;
        for (let o of overviewList) {
            if (o.id.toString() === currentStepId.toString()) {
                targetName = o.form
            }
        }
        if (!targetName) {
            console.log(new Error("No form was fuound"))
        }
        const step = get_ol(currentStepId)
        const CurrentFormComponent = formComponents[targetName]
        return (
            <VStack>
                <Box>
                    <div aria-labelledby={`form-step-${step.id}`}>

                        <h2 id={`form-step-${step.id}`}>{step.formLabel}</h2>


                        {CurrentFormComponent}
                    </div>
                </Box>
                <Box pt={2}>
                    <Button>Next</Button>
                </Box>
            </VStack>

        );
    }

    function OverviewHighlights() {
        // Carousel that displays highlights for the steps

        // Assume there's a way to cycle through the steps,
        // potentially with a timer or arrow buttons

        return (
            <Box>
                {overviewList.map((step) =>
                    <Box key={step.id} display={step.id === currentStepId ? 'block' : 'none'}>
                        <Text fontSize="lg">{step.label}</Text>
                        <Text fontSize="md">{step.subLabel}</Text>
                    </Box>
                )}
            </Box>
        );
    }


    function OnboardingSteps() {


        // This function will change the current step, cycling through the steps
        // This could be triggered by a timer, or user interaction such as button clicks


        return (
            <Container>
                {/* Navigation/Steps indicator could go here */}
                <Flex direction={"column"}>

                    <FormStep/>

                    <OverviewForm/>
                </Flex>


            </Container>
        );
    }


    return (
        <Container maxW="6xl" py={10}>
            <chakra.h2 fontSize="4xl" fontWeight="bold" textAlign="center" mb={2}>
                Let's Go!
            </chakra.h2>
            <Stack
                direction={{base: 'column', md: 'row'}}
                spacing={{base: 0, md: 3}}
                justifyContent="center"
                alignItems="center"
            >
                <VStack spacing={4} alignItems="flex-start" mb={{base: 5, md: 0}} maxW="md">
                    {overviewList.map((data) => (
                        <Box key={data.id}>
                            <HStack spacing={2}>
                                <Flex
                                    fontWeight="bold"
                                    boxShadow="md"
                                    color="white"
                                    bg="blue.400"
                                    rounded="full"
                                    justifyContent="center"
                                    alignItems="center"
                                    w={10}
                                    h={10}
                                >
                                    {data.id}
                                </Flex>
                                <Text fontSize="xl">{data.label}</Text>
                            </HStack>
                            <Text fontSize="md" color="gray.500" ml={12}>
                                {data.subLabel}
                            </Text>
                        </Box>
                    ))}
                </VStack>
                <VStack>
                    <OnboardingSteps/>

                </VStack>
            </Stack>
        </Container>

    );
};

export default OverviewSection;