import React, { useEffect } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { TextField, Button, Box,Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginFunc, { data, error, isLoading, isSuccess, isError }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (formData) => {
    const result = await loginFunc(formData);
    
    if ("error" in result) {
      setError("username", {
        type: "manual",
        message: "שם משתמש או סיסמה לא נכונים",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({ token: data?.accessToken }));
      navigate("/options");
    }
  }, [isSuccess]);

  return (
    <>
    <Grid item xs={12}>
        <Box
      display="flex"
      alignItems="right"
      justifyContent="right"
     gap={1} // רווח בין הלוגו לטקסט
     marginBottom={2}
   >
    <Typography variant="h5" gutterBottom style={{ textAlign: 'right' }}>
          NutryPath
        </Typography>
    <img
        src={"images/Ellipse 50.png"}
         alt="לוגו"
        style={{ width: 30, height: 30, marginBottom: 8 }}
        />
        
         </Box></Grid>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3, border: "1px solid #ccc", borderRadius: 2 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        התחברות
      </Typography>

      <TextField
        label="שם משתמש"
        fullWidth
        margin="normal"
        {...register("username", { required: "יש להזין שם משתמש" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="סיסמה"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "יש להזין סיסמה",
          minLength: { value: 8, message: "סיסמה חייבת להכיל לפחות 8 תווים" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {isError && !errors.username && (
        <Typography sx={{ color: "red", mt: 1, textAlign: "center" }}>
          שגיאה בהתחברות
        </Typography>
      )}

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
        התחברות
      </Button>
    </Box>
    </>
  );
};

export default Login;
