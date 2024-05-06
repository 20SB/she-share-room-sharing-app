import { Flex, Skeleton } from "@mantine/core";
import React from "react";

const MySharingPostCardSkeleton = () => {
    return (
        <>
            <Flex gap={"10px"}>
                <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
                <Flex direction={"column"} style={{ flexGrow: 1 }} gap={"10px"}>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                </Flex>
            </Flex>
            <Flex gap={"10px"}>
                <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
                <Flex direction={"column"} style={{ flexGrow: 1 }} gap={"10px"}>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                </Flex>
            </Flex>
            <Flex gap={"10px"}>
                <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
                <Flex direction={"column"} style={{ flexGrow: 1 }} gap={"10px"}>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                    <Skeleton visible={true} radius="md" height={"60px"} width={"100%"}></Skeleton>
                </Flex>
            </Flex>
        </>
    );
};

export default MySharingPostCardSkeleton;
