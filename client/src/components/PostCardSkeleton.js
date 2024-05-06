import { Skeleton } from "@mantine/core";
import React from "react";

const PostCardSkeleton = () => {
    return (
        <>
            <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
            <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
            <Skeleton visible={true} radius="md" width={300} height={"75vh"}></Skeleton>
        </>
    );
};

export default PostCardSkeleton;
