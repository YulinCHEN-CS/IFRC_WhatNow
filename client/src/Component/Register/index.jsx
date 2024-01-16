import { Alert, Container, InputAdornment } from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import AuthComponent from "../Authentication/AuthComponent";
import PasswordComponent from "../Authentication/PasswordComponent";
import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../store/features/auth.slice";

const Register = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSendEnabled, setIsSendEnabled] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const { formatMessage } = useIntl();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailSent) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsEmailSent(false);
            clearInterval(timer);
            return 60;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isEmailSent]);

  const handleRegister = (values) => {
    console.log(values.email);
    dispatch(register(values))
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain at least one uppercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleEmailChange = (
    event: React.ChangeEvent
  ): void => {
    const isValidEmail = Yup.string()
      .email("Invalid email address")
      .required("Required")
      .isValidSync(event.target.value);
    setIsSendEnabled(isValidEmail);
    formik.handleChange(event);
    setEmailError("");
    setIsEmailSent(false);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <AuthComponent
        pageTitle={formatMessage({ id: "register.pageTitle" })}
        authTitle={formatMessage({ id: "register.authTitle" })}
        authSubtitle={formatMessage({ id: "register.authSubtitle" })}
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
              label="Email Address"
              name="email"
              autoFocus
              autoComplete="email"
              sx={{ fontSize: "12px" }}
              value={formik.values.email}
              onChange={handleEmailChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" />
                ),
              }}
            />
            {isEmailSent && (
              <Alert severity="success">Email has been sent</Alert>
            )}
            {emailError !== "" && <Alert severity="error">{emailError}</Alert>}

            <PasswordComponent formik={formik} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                color: "#fff",
                outline: "red",
                textTransform: "capitalize",
                borderRadius: "10px",
                backgroundColor: "#f5333f",
                "&:hover": {
                  backgroundColor: "#f5333f",
                },
                fontSize: "14px",
              }}
              disabled={!formik.isValid || !formik.dirty}
            >
              Register
            </Button>
            <Box
              textAlign="center"
              display="flex"
              justifyContent="center"
              marginTop={"17px"}
              marginBottom={"17px"}
            >
              <Typography variant="h5" fontSize="13px" color="#444850">
                Already have an account?
              </Typography>
              <Link to="/login" style={{ marginLeft: "8px" }}>
                <Typography
                  variant="h5"
                  fontSize="13px"
                  color="#444850"
                  sx={{ textDecoration: "underline" }}
                >
                  Log in
                </Typography>
              </Link>
            </Box>
          </Box>
        }
      />
    </Container>
  );
};

export default Register;
