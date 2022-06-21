import { Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";

import SubmitButton from "../../shared/buttons/button-default";
import { UserLogin } from "../../shared/fetch/user";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    UserLogin(formData)
      .then((response) => {
        alert("Access Granted");
        console.log("user id:", response);
        navigate("/faq");
      })
      .catch((error) => {
        console.log("Error:", error);
        if (error.request.status === 401) {
          alert("Access Denied");
        }
      });
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item xs={3} alignItems="center">
        <h3>Logga in</h3>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            variant="outlined"
            type="text"
            name="userName"
            required={true}
            value={formData.userName}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required={true}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Grid container justifyContent="center">
            <SubmitButton />
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LogIn;
