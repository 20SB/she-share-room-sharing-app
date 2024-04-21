import {
  Button,
  Card,
  Flex,
  Text,
  Title,
  TextInput,
  Stack,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useService } from "../context/ServiceHandler";
import { useNavigate } from "react-router-dom";

export const City = () => {
  const { user } = useAuth();
  const { newCityName, setNewCityName, postRoom, buyRoom } = useService();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Pune",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Ranchi",
    "Howrah",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
    "Solapur",
    "Hubli-Dharwad",
    "Bareilly",
    "Moradabad",
    "Mysore",
    "Gurgaon",
    "Aligarh",
    "Jalandhar",
    "Tiruchirappalli",
    "Bhubaneswar",
    "Salem",
    "Warangal",
    "Guntur",
    "Bhiwandi",
    "Saharanpur",
    "Gorakhpur",
    "Bikaner",
    "Amravati",
    "Noida",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Nellore",
    "Bhavnagar",
    "Dehradun",
    "Durgapur",
    "Asansol",
    "Rourkela",
    "Nanded",
    "Kolhapur",
    "Ajmer",
    "Akola",
    "Gulbarga",
    "Jamnagar",
    "Ujjain",
    "Loni",
    "Siliguri",
    "Jhansi",
    "Ulhasnagar",
    "Jammu",
    "Sangli-Miraj & Kupwad",
    "Mangalore",
    "Erode",
    "Belgaum",
    "Ambattur",
    "Tirunelveli",
    "Malegaon",
    "Gaya",
    "Jalgaon",
    "Udaipur",
    "Maheshtala",
    "Tirupur",
    "Davanagere",
    "Kozhikode",
    "Akbarpur",
    "Bokaro Steel City",
    "South Dumdum",
    "Bellary",
    "Patiala",
    "Gopalpur",
    "Agartala",
    "Bhagalpur",
    "Muzaffarnagar",
    "Bhatpara",
    "Panihati",
    "Latur",
    "Dhule",
    "Tirupati",
    "Rohtak",
    "Karnal",
    "Shimla",
    "Chandrapur",
    "Junagadh",
    "Thrissur",
    "Alwar",
    "Bardhaman",
    "Kulti",
    "Nizamabad",
    "Parbhani",
    "Tumkur",
    "Khammam",
    "Ozhukarai",
    "Bihar Sharif",
    "Panipat",
    "Darbhanga",
    "Bally",
    "Aizawl",
    "Dewas",
    "Ichalkaranji",
    "Karnal",
    "Bathinda",
    "Jalna",
    "Eluru",
    "Barasat",
    "Kirari Suleman Nagar",
    "Purnia",
    "Satna",
    "Mau",
    "Sonipat",
    "Farrukhabad",
    "Sagar",
    "Rourkela",
    "Durg",
    "Imphal",
    "Ratlam",
    "Hapur",
    "Arrah",
    "Anantapur",
    "Karimnagar",
    "Etawah",
    "Ambarnath",
    "North Dumdum",
    "Bharatpur",
    "Begusarai",
    "New Delhi",
    "Gandhidham",
    "Baranagar",
    "Tiruvottiyur",
    "Pondicherry",
    "Sikar",
    "Thoothukudi",
    "Rewa",
    "Mirzapur",
    "Raichur",
    "Pali",
    "Ramagundam",
    "Haridwar",
    "Vijayanagaram",
    "Katihar",
    "Nagarcoil",
    "Sri Ganganagar",
    "Karawal Nagar",
    "Mango",
    "Thanjavur",
    "Bulandshahr",
    "Uluberia",
    "Katni",
    "Sambhal",
    "Singrauli",
    "Nadiad",
    "Secunderabad",
    "Naihati",
    "Yamunanagar",
    "Bidar",
    "Pallavaram",
    "Munger",
    "Panchkula",
    "Burhanpur",
    "Kharagpur",
    "Dindigul",
    "Hospet",
    "Nangloi Jat",
    "Deoli",
    "Chapra",
    "Port Blair",
    "Haldia",
    "Vapi",
    "Jind",
    "Bikaner",
    "Shillong",
    "Gangtok",
    "Muzaffarpur",
    "Ratnagiri",
    "Chandannagar",
    "Nagaon",
    "Nandyal",
    "Morena",
    "Amroha",
    "Faridkot",
    "Kishanganj",
    "Palwal",
    "Vejalpur",
    "Sultan Pur Majra",
    "Porbandar",
    "Godhra",
    "Tinsukia",
    "Bahraich",
    "Sambalpur",
    "Guna",
    "Kanchipuram",
    "Jaunpur",
    "Madhyamgram",
    "Hugli-Chinsurah",
    "Kumbakonam",
    "Bettiah",
    "Modinagar",
    "Shivpuri",
    "Surendranagar Dudhrej",
    "Unnao",
    "Chinsurah",
    "Alappuzha",
    "Gandhinagar",
    "Barasat",
    "Morbi",
    "Kollam",
    "Bharuch",
    "Mahbubnagar",
    "Batala",
    "Narasaraopet",
    "Chittoor",
    "Yemmiganur",
    "Pudukkottai",
    "Suryapet",
    "Miryalaguda",
    "Palakkad",
    "Anand",
    "Kurichi",
    "Karur",
    "Gandhidham",
    "Purna",
    "Nadiad",
    "Haldwani",
    "Kathua",
    "Rishikesh",
    "Sirsa",
    "Pilibhit",
    "Adilabad",
    "Anantnag",
    "Mango",
    "Bhind",
    "Port Blair",
    "Veraval",
    "Hoshiarpur",
    "Bhimavaram",
    "Vizianagaram",
    "Neyveli",
    "Faridabad",
    "Dharmavaram",
    "Mancherial",
    "Kumbakonam",
    "Deoghar",
    "Ongole",
    "Gandhidham",
    "Karaikkudi",
    "Palani",
    "Proddatur",
    "Adoni",
    "Jorhat",
    "Tonk",
    "Godhra",
    "Shimoga",
    "Tenali",
    "Ambala",
    "Bhuj",
    "Modasa",
    "Navsari",
    "Shahjahanpur",
    "Saharsa",
    "Dibrugarh",
    "Mandya",
    "Hajipur",
    "Dhanbad",
    "Korba",
    "Bhilwara",
    "Berhampur",
    "Gudivada",
    "Erode",
    "Bhimavaram",
    "Shrirampur",
    "Mettupalayam",
    "Bulandshahr",
    "Bansberia",
    "Shimla",
    "Thanjavur",
    "Patan",
    "Nagaur",
    "Dibrugarh",
    "Itanagar",
    "Pondicherry",
    "Silchar",
    "Bettiah",
    "Kalyani",
    "Alandur",
    "Karimnagar",
    "Baranagar",
    "Kottayam",
    "Ballia",
    "Rourkela",
    "Guntakal",
    "Kolhapur",
    "Shantipur",
    "Sambalpur",
    "Buxar",
    "Yavatmal",
    "Tadepalligudem",
    "Sikar",
    "Aizawl",
    "Imphal",
    "Korba",
    "Sonipat",
    "Dindigul",
    "Hindupur",
    "Jehanabad",
    "Hosur",
    "Chanduasi",
    "Bahraich",
    "Khammam",
    "Hanumangarh",
    "Bhimavaram",
    "Kishangarh",
    "Sultan Pur Majra",
    "Barasat",
    "Suryapet",
    "Port Blair",
    "Nalgonda",
    "Gandhidham",
    "Nadiad",
    "Haldwani",
    "Kathua",
    "Rishikesh",
    "Sirsa",
    "Pilibhit",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("cityName", newCityName);
  }, [newCityName]);

  const handleService = () => {
    if (postRoom) {
        navigate("/add-service");
    } else if (buyRoom) {
        navigate("/book-service");
    } else {
        alert("Please select any service ..")
    }
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the cities based on the search query
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(query)
    );

    setFilteredCities(filtered);
    if (query && filtered.length === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle the new city name as needed
    console.log("New city name submitted:", newCityName);

    // Clear the form after submission
    setNewCityName("");
    setShowForm(false);
  };

  return (
    <Flex
      justify={"flex-start"}
      direction={"column"}
      py={20}
      align={"center"}
      mih={"83.8vh"}
    >
      <Flex align={"center"} justify={"space-evenly"}>
        <Title align="center">Choose the City</Title>
      </Flex>
      <TextInput
        radius={"xl"}
        placeholder="Search the city name . . ."
        value={searchQuery}
        onChange={handleSearch}
      />
      <Flex gap={10} p={20} w={"100vw"} wrap="wrap" justify={"center"}>
        {filteredCities.map((city, index) => (
          <Button
            key={index}
            size="lg"
            variant="default"
            onClick={() => {
              setNewCityName(city);
              handleService();
            }}
          >
            <Text>{city}</Text>
          </Button>
        ))}
        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <Stack spacing="md">
              {/* Label and text input for city name */}
              <label htmlFor="newCityName">
                City not found. Please provide the city name:
              </label>
              <TextInput
                id="newCityName"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Enter city name"
              />

              {/* Submit button */}
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        )}
      </Flex>
    </Flex>
  );
};
