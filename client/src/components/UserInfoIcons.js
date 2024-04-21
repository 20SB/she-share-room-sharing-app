import { Avatar, Text, Group, rem, Rating } from "@mantine/core";
import { IconPhoneCall, IconAt, IconStar } from "@tabler/icons-react";
import classes from "./UserInfoIcons.module.css";
import { MdWorkOutline } from "react-icons/md";

export function UserInfoIcons({ user, userType }) {
    return (
        <div style={{ width: "300px" }}>
            <Group wrap="nowrap">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Avatar src={user.dp} size={50} radius="xl" />
                    <Text fz="sm" fw={500} className={classes.name} width={"100%"} truncate="end">
                        {userType}
                    </Text>
                    <Group gap={5} pt={5}>
                        <Rating value={user.averageRating} fractions={2} readOnly size="xs" />
                        {/* <IconStar style={{ width: rem(10), height: rem(10) }} />
                        <Text fw={500} size="xs">
                            {user.averageRating}
                        </Text> */}
                    </Group>
                </div>
                <div style={{ maxWidth: "170px" }}>
                    <Text fz="lg" fw={500} className={classes.name} width={"100%"} truncate="end">
                        {user.name}
                    </Text>

                    <Group wrap="nowrap" gap={10} mt={3} w={"100%"}>
                        <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                        <Text fz="xs" c="dimmed" truncate="end">
                            {user.email}
                        </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5} w={"100%"}>
                        <MdWorkOutline color="#828282" size="1rem" />
                        <Text fz="xs" c="dimmed" truncate="end">
                            {user.jobProfile}
                        </Text>
                    </Group>

                    <Text fz="xs" c="dimmed" truncate="end" style={{ textAlign: "left" }}>
                        {user.age} Years, {user.maritalStatus}
                    </Text>
                </div>
            </Group>
        </div>
    );
}
