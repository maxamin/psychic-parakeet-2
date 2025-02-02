import React from "react";
import {Flex} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

const Paginator = ({total}) => {
    return (
        <Flex
            w="full"
            bg="dark"

            p={50}
            alignItems="center"
            justifyContent="center"
        >
            <Pagination
                defaultCurrent={1}
                total={total}
                style={{display:"flex"}}
                paginationProps={{
                   style: "display:flex;",
                    mb: 4,
                }}
            />
        </Flex>
    )
}


export default Pagination