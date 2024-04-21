import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { PostCard } from "./PostCard";
import { useNavigate } from "react-router-dom";

export const MyBooking = () => {
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_API_KEY;
    const [bookings, setBookings] = useState([]);
    const { token } = useAuth();
    // console.log("token", token);

    useEffect(() => {
        const fetchMyBookings = async () => {
            const headers = {
                Authorization: `Bearer ${token}`,
              };

            axios
                .get(`${backendURL}/booking/as-guest`, {
                    headers: headers,
                  })
                .then(({ data }) => {
                    if (data.bookings.length <= 0) {
                        navigate("/no-data");
                    }
                    console.log("my bookings data", data.bookings);
                    setBookings(data.bookings);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchMyBookings();
    }, [token]);
    // console.log(bookings);
    return (
        <>
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
                    {bookings.map((bkng) => (
                        <div key={bkng._id}>
                            <PostCard
                                listData={bkng.rentalListing}
                                bookingDetails={bkng}
                                from={"MyBooking"}
                                viewer={"Guest"}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
