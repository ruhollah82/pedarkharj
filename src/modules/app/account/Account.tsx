import { Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

function Account() {
  const { logoutUser } = useAuth(); // Destructure the logout function from useAuth

  const handleLogout = () => {
    logoutUser(); // Call the logout function to handle user logout
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
