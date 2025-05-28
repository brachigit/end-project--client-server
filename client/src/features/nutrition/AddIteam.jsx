import { useAddNutrionMutation } from "./nutritionApiSlice";
import { Outlet } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const AddIteam = () => {
  const [AddFunc, { isLoading }] = useAddNutrionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data1) => {
    try {
      await AddFunc(data1).unwrap();
    } catch (err) {
      if (err?.data?.message === "iteam already exists") {
        setError("name", {
          type: "server",
          message: "This item already exists",
        });
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        הוסף פריט חדש
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="שם פריט"
            variant="standard"
            {...register("name", { required: "Name and nutrientType are required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="סוג חומר מזין"
            variant="standard"
            {...register("nutrientType", { required: "Name and nutrientType are required" })}
            error={!!errors.nutrientType}
            helperText={errors.nutrientType?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: { xs: "100%", sm: "50%" } }}
            disabled={isLoading}
            size="large"
          >
            {isLoading ? "שולח..." : "הוסף"}
          </Button>
        </Grid>
      </Grid>

      <Outlet />
    </Box>
  );
};

export default AddIteam;
