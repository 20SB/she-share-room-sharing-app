import "./App.css";
import { Button } from "@mantine/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthenticationForm } from "./components/Authentication";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { City } from "./components/City";
import { AddService } from "./components/AddService";
import { BookService } from "./components/BookService";
import { MyBooking } from "./components/MyBooking";
import { MySharing } from "./components/MySharing";
import ProtectedRoute from "./routes/ProtectedRoute";
import { NothingFoundBackground } from "./components/NothingFoundBackground";
import { Toaster } from "react-hot-toast";

function App() {
    const location = useLocation();
    return (
        <div className="App">
            <Toaster position="top-right" />
            <Header />
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/auth" Component={AuthenticationForm} />
                <Route path="/city" element={<ProtectedRoute element={<City />} />} />
                <Route path="/add-service" element={<ProtectedRoute element={<AddService />} />} />
                <Route
                    path="/book-service"
                    element={<ProtectedRoute element={<BookService />} />}
                />
                <Route path="/my-booking" element={<ProtectedRoute element={<MyBooking />} />} />
                <Route path="/my-sharing" element={<ProtectedRoute element={<MySharing />} />} />
                <Route
                    path="/no-data"
                    element={<ProtectedRoute element={<NothingFoundBackground />} />}
                />
            </Routes>

            {location.pathname !== "/auth" && <Footer />}
        </div>
    );
}

export default App;
