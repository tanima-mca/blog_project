import React, { useState } from "react";
import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endpoints";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);

  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("photo", image);

    try {
      const response = await axiosInstance.post(endPoints.auth.register, formData);

      if (response.status === 200) {
        toast.success(response.data.message || "Registration successful!");
        localStorage.setItem("token", response.data.token)
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
      console/log("login successful" ,response.data.message)
    } catch (error) {
      // toast.error(error.data.message);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "0 auto",
        padding: 4,
        borderRadius: 3,
        boxShadow: 10,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "#bbdefb",
        "& .MuiTextField-root": { marginBottom: 2 },
      }}
    
    >
      <Typography
        variant="h4"
        component="h1"
        marginBottom={4}
        align="center"
      >
        <b>Registration Form</b>
      </Typography>
      <TextField
        {...register("name", { required: "Name is required" })}
        label="Name"
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name && errors.name.message}
      />
      <TextField
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email format",
          },
        })}
        label="Email"
        type="email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
      />
      <TextField
        {...register("mobile", { required: "Mobile number is required" })}
        label="Mobile"
        type="text"
        variant="outlined"
        error={!!errors.mobile}
        helperText={errors.mobile && errors.mobile.message}
      />
      <TextField
        {...register("password", { required: "Password is required" })}
        label="Password"
        type="password"
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
      />
      <TextField
        type="file"
        variant="outlined"
        color="secondary"
        onChange={(e) => setImage(e.target.files[0])}
        fullWidth
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      />
      {image && (
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
          gap={2}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            height={100}
            style={{ borderRadius: "10px" }}
          />
          <Typography variant="caption" display="block">
            Selected file: {image.name}
          </Typography>
        </Stack>
      )}
      <Button
        type="submit"
        variant="outlined"
        sx={{
          mt: 3,
          fontSize: 18,
          color: "#1a237e",
        }}
        onClick={handleSubmit(ClickFunction)}
      >
        <b>Register Now!</b>
      </Button>
    </Box>
  );
};

export default Registration;
