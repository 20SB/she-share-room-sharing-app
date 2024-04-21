import { Group, Button, Box, Avatar, Title } from "@mantine/core";
import SiteLogo from "../assets/images/SiteLogo.png";
import classes from "./HeaderMegaMenu.module.css";
import "../assets/css/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token, logout } = useAuth();
    const [name,setName]=useState('');
    useEffect(()=>{
       if(user)  setName(user.name)
    },[user])
    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%" py="5px">
                    <Group
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <Avatar src={SiteLogo} radius="xl" />
                        <Title order={1} className="alex-brush-regular">
                            She Share
                        </Title>
                    </Group>

                    {location.pathname !== "/auth" && (
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Link to="/my-booking" className={classes.link}>
                                My Bokings
                            </Link>
                            <Link to="/my-sharing" className={classes.link}>
                                My Sharings
                            </Link>{" "}
                            {/* <Link to="/add-service" className={classes.link}>
                                Add Service
                            </Link>{" "}
                            <Link to="/book-service" className={classes.link}>
                                Book Service
                            </Link> */}
                        </Group>
                    )}
                    {!token
                        ? location.pathname !== "/auth" && (
                              <Group visibleFrom="sm">
                                  <Button
                                      variant="default"
                                      onClick={() => {
                                          navigate("/auth");
                                      }}
                                  >
                                      Log in
                                  </Button>
                              </Group>
                          )
                        : location.pathname !== "/auth" && (
                              <Group visibleFrom="sm">
                              {
                            
                                name &&   <p>Hii {name }</p>
                              }
                                  <Button variant="default" onClick={() => logout()}>
                                      Log Out
                                  </Button>
                              </Group>
                          )}
                    {}
                </Group>
            </header>
        </Box>
    );
}
