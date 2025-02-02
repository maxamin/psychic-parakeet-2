// DiscoverPerformers2.jsx
import {
    Box, Button, Heading, Spinner, useToast, SimpleGrid, Text
} from '@chakra-ui/react';
import PerformerCard from './PerformerCard';
import React, {useState, useEffect, forwardRef} from 'react';
import Paginator from "./pagination";
import Pagination from "@choc-ui/paginator";
import PerformerCard2 from "./PerformerCard2";
import PulseCards from "../blocks/PulseCards";

const fetchFakePerformers = async (page, perPage) => {
    // Assuming you have a predefined list of fake performers data
    const fakePerformers = [
        {id: 1, name: 'Performer 1', description: 'Description 1', imageSrc: 'image1.jpg'},
        {id: 2, name: 'Performer 2', description: 'Description 2', imageSrc: 'image2.jpg'},
        // Add more fake performers as needed
    ];

    // Simulate server delay (you can remove this in a real implementation)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate start and end indexes based on pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    // Return the subset of performers based on pagination
    return fakePerformers.slice(startIndex, endIndex);
};

const DiscoverPerformers = () => {
    const [performers, setPerformers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10); // Number of performers per page
    const pageSize = 10;
    const offset = (currentPage - 1) * pageSize;
    const [loading, setLoading] = React.useState(true);
    const toast = useToast();

    const performerSet = performers.slice(offset, offset + pageSize);

    useEffect(() => {
        // Function to fetch performers from the remote API
        const fetchPerformers = async () => {
            try {
                const response = await fetch(`/performers.json?page=${currentPage}&perPage=${perPage}`);
                const data = await response.json();
                setPerformers(data); // Assuming the response contains an array of performers
            } catch (error) {
                console.error('Error fetching performers:', error);
            }
        };

        fetchPerformers().then(r => setLoading(false)
        );
    }, [currentPage, perPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const Prev = forwardRef((props, ref) => (
        <Button ref={ref} {...props}>
            Prev
        </Button>
    ));
    const Next = forwardRef((props, ref) => (
        <Button ref={ref} {...props}>
            Next
        </Button>
    ));
    // const Page = forwardRef((props, ref) => (
    //     <Button ref={ref} {...props}>
    //         P{props.children}
    //     </Button>
    // ));
    const itemRender = (_, type) => {
        if (type === "prev") {
            return Prev;
        }
        if (type === "next") {
            return Next;
        }
        // if (type === "page") {
        //     return Page;
        // }
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    return (
        <Box id="discover" p="8">
            <Heading as="h2" size="xl" mb="6">
                Discover the Tempest's Talents
            </Heading>
            <h1>Discover Performers:</h1>
            <p> Explore the Tempest's Talents
                Discover captivating performers for an unforgettable experience.</p>

            <Text>Explore a curated selection of extraordinary talents. From burlesque to exotic dancing, each performer
                is a maestro in their own right. Scroll through profiles, preview performances, and choose the perfect
                act for your desires.</Text>

            <Box display="flex" justifyContent="center">
                <Pagination
                    current={currentPage}
                    onChange={(currentPage) => {
                        setCurrentPage(currentPage);
                        toast({
                            title: "Pagination.",
                            description: `You changed to page ${currentPage}`,
                            variant: "solid",
                            duration: 3000,
                            isClosable: true,
                            position: "top-right"
                        });
                    }}
                    pageSize={pageSize}
                    total={performers.length}
                    itemRender={itemRender}
                    paginationProps={{
                        display: "flex",

                    }}
                    pageNeighbours={3}
                    colorScheme="dark"
                    focusRing="pink"
                />
            </Box>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))' style={{marginTop: 20}}>
                { loading ? <Spinner /> : performerSet.map((performer) => (
                    // <PerformerCard
                    //     key={performer.id}
                    //     name={performer.name}
                    //     description={performer.description}
                    //     imageSrc={performer.imageSrc}
                    // />
                    <PerformerCard2 performer={performer}/>
                ))}
            </SimpleGrid>
            <Box mt="4" display="flex" justifyContent="center">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous Page
                </Button>
                <Box mx="4">{`Page ${currentPage}`}</Box>
                <Button onClick={handleNextPage}>Next Page</Button>
            </Box>
        </Box>
    );
};

export default DiscoverPerformers;
