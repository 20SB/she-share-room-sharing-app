import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { PostCard } from "./PostCard";
import { MyRentalBooked } from "./MyRentalBooked";
import { useNavigate } from "react-router-dom";
import MySharingPostCardSkeleton from "./MySharingPostCardSkeleton";

export const MySharing = () => {
    const backendURL = process.env.REACT_APP_API_KEY;
    const [bookingList, setBookingList] = useState([]);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentalListingsWithBookings = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .get(`${backendURL}/booking/as-host`, config)
                .then(({ data }) => {
                    console.log("data", data);
                    if (data.rentalListingsWithBookings.length <= 0) {
                        navigate("/no-data");
                    }
                    setBookingList(data.rentalListingsWithBookings);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchRentalListingsWithBookings();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                padding: "10px",
                paddingLeft: "60px",
                boxSizing: "border-box",
                flexDirection: "column",
            }}
        >
            {bookingList.length > 0 &&
                bookingList.map((rentalPost) => (
                    <div key={rentalPost._id} style={{ display: "flex", gap: "20px" }}>
                        <PostCard listData={rentalPost} from={"MySharing"} viewer={"Host"} />
                        <div className="bookings-list" style={{ flex: 1 }}>
                            {rentalPost.bookings && (
                                <MyRentalBooked bookings={rentalPost.bookings} />
                            )}
                        </div>
                    </div>
                ))}
            {bookingList.length == 0 && <MySharingPostCardSkeleton />}
        </div>
    );
};
