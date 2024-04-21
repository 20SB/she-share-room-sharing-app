import { Accordion, Flex, Title } from "@mantine/core";
import React from "react";

export const FAQ = () => {
    const groceries = [
        {
            question:
                "How does your platform ensure the safety of women sharing and renting rooms?",
            answer: "We prioritize safety by implementing stringent verification processes for all users. Hosts and guests must provide detailed profiles and undergo identity checks.",
        },
        {
            question: "Can I trust the hosts listed on your platform?",
            answer: "Yes, we encourage community engagement and rely on user reviews to maintain a trustworthy environment. We also offer secure payment options to protect your transactions.",
        },
        {
            question: "How do I become a host on your platform?",
            answer: "Becoming a host is easy! Simply create a profile, list your room details, set your preferences, and start connecting with potential guests.",
        },
        {
            question: "What type of rooms can I find on your platform?",
            answer: "You'll find a variety of rooms—from shared spaces to private accommodations—all specifically listed by and for women.",
        },
        {
            question: "How can I contact support if I have questions or issues?",
            answer: "Our customer support team is available 24/7 to assist you. You can reach out via email or chat directly through our platform.",
        },
        {
            question: "Are there any additional fees I should be aware of?",
            answer: "We are transparent about our fees. You'll only be charged the agreed-upon rate with the host, plus any applicable service fees.",
        },
        {
            question: "What happens if there's a problem during my stay?",
            answer: "We encourage open communication between hosts and guests. If any issues arise, our support team is here to help resolve them promptly.",
        },
        {
            question: "How can I ensure my personal information remains secure?",
            answer: "We prioritize data protection and use industry-standard security measures to safeguard your personal information.",
        },
        {
            question: " Can I cancel a booking if needed?",
            answer: "Yes, our platform allows for flexible cancellation policies. Refer to the specific booking details for more information.",
        },
        {
            question: "BroIs there a minimum or maximum rental duration?ccoli",
            answer: "The rental duration is determined by the host and listed in the room details. You can filter your search based on your preferred rental period.",
        },
    ];

    const items = groceries.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel bg={"gray"}>{item.answer}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Flex justify={"center"} direction={"column"} py={20} align={"center"}>
            <Title align="center">Frequently Asked Questions</Title>
            <Accordion transitionDuration={1000} w={{ base: "90%", sm: "80%", lg: "70%" }} pt={10}>
                {items}
            </Accordion>
        </Flex>
    );
};
