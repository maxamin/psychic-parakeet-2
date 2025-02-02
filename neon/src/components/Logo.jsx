import React from "react"
import { Box, Image} from "@chakra-ui/react"

export default function Logo(props) {
    return (
        <Box {...props}>
            <Image
                borderRadius='full'
                boxSize='150px'
                src='/logo.jpg'
                alt='neon tempest'
            />
        </Box>
    )
}