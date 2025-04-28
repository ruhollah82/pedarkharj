import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext to access logout function

function Account() {
  const { logout } = useAuth(); // Destructure the logout function from useAuth

  const handleLogout = () => {
    logout(); // Call the logout function to handle user logout
  };

  return (
    <div>
      <h2>Account</h2>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Account;
