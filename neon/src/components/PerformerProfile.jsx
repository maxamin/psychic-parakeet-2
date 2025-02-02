// PerformerProfile.jsx
import {
    Box, Heading, Text, Image, Button, useToast, Modal,
    ModalCloseButton, ModalBody, ModalHeader, ModalFooter, ModalContent, useDisclosure, ModalOverlay, Spinner
} from '@chakra-ui/react';
import React, {useState, useEffect, forwardRef} from 'react';
import InfoSection from "../blocks/InfoSection";
import {useParams} from "react-router-dom";


const PerformerProfile = () => {
    const [performer, setPerformer] = useState({});
    const [loading, setLoading] = React.useState(true);
    const toast = useToast();
    const params = useParams();
    useEffect(() => {
        // Function to fetch performers from the remote API
        const fetchPerformer = async () => {
            try {
                const response = await fetch(`/performers.json`);
                const data = await response.json();
                const performerId = params.performerId;
                console.log(performerId)
                let found = false;
                let cur = 0;
                while (!found){
                    let d = data[cur];
                    console.log(`checking ${d.id} == ${performerId}`)
                    if (d.id == performerId){
                        console.log("found")
                        setPerformer(d);
                        found = true; break;
                    }
                    cur += 1;
                }
                 // Assuming the response contains an array of performers
            } catch (error) {
                console.error('Error fetching performers:', error);
            }
        };

        fetchPerformer().then(r => setLoading(false)
        );
    }, );

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='10%'
            backdropBlur='2px'
        />
    );
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [overlay, setOverlay] = React.useState(<OverlayTwo />)
const heading = "Meet " + performer.name;
    return loading ?( <Spinner/> ) : (
        <Box id="profile" p="8">

            <InfoSection performer={performer} imageSrc={performer.imageSrc} heading={heading}/>

            <Box display="flex" justifyContent="center">
                <Button colorScheme="teal" size="lg"
                        data-link={"https://addrs.to/dominantqueen/BTC?amount=0.000022"}
                        onClick={() => {
                            setOverlay(<OverlayTwo />)
                            onOpen()
                        }}>
                    Book Now
                </Button>
                <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
                    {overlay}
                    <ModalContent style={{maxHeight:"calc(100vh - 50px)", overflowY:"auto", height:"calc(100vh - 3rem)", width:"calc(100vw - 1rem)"}}>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody style={{display:"flex"}}>
                            <iframe src={"https://embed.addrs.to/dominantqueen/BTC?amount=0.000022"} width={"100%"}
                            height={"100%"} style={{width:"100%", height:"100%", objectFit:"cover"}}>

                            </iframe>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

export default PerformerProfile;
