import { Container, Paper } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import AuthComponent from "../Authentication/AuthComponent";
import { login, checkLog } from "../../store/features/auth.slice";
import { clearMessage } from "../../store/features/message.slice";
import AuthService from "../../services/auth.service";
import { useIntl } from "react-intl";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLogStatus = async (token) => {
    try {
      dispatch(checkLog())
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoggedIn) {
    checkLogStatus();
    if (isLoggedIn) {
      navigate("/");
    }
  }

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleValues = async (values) => {
    try{
      const result = dispatch(login(values));
      return result;
    } catch (err) {
      console.log(err);
    } 
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleValues(values)
        .then((res) => {
          navigate("/");
          dispatch(clearMessage());
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const { formatMessage } = useIntl();

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px"}}>
        <Paper square={false} elevation={3}>
          <AuthComponent
            pageTitle={formatMessage({ id: "login.pageTitle" })}
            authTitle={formatMessage({ id: "login.authTitle" })}
            // authSubtitle={formatMessage({ id: "login.authSubtitle" })}
            formComponent={
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "80%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={formatMessage({ id: "login.formLabel.emailaddress" })}
                  name="email"
                  autoComplete="email"
                  inputProps={{ "data-testid": "login-email" }}
                  autoFocus
                  sx={{ fontSize: "12px" }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={formatMessage({ id: "login.formLabel.password" })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  inputProps={{ "data-testid": "login-password" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <Box
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  marginTop={"17px"}
                  marginBottom={"17px"}
                >
                  {/* <Link to="/forget-password" style={{ marginLeft: "0px" }}>
                    <Typography
                      variant="h5"
                      fontSize="13px"
                      color="#444850"
                      sx={{ textDecoration: "underline" }}
                    >
                      {formatMessage({ id: "login.forgotPasswordLabel" })}
                    </Typography>
                  </Link> */}
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    color: "#fff",
                    outline: "red",
                    textTransform: "capitalize",
                    padding: "0px ",
                    borderRadius: "10px",
                    backgroundColor: "#f5333f",
                    "&:hover": {
                      backgroundColor: "#f5333f",
                    },
                    fontSize: "14px",
                  }}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  {formatMessage({ id: "login.loginBtn" })}
                </Button>

                <Box
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  marginTop={"17px"}
                  marginBottom={"17px"}
                >
                  <Typography variant="h5" fontSize="13px" color="#444850">
                    {formatMessage({ id: "login.accountLabel" })}
                  </Typography>
                  <Link to="/register" style={{ marginLeft: "8px" }}>
                    <Typography
                      variant="h5"
                      fontSize="13px"
                      color="#444850"
                      sx={{ textDecoration: "underline" }}
                    >
                      {formatMessage({ id: "login.signUpLabel" })}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            }
          />
        </Paper>
      </Container>
    </>
  );
};

export default Login;
