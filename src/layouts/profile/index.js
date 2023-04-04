/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";


// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";


// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import { auth}from "../../FireBase";

function Overview() {
  const {displayName, email} = auth.currentUser;
  let info = {
    fullName: displayName,
    mobile: "(44) 123 1234 123",
    email: email,
    location: "USA",
  }

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} xl={6}>
            <ProfileInfoCard
              title="profile information"
              description="Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={info}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} xl={6}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
