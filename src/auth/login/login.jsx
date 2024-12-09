import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endpoints";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

        try {
          const response = await axiosInstance.post(endPoints.auth.login, data);
          if (response.status === 200) {
            toast.success(response.data.message || "Login successful!");
            localStorage.setItem("token", response.data.token);
          } else {
            toast.error(response.data.message || "Login failed!");
          }
        } catch (error) {
           toast.error(response.data.message || "Something went wrong. Please try again.");
        }
    }

      

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#e1bee7" }}
    >
      <Paper elevation={10} style={{ padding: 20, width: 280, borderRadius: 10 }}>
        <Grid align="center">
          <Avatar style={{ background: "#3949ab" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h5"
            style={{ margin: "10px 0", color: "#3949ab" }}
          >
            Sign In
          </Typography>
        </Grid>

        <form>
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
            })}
            label="Email"
            placeholder="Enter email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />

          <TextField
            {...register("password", {
              required: "Password is required",
            })}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ margin: "10px 0", background: "#3949ab", color: "#fff" }}
            onClick={handleSubmit(handleLogin)}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login
