import cx from "clsx";
import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import classes from "./HeroImageBackground.module.css";
import { useNavigate } from "react-router-dom";
import { useService } from "../context/ServiceHandler";
import { useAuth } from "../context/AuthContext";

export function HeroImageBackground() {
  const navigate = useNavigate();
  const { setPostRoom, setBuyRoom } = useService();
  const { token } = useAuth();

  const handlePostRoom = () => {
    if (token) {
      navigate("/city");
      setPostRoom(true);
      setBuyRoom(false);
    } else {
      navigate("/auth");
    }
  };

  const handleBuyRoom = () => {
    if (token) {
      navigate("/city");
      setPostRoom(false);
      setBuyRoom(true);
    } else {
      navigate("/auth");
    }
  };
  return (
    <div className={classes.wrapper} h="100vh">
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Unlock Safe and Empowering Room Sharing
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Connect and Rent Safely: A Dedicated Space for Women to Share Rooms
            and Find Trusted Accommodations.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="white"
            size="lg"
            onClick={() => {
              handlePostRoom();
            }}
          >
            Share Your Room
          </Button>
          <Button
            className={classes.control}
            variant="white"
            size="lg"
            onClick={() => {
              handleBuyRoom();
            }}
          >
            Rent a Room
          </Button>
        </div>
      </div>
    </div>
  );
}
