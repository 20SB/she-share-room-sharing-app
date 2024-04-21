import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    Select,
    Popover,
    NativeSelect,
    Button,
    Textarea,
    Rating,
    Tooltip,
} from "@mantine/core";
import { UserInfoIcons } from "./UserInfoIcons";
import { useEffect, useState } from "react";
import "../assets/css/style.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function MyRentalBooked({ bookings }) {
    const backendURL = process.env.REACT_APP_API_KEY;
    const { token } = useAuth();
    const [bookingsData, setBookingsData] = useState(bookings);

    const [hoveredAvatar, setHoveredAvatar] = useState(null);
    const [clickedAvatar, setClickedAvatar] = useState(null);
    const [ratingInp, setRatingInp] = useState(1);
    const [reviewComment, setReviewComment] = useState("");

    function handleAvatarHover(index) {
        setHoveredAvatar(index);
    }

    function handleAvatarLeave() {
        setHoveredAvatar(null);
    }

    function handleAvatarClicked(index) {
        if (clickedAvatar === index) {
            // If the same avatar is clicked again, close it
            setClickedAvatar(null);
        } else {
            // Otherwise, toggle the clicked avatar
            setClickedAvatar(index);
        }
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked element is not within the Avatar or UserInfoIcons area
            if (clickedAvatar !== null && event.target.closest(".avatar-container") === null) {
                setClickedAvatar(null); // Close the UserInfoIcons
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [clickedAvatar]);

    const getBadgeColor = (status, type) => {
        // Determine badge color based on status and type
        if (type === "guestRes") {
            switch (status) {
                case "Pending":
                    return "yellow";
                case "Cancelled":
                    return "red";
                case "Confirmed":
                    return "green";
                default:
                    return "gray";
            }
        } else if (type === "hostRes") {
            switch (status) {
                case "Pending":
                    return "yellow";
                case "Approved":
                    return "green";
                case "Rejected":
                    return "red";
                default:
                    return "gray";
            }
        } else if (type === "transaction") {
            switch (status) {
                case "Pending":
                    return "yellow";
                case "Successfull":
                    return "green";
                case "Failed":
                    return "red";
                default:
                    return "gray";
            }
        }
    };

    const handleResponseChange = (newValue, bookingId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        console.log(newValue);
        axios
            .put(
                `${backendURL}/booking/host-res?bookingId=${bookingId}`,
                {
                    hostRes: newValue,
                },
                config
            )
            .then(({ data }) => {
                console.log("data", data);
                // close the popover
                // now update the bookings array, fist find the booking from bookings array by bookingId and then update the hostres field with new data ie data.booking.hostRes
                const updatedBookings = bookingsData.map((booking) =>
                    booking._id === bookingId ? { ...booking, hostRes: newValue } : booking
                );
                setBookingsData(updatedBookings);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitReview = async (bookingId) => {
        console.log("ratingInp", ratingInp);
        console.log("reviewComment", reviewComment);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put(
                `${backendURL}/booking/review?bookingId=${bookingId}`,
                {
                    reviewComment: reviewComment,
                    rating: ratingInp,
                },
                config
            )
            .then(({ data }) => {
                console.log("data", data);
                const updatedBookings = bookingsData.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, hostExperience: reviewComment, hostRating: ratingInp }
                        : booking
                );
                setBookingsData(updatedBookings);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const rows = bookingsData.map((booking, index) => (
        <Table.Tr key={index}>
            <Table.Td>
                <div style={{ position: "relative" }}>
                    <Avatar
                        className="avatar-container"
                        size={40}
                        src={booking.guest.dp}
                        radius={40}
                        onMouseEnter={() => handleAvatarHover(index)}
                        onMouseLeave={handleAvatarLeave}
                        onClick={() => handleAvatarClicked(index)}
                    />
                    {(hoveredAvatar === index || clickedAvatar === index) && (
                        <div
                            style={{
                                position: "absolute",
                                top: "110%",
                                left: "40px",
                                width: "250px",
                                background: "#2e2e2e",
                                zIndex: 1000,
                                padding: "10px",
                                borderRadius: "10px",
                                border: "1px solid #424242",
                            }}
                        >
                            <UserInfoIcons user={booking.guest} />
                        </div>
                    )}
                </div>
            </Table.Td>

            <Table.Td align="center">{formatDate(booking.checkInDate)}</Table.Td>
            <Table.Td align="center">{formatDate(booking.checkOutDate)}</Table.Td>
            <Table.Td>₹ {booking.totalPriceCalculated}</Table.Td>
            <Table.Td align="center">
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Button variant="transparent">
                            <Badge color={getBadgeColor(booking.hostRes, "hostRes")} size="sm">
                                {booking.hostRes}
                            </Badge>
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <NativeSelect
                            mt="md"
                            label="Change Your Response:"
                            data={["Pending", "Approved", "Rejected"]}
                            onChange={(event) =>
                                handleResponseChange(event.target.value, booking._id)
                            }
                        />
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
            <Table.Td align="center">
                <Badge color={getBadgeColor(booking.guestRes, "guestRes")} size="sm">
                    {booking.guestRes}
                </Badge>
            </Table.Td>
            <Table.Td align="center">
                <Badge color={getBadgeColor(booking.transaction, "transaction")} size="sm">
                    {booking.transaction || "Not Attempted"}
                </Badge>
            </Table.Td>
            <Table.Td align="center">
                <Tooltip
                    label={booking.guestExperience || "NA"}
                    withArrow
                    multiline
                    transitionProps={{ duration: 200 }}
                >
                    <Rating value={booking.guestRating} fractions={2} readOnly size="xs" />
                </Tooltip>
            </Table.Td>
            <Table.Td align="center">
                <Popover width={300} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Button
                            variant="transparent"
                            onClick={() => {
                                setReviewComment(booking.hostExperience || "");
                                setRatingInp(booking.guestRating || 1);
                            }}
                        >
                            {booking.hostRating ? (
                                <Rating
                                    value={booking.hostRating}
                                    fractions={2}
                                    readOnly
                                    size="xs"
                                    style={{ cursor: "pointer" }}
                                />
                            ) : (
                                "Add Review"
                            )}
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Textarea
                            rows={3}
                            label="Your Review"
                            placeholder="Write a brief about your Experience"
                            value={reviewComment}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setReviewComment(e.target.value);
                            }}
                        />
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text size="sm" style={{ fontWeight: "400", marginBottom: "5px" }}>
                                Rate your Experience in a range of 1 to 5 -
                            </Text>
                            <Rating value={ratingInp} onChange={setRatingInp} />
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="filled"
                                radius={"xl"}
                                onClick={() => {
                                    submitReview(booking._id);
                                }}
                            >
                                Submit/Update Review
                            </Button>
                        </div>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800} style={{ height: "100%" }}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th className="cen-align">Guest</Table.Th>
                        <Table.Th className="cen-align">Check In Date</Table.Th>
                        <Table.Th className="cen-align">Check out Date</Table.Th>
                        <Table.Th className="cen-align">Total Price</Table.Th>
                        <Table.Th className="cen-align">Your Response</Table.Th>
                        <Table.Th className="cen-align">Guest Response</Table.Th>
                        <Table.Th className="cen-align">Payment</Table.Th>
                        <Table.Th className="cen-align">Guest Review</Table.Th>
                        <Table.Th className="cen-align">Your Review</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
