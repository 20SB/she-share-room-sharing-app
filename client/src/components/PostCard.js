import React, { useEffect, useState } from "react";
import {
    Image,
    Card,
    Text,
    Group,
    Button,
    rem,
    Flex,
    Avatar,
    Tooltip,
    Badge,
    Select,
    Modal,
    Textarea,
    Rating,
} from "@mantine/core";
import { IconCalendar, IconPencil, IconStar } from "@tabler/icons-react";
import classes from "./CarouselCard.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/css/style.css";
import { Calendar, DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { UserInfoIcons } from "./UserInfoIcons";
import { useAuth } from "../context/AuthContext";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const PostCard = ({ listData, from, viewer, bookingDetails }) => {
    const backendURL = process.env.REACT_APP_API_KEY;
    const { token } = useAuth();

    const { user } = useAuth();
    const [showUser, setShowUser] = useState(false);
    const [showDateInput, setShowDateInput] = useState(false);
    const [presentUser, setPresentUser] = useState(user);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [showChoosenDates, setShowChoosenDates] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGuestRes, setSelectedGuestRes] = useState(
        bookingDetails && bookingDetails.guestRes ? bookingDetails.guestRes : null
    );
    const [bookingDates, setBookingDates] = useState([]);
    const bta = bookingDetails && bookingDetails.transaction ? bookingDetails.transaction : "NA";
    const [transactionStatus, setTransactionStatus] = useState(bta);
    const [openedReviewModal, { open: openReviewModal, close: closeReviewModal }] =
        useDisclosure(false);
    const [openedTransactionModal, { open: openTransactionModal, close: closeTransactionModal }] =
        useDisclosure(false);

    const navigate = useNavigate();

    const [ratingInp, setRatingInp] = useState(1);
    const [reviewComment, setReviewComment] = useState();

    const getBadgeColor = (status, type) => {
        // Determine badge color based on status and type
        if (type === "guestRes") {
            switch (status) {
                case "Pending":
                    return "yellow"; // Use yellow for Pending guest response
                case "Cancelled":
                    return "red"; // Use red for Cancelled guest response
                case "Confirmed":
                    return "green"; // Use green for Confirmed guest response
                default:
                    return "gray"; // Default color for unknown guest response
            }
        } else if (type === "hostRes") {
            switch (status) {
                case "Pending":
                    return "yellow"; // Use yellow for Pending host response
                case "Approved":
                    return "green"; // Use green for Approved host response
                case "Rejected":
                    return "red"; // Use red for Rejected host response
                default:
                    return "gray"; // Default color for unknown host response
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

    const availableDates = listData.availableDates;

    const handleInputDateChange = () => {
        if (!startDate || !endDate) {
            alert("Please Choose Interval");
            return;
        }
        // console.log("startDate", startDate);
        // console.log("endDate", endDate);
        const start = dayjs(startDate).startOf("day");
        const end = dayjs(endDate).startOf("day");

        // Filter dates to include only those in availableDates
        let validDates = [];
        let currentDate = start;

        while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
            const formattedDate = currentDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
            if (availableDates.includes(formattedDate)) {
                // console.log(`pushing ${formattedDate} to valid Dates array`);
                validDates.push(formattedDate);
            }
            currentDate = currentDate.add(1, "day");
        }

        setStartDate(new Date(validDates[0]));
        setEndDate(new Date(validDates[validDates.length - 1]));
    };

    useEffect(() => {
        // console.log("from", from);
        if (from === "BookService") {
            setPresentUser(listData.host);
        } else if (from === "MyBooking") {
            setPresentUser(bookingDetails.host);
        } else {
            setPresentUser(user);
        }
    }, [from, listData.host]);

    useEffect(() => {
        const showDatesFunc = (startDate, endDate) => {
            const start = dayjs(startDate).startOf("day");
            const end = dayjs(endDate).startOf("day");
            const datesInRange = [];
            let currentDate = start;

            while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
                datesInRange.push(currentDate.format("YYYY MMM DD"));
                currentDate = currentDate.add(1, "day");
            }

            setBookingDates(datesInRange);
        };
        bookingDetails && showDatesFunc(bookingDetails.checkInDate, bookingDetails.checkOutDate);
    }, [bookingDetails]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            // console.log("Razorpay SDK loaded");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    const toggleShowChoosenDates = () => {
        setShowChoosenDates(!showChoosenDates);
    };

    const toggleshowDateInput = () => {
        if (showDateInput) {
            setShowDateInput(false);
        } else {
            setShowDateInput(true);
        }
    };

    const bookService = async () => {
        if (!startDate || !endDate) {
            alert("Please Choose Interval");
            return;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(
                `${backendURL}/booking/book-service?rentalListingId=${listData._id}`,
                {
                    checkInDate: startDate,
                    checkOutDate: endDate,
                },
                config
            )
            .then(({ data }) => {
                // console.log("data", data);
                navigate("/my-booking");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitReview = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put(
                `${backendURL}/booking/review?bookingId=${bookingDetails._id}`,
                {
                    reviewComment: reviewComment,
                    rating: ratingInp,
                },
                config
            )
            .then(({ data }) => {
                // console.log("data", data);
                closeReviewModal();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const payNow = async (priceToBePaid) => {
        // console.log("priceToBePaid", priceToBePaid);
        try {
            const response = await fetch(`${backendURL}/pay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingId: bookingDetails._id,
                    name: user.name,
                    amount: priceToBePaid,
                    email: user.email,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating order********:", error);
            return null;
        }
    };

    const updateTransactionStatus = async (paymentStatus) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        setTransactionStatus(paymentStatus);
        axios
            .put(
                `${backendURL}/booking/update-transaction?bookingId=${bookingDetails._id}`,
                {
                    transactionStatus: paymentStatus,
                },
                config
            )
            .then(({ data }) => {})
            .catch((error) => {
                console.log(error);
            });
    };
    const paymentHandler = async (priceToBePaid) => {
        let paymentStatus = "Not Attempted";
        const orderData = await payNow(priceToBePaid);
        if (orderData && orderData.success) {
            const options = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: "INR",
                name: orderData.product_name,
                description: orderData.description,
                image: "https://dummyimage.com/600x400/000/fff",
                order_id: orderData.order_id,
                handler: function (response) {
                    // alert("Payment Completed");
                    // console.log("uh hoooo payment successfull");
                    updateTransactionStatus("Successfull");
                    // Redirect or perform actions upon successful payment
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                notes: {
                    description: orderData.description,
                },
                theme: {
                    color: "#2300a3",
                },
            };

            if (window.Razorpay) {
                const razorpayObject = new window.Razorpay(options);
                razorpayObject.on("payment.failed", function (response) {
                    // alert("Payment Failed");
                    updateTransactionStatus("Failed");
                });
                razorpayObject.open();
            } else {
                // console.error("Razorpay SDK not loaded");
                updateTransactionStatus("Pending");
            }
        } else {
            alert("Error creating order");
            updateTransactionStatus("Pending");
        }
    };

    const handleDropdownChange = (newValue) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // console.log(newValue);
        axios
            .put(
                `${backendURL}/booking/guest-res?bookingId=${bookingDetails._id}`,
                {
                    guestRes: newValue,
                },
                config
            )
            .then(({ data }) => {
                // console.log("data", data);
                setIsDropdownOpen(false);

                setSelectedGuestRes(data.booking.guestRes);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Card
            radius="md"
            withBorder
            padding="xl"
            style={{ maxWidth: 300, minWidth: 300, position: "relative" }}
        >
            {/* Display relevant listData values */}
            <Card.Section style={{ maxWidth: 300, minWidth: 300 }}>
                {/* Display images from listData */}
                <Carousel
                    responsive={responsive}
                    showDots={true}
                    keyBoardControl
                    autoPlay={false}
                    partialVisible={false}
                    centerMode={false}
                >
                    {listData.images.map((image, index) => (
                        <Flex key={index} justify={"center"}>
                            <img
                                src={from === "AddService" ? URL.createObjectURL(image) : image}
                                alt={`Image ${index}`}
                                style={{ maxWidth: 300, maxHeight: 180 }}
                            />
                        </Flex>
                    ))}
                </Carousel>
            </Card.Section>

            <Group justify="space-between" mt="lg">
                <Group gap={15} style={{ width: "75%" }}>
                    <Text fw={500} fz="md" lineClamp={3} style={{ width: "80%" }}>
                        {listData.city}, <br />
                        {listData.area}{" "}
                        <a href={listData.location} target="_blank">
                            <FaMapMarkerAlt />
                        </a>
                    </Text>
                </Group>

                {/* Display Host Image here only in preview */}
                <Group gap={5}>
                    <Tooltip label="Owner" withArrow>
                        <Avatar
                            src={presentUser.dp}
                            alt="I am the Host"
                            onClick={() => setShowUser(!showUser)}
                        />
                    </Tooltip>
                </Group>
            </Group>

            {/* Display Host only if u are in the booings tab */}
            {showUser && viewer === "Guest" && (
                <div>
                    <hr />
                    <UserInfoIcons user={presentUser} userType={"Owner"} />
                    <hr />
                </div>
            )}

            {/* Display Guest only if u are in the booings tab */}
            {showUser && viewer === "Owner" && (
                <div>
                    <hr />
                    <UserInfoIcons user={presentUser} userType={"Guest"} />
                    <hr />
                </div>
            )}

            <Text fz="sm" c="dimmed" mt="sm">
                {listData.roomDetails}
            </Text>
            <div>
                <Text span fw={500} fz="sm" className={classes.price}>
                    Amenities:{" "}
                </Text>
                {listData.amenities.map((facility, index) => (
                    <Text key={index} span fz="sm" c="dimmed">
                        {" "}
                        {facility}
                    </Text>
                ))}
            </div>
            <div>
                <Text span fw={500} fz="sm" className={classes.price}>
                    Minimum Rental Time:{" "}
                </Text>
                <Text span fz="sm" c="dimmed">
                    {listData.minRentalTime} nights
                </Text>
            </div>
            <div>
                <Text span fw={500} fz="sm" className={classes.price}>
                    Maximum Rental Time:{" "}
                </Text>
                <Text span fz="sm" c="dimmed">
                    {listData.maxRentalTime} nights
                </Text>
            </div>
            <div style={{ position: "relative" }}>
                <Text span fw={500} fz="sm" className={classes.price}>
                    Available Dates:{" "}
                </Text>
                <IconCalendar onClick={toggleCalendar} style={{ cursor: "pointer" }} size={20} />
                {showCalendar && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "30px",
                            zIndex: 999,
                            background: "#2e2e2e",
                            padding: "12px 16px",
                            border: "1px solid #424242",
                            borderRadius: "5px",
                        }}
                    >
                        <Calendar
                            getDayProps={(date) => ({
                                selected: listData.availableDates.some((s) =>
                                    dayjs(date).isSame(s, "date")
                                ),
                            })}
                            locale="en"
                        />
                    </div>
                )}
            </div>
            {from === "MyBooking" && bookingDetails && bookingDetails.hostRes === "Pending" && (
                <div style={{ position: "relative" }}>
                    <Text span fw={500} fz="sm" className={classes.price}>
                        Selected Dates:{" "}
                    </Text>
                    <IconCalendar
                        onClick={toggleShowChoosenDates}
                        style={{ cursor: "pointer" }}
                        size={20}
                    />
                    {showChoosenDates && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: "30px",
                                zIndex: 999,
                                background: "#2e2e2e",
                                padding: "12px 16px",
                                border: "1px solid #424242",
                                borderRadius: "5px",
                            }}
                        >
                            <Calendar
                                getDayProps={(date) => ({
                                    selected: bookingDates.some((s) =>
                                        dayjs(date).isSame(s, "date")
                                    ),
                                })}
                                locale="en"
                            />
                        </div>
                    )}
                </div>
            )}
            <div>
                <hr />
            </div>
            <div style={{ position: "relative" }}>
                {from === "BookService" && (
                    <>
                        <Text span fw={500} fz="sm" className={classes.price}>
                            Choose Interval:{" "}
                        </Text>
                        <IconCalendar
                            onClick={toggleshowDateInput}
                            style={{ cursor: "pointer" }}
                            size={20}
                        />
                    </>
                )}
                {from === "MyBooking" && bookingDetails && bookingDetails.hostRes === "Pending" && (
                    <>
                        <Text span fw={500} fz="sm" className={classes.price}>
                            Update Interval:{" "}
                        </Text>
                        <IconCalendar
                            onClick={toggleshowDateInput}
                            style={{ cursor: "pointer" }}
                            size={20}
                        />
                    </>
                )}

                {showDateInput && (
                    <div>
                        <div style={{ display: "flex", gap: "5px" }}>
                            <DatePickerInput
                                w={"50%"}
                                dropdownType="modal"
                                label="Start Date"
                                placeholder="Start Date"
                                value={startDate}
                                onChange={setStartDate}
                            />
                            <DatePickerInput
                                w={"50%"}
                                dropdownType="modal"
                                label="End Date"
                                placeholder="End Date"
                                value={endDate}
                                onChange={setEndDate}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="transparent" onClick={handleInputDateChange} p={0}>
                                Validate dates
                            </Button>
                        </div>
                        <hr />
                    </div>
                )}
            </div>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fz="xl" span fw={500} className={classes.price}>
                        ₹{listData.rate}
                    </Text>
                    <Text span fz="sm" c="dimmed">
                        {" "}
                        / night
                    </Text>
                </div>

                {/* Button and other actions */}
                {from !== "MyBooking" && (
                    <Button
                        radius="md"
                        onClick={() => {
                            bookService();
                        }}
                        disabled={from === "BookService" ? false : true}
                    >
                        Book now
                    </Button>
                )}
            </Group>

            {from === "MyBooking" && (
                <div>
                    <hr />
                    {bookingDetails.hostRes && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text>Owner Response</Text>
                            <Badge
                                color={getBadgeColor(bookingDetails.hostRes, "hostRes")}
                                size="sm"
                            >
                                {bookingDetails.hostRes}
                            </Badge>
                        </div>
                    )}
                    {from === "MyBooking" &&
                        bookingDetails.hostRes !== "Pending" &&
                        bookingDetails.guestRes && (
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text
                                    onClick={() => {
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Your Response
                                </Text>
                                {isDropdownOpen ? (
                                    <Select
                                        data={["Pending", "Cancelled", "Confirmed"]} // Define your dropdown options here
                                        value={selectedGuestRes || bookingDetails.guestRes}
                                        onChange={(value) => handleDropdownChange(value)}
                                        placeholder="Select response"
                                        style={{ width: "120px", minWidth: 80 }}
                                        onClose={() => setIsDropdownOpen(false)}
                                    />
                                ) : (
                                    <Badge
                                        color={getBadgeColor(selectedGuestRes, "guestRes")}
                                        size="sm"
                                        onClick={() => setIsDropdownOpen(true)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {selectedGuestRes || bookingDetails.guestRes}
                                    </Badge>
                                )}
                            </div>
                        )}
                </div>
            )}
            {from === "MyBooking" && bookingDetails.hostRes === "Approved" && (
                <>
                    <div>
                        <hr />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {transactionStatus == "Successfull" ? (
                            <Button variant="transparent" p={0} cursor="default">
                                Payment Status
                            </Button>
                        ) : (
                            <Button
                                variant="transparent"
                                p={0}
                                onClick={() => {
                                    paymentHandler(listData.rate);
                                }}
                            >
                                Pay Now
                            </Button>
                        )}

                        {/* <Button variant="transparent" p={0} onClick={openTransactionModal}>
                            Update Payment Status
                        </Button> */}
                        <Badge color={getBadgeColor(transactionStatus, "transaction")} size="sm">
                            {transactionStatus}
                        </Badge>
                    </div>
                    {/* <Modal
                        opened={openedTransactionModal}
                        onClose={closeTransactionModal}
                        withCloseButton={false}
                    >
                        <h1>Temporary Transaction Tab:</h1>
                        <hr />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <div>Select Paymet status:</div>
                            <Select
                                data={["Not Attempted", "Pending", "Failed", "Successfull"]}
                                defaultValue={transactionStatus}
                                allowDeselect={false}
                                onChange={(value) => {
                                    setTransactionStatus(value);
                                }}
                            />
                        </div>
                        <hr />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="filled"
                                radius={"xl"}
                                onClick={() => {
                                    updateTransactionStatus();
                                }}
                            >
                                Update Transaction Status
                            </Button>
                        </div>
                    </Modal> */}
                </>
            )}
            {from === "MyBooking" &&
                bookingDetails.hostRes === "Approved" &&
                bookingDetails.guestRes === "Confirmed" &&
                bookingDetails.transaction === "Successfull" && (
                    <div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="transparent"
                                onClick={() => {
                                    setReviewComment(bookingDetails.guestExperience);
                                    setRatingInp(bookingDetails.guestRating);
                                    openReviewModal();
                                }}
                                p={0}
                            >
                                Add/Update Review
                            </Button>
                        </div>
                        <Modal
                            opened={openedReviewModal}
                            onClose={closeReviewModal}
                            withCloseButton={false}
                        >
                            <h1>Share Your Experience</h1>
                            <hr />
                            <Textarea
                                rows={6}
                                label="Your Review"
                                placeholder="Write a brief about your Experience"
                                value={reviewComment}
                                onChange={(e) => {
                                    // console.log(e.target.value);
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
                                <Text style={{ fontWeight: "400", marginBottom: "5px" }}>
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
                                        submitReview();
                                    }}
                                >
                                    Add/Update Review
                                </Button>
                            </div>
                        </Modal>
                    </div>
                )}
        </Card>
    );
};

export { PostCard };
