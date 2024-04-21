import { Container, Title, Text, Button, Group } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./NothingFoundBackground.module.css";
import { useNavigate } from "react-router-dom";

export function NothingFoundBackground() {
    const navigate = useNavigate();
    return (
        <Container className={classes.root} style={{ width: "100%", height: "77vh" }}>
            <div className={classes.inner}>
                {/* <Illustration className={classes.image} /> */}
                <div className={classes.content}>
                    <Title className={classes.title}>Nothing to see here</Title>
                    <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                        We're sorry, but there is currently no data available to display on this
                        page. Please check back later for updates or try a different section of the
                        website. If you think this is an error contact support.
                    </Text>
                    <Group justify="center">
                        <Button
                            size="md"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Take me back to home page
                        </Button>
                    </Group>
                </div>
            </div>
        </Container>
    );
}
