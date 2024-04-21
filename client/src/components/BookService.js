import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePickerInput } from "@mantine/dates";
import { useAuth } from "../context/AuthContext";
import { PostCard } from "./PostCard";
import "../assets/css/style.css";

export const BookService = () => {
    const [value, setValue] = useState([]);
    const [rentalListings, setRentalListings] = useState([]);
    const backendURL = process.env.REACT_APP_API_KEY;

    const { token } = useAuth();
    useEffect(() => {
        console.log("token", token);
    }, [token]);

    useEffect(() => {
        const fetchRentalListings = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .get(`${backendURL}/rental/rental-list?city=Mumbai`, config)
                .then(({ data }) => {
                    console.log("data", data);
                    setRentalListings(data.rentalListings);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchRentalListings();
    }, []);

    return (
        <>
            {/* Display fetched rental listings */}
            <div className="book-service-container" style={{ width: "100%", overflowX: "auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "10px",
                        paddingLeft: "60px",
                        boxSizing: "border-box",
                    }}
                >
                    {rentalListings.map((listing) => (
                        <div key={listing._id}>
                            <PostCard
                                listData={listing}
                                from={"BookService"}
                                viewer={"Guest"}
                                i={listing._id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
