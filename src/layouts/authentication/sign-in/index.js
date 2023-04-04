import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/login_wallpaper.jpg";

//authentication set up
import {login} from "../../../store";
import { auth, signInWithEmailAndPassword} from "../../../FireBase";
import { useDispatch } from "react-redux";

function SignIn() {
  const [userData, setUserData] = useState({
        email: "",
        password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const { email, password } = userData;
  const navitage = useNavigate();
  const dispatch = useDispatch();

  const defineErrorMessage = (errorCode)=>{
    if (errorCode == 'auth/wrong-password'){
      return 'The password you entered is incorrect, please try again.';
    }
    else if(errorCode == 'auth/user-not-found'){
      return 'The email you entered is incorrect, please verify it.';
    }

  }

  const handleLogIn = () => {
    //setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        const userData = {
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoUrl: userAuth.user.photoURL,
          accessToken: userAuth.user.accessToken,
        }
        const action = login(userData);
        localStorage.setItem("userToken", JSON.stringify(userData));
        dispatch(action);
        navitage("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(defineErrorMessage(errorCode));
      });
  };

  const handleOnChange = (e) => {
    setErrorMessage(null);
    setUserData({
      ...userData,
      [e.target.type]: e.target.value,
    });
  };


  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            error={errorMessage ? true : false}
            type="email" 
            placeholder="Email" 
            onChange={handleOnChange}
            value={email}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput 
            error={errorMessage ? true : false}
            type="password" 
            placeholder="Password"
            onChange={handleOnChange}
            value={password}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          {errorMessage 
           ?<SoftTypography
            variant="button"
            color="error"
            fontWeight="regular"
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
           {errorMessage}
          </SoftTypography>
          :<></>}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton 
            onClick={handleLogIn}
            variant="gradient" 
            color="info" 
            fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography 
            variant="button" 
            color="text" 
            fontWeight="regular"
            >
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
