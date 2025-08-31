import { Container, Paper } from "@mui/material";
import { useState } from "react";
import SignInForm from "../components/forms/SignInForm";
import SignUpForm from "../components/forms/SignUpForm";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <SignInForm toggleLogin={toggleLogin} />
        ) : (
          <SignUpForm toggleLogin={toggleLogin} />
        )}
      </Paper>
    </Container>
  );
}

export default LoginPage;
