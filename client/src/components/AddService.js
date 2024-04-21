import React, { useState } from "react";
import {
    Container,
    TextInput,
    Button,
    Text,
    FileInput,
    Textarea,
    Box,
    Flex,
    Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import axios from "axios";
import "../assets/css/style.css";
import { PostCard } from "./PostCard";
import {
    IconAt,
    IconCalendar,
    IconCoinRupee,
    IconImageInPicture,
    IconLocation,
    IconMap,
    IconPencil,
    IconStars,
    IconUpload,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";
import { useService } from "../context/ServiceHandler";
import { useNavigate } from "react-router-dom";

export const AddService = () => {
    const navigate = useNavigate();
    const backendURL = process.env.REACT_APP_API_KEY;
    const { token } = useAuth();
    const { newCityName } = useService();
    console.log("cityname: ", newCityName);
    const [value, setValue] = useState([new Date(2024, 4, 10)]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialValue, setInitialValue] = useState({
        roomDetails: "",
        city: `${newCityName}`,
        area: "",
        location: "",
        amenities: [],
        rate: "",
        minRentalTime: "",
        maxRentalTime: "",
        availableDates: [],
        images: [],
    });

    // console.log("initialValue", initialValue);

    const handleInputChange = (field, value) => {
        if (field === "amenities") {
            const amenityList = value.split(",").map((amenity) => amenity.trim());
            setInitialValue((prevData) => ({
                ...prevData,
                [field]: amenityList,
            }));
        } else {
            setInitialValue((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        }
    };

    const handleInputDateChange = (dates) => {
        const start = dayjs(dates[0]); // Start date
        const end = dayjs(dates[1]); // End date

        // Generate an array of dates between start and end (inclusive)
        const datesInRange = [];
        let currentDate = start;

        while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
            datesInRange.push(currentDate.format("YYYY MMM DD"));
            currentDate = currentDate.add(1, "day");
        }

        console.log("datesInRange", datesInRange);
        setInitialValue((prevData) => ({
            ...prevData,
            ["availableDates"]: datesInRange,
        }));
    };

    const handleFileChange = (files) => {
        // Limit to max 10 images
        const selectedFiles = files.slice(0, 10);
        setInitialValue((prevData) => ({
            ...prevData,
            images: selectedFiles,
        }));
    };
    function formatDate(dateString) {
        // Parse the date string using the Date object
        const date = new Date(dateString);

        // Extract the year, month, and day
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        // Return the date in the format 'YYYY-MM-DD'
        return `${year}-${month}-${day}`;
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log("initialValue", initialValue);
        const formData = new FormData();

        formData.append("roomDetails", initialValue.roomDetails);
        formData.append("city", initialValue.city);
        formData.append("area", initialValue.area);
        formData.append("location", initialValue.location);
        initialValue.amenities.forEach((value, index) => {
            formData.append(`amenities[${index}]`, value);
        });
        formData.append("rate", initialValue.rate);
        formData.append("minRentalTime", initialValue.minRentalTime);
        formData.append("maxRentalTime", initialValue.maxRentalTime);
        initialValue.availableDates.forEach((value, index) => {
            const formattedDate = formatDate(value);
            formData.append(`availableDates[${index}]`, formattedDate);
        });
        initialValue.images.forEach((image) => formData.append("files", image));
        axios
            .post(`${backendURL}/rental/add-service`, formData, {
                headers,
            })
            .then(({ data }) => {
                navigate("/");
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(setIsSubmitting(false));
    };

    return (
        <Flex>
            <Container style={{ maxWidth: 1000, margin: "auto" }}>
                <Title align="center" size={25} py={10}>
                    Add Service Details
                </Title>
                <Textarea
                    label="Room Details"
                    placeholder="Write a brief about the room"
                    leftSection={<IconPencil size={16} />}
                    value={initialValue.roomDetails}
                    onChange={(event) => handleInputChange("roomDetails", event.target.value)}
                />

                <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
                    <TextInput
                        label="City"
                        type="text"
                        placeholder="Enter city"
                        leftSection={<IconMap size={16} />}
                        value={initialValue.city}
                        onChange={(event) => handleInputChange("city", event.target.value)}
                    />
                    <TextInput
                        label="Area"
                        type="text"
                        placeholder="Enter area"
                        leftSection={<IconMap size={16} />}
                        value={initialValue.area}
                        onChange={(event) => handleInputChange("area", event.target.value)}
                    />
                    <TextInput
                        label="Google Map Location Link"
                        type="url"
                        placeholder="Enter google map location link"
                        leftSection={<IconLocation size={16} />}
                        value={initialValue.location}
                        onChange={(event) => handleInputChange("location", event.target.value)}
                    />
                    <TextInput
                        label="Amenities (comma-separated)"
                        placeholder="Enter amenities separated by commas"
                        leftSection={<IconStars size={16} />}
                        value={initialValue.amenities.join(", ")}
                        onChange={(event) => handleInputChange("amenities", event.target.value)}
                    />
                    <TextInput
                        label="Rate per night"
                        type="number"
                        placeholder="Enter rate"
                        leftSection={<IconCoinRupee size={16} />}
                        value={initialValue.rate}
                        onChange={(event) => handleInputChange("rate", event.target.value)}
                    />
                    <TextInput
                        label="Minimum Rental Time (in Nights)"
                        type="number"
                        placeholder="Enter minimum rental time"
                        leftSection={<IconCalendar size={16} />}
                        value={initialValue.minRentalTime}
                        onChange={(event) => handleInputChange("minRentalTime", event.target.value)}
                    />
                    <TextInput
                        w={"350"}
                        type="number"
                        label="Maximum Rental Time (in Nights)"
                        placeholder="Enter maximum rental time"
                        leftSection={<IconCalendar size={16} />}
                        value={initialValue.maxRentalTime}
                        onChange={(event) => handleInputChange("maxRentalTime", event.target.value)}
                    />
                    <DatePickerInput
                        w={"350"}
                        type="range"
                        label="Available dates"
                        placeholder="Select available dates"
                        leftSection={<IconCalendar size={16} />}
                        valueFormat="YYYY MMM DD"
                        onChange={(selectedDates) => {
                            setValue(selectedDates);
                            console.log("selectedDates", selectedDates);
                            handleInputDateChange(selectedDates);
                        }}
                    />
                </div>

                <FileInput
                    label="Upload Images (Max 10)"
                    accept="image/*"
                    multiple
                    maxFiles={10}
                    placeholder="Click Here to Add Images"
                    leftSection={<IconUpload size={16} />}
                    onChange={handleFileChange}
                    style={{ marginTop: "20px" }}
                />

                <Button
                    onClick={handleSubmit}
                    style={{ marginTop: "20px", justifySelf: "center" }}
                    variant="filled"
                    color="teal"
                    loading={isSubmitting}
                    loaderProps={{ type: "dots" }}
                >
                    Add Service
                </Button>
            </Container>
            <Container width={"50%"}>
                <Title align="center" size={25} py={10}>
                    Service Card Preview
                </Title>
                <PostCard listData={initialValue} from={"AddService"} />
            </Container>
        </Flex>
    );
};
