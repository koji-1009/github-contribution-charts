import { useState } from "react";
import { ContributionResult } from "./ContributionResult";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IFormInput {
  username: string;
  to: Date;
  token: string;
}

export function Contributions() {
  const [request, setRequest] = useState({
    username: "",
    to: new Date(),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: localStorage.getItem("username") ?? "",
      to: new Date(),
      token: localStorage.getItem("token") ?? "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);

    setRequest({
      username: data.username,
      to: data.to,
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6}>
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <DatePicker
                  views={["year", "month"]}
                  label="Year and Month"
                  minDate={new Date(2000, 1, 1)}
                  maxDate={new Date()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: null,
                    },
                  }}
                  slots
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField fullWidth label="GitHub username" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={10}>
            <Controller
              name="token"
              control={control}
              render={({ field }) => (
                <TextField
                  type={"password"}
                  fullWidth
                  label="GitHub Personal Access Token"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth variant="outlined" type="submit">
              Request
            </Button>
          </Grid>
        </Grid>
      </form>

      {request.username.length > 0 ? (
        <ContributionResult username={request.username} to={request.to} />
      ) : null}
    </Box>
  );
}
