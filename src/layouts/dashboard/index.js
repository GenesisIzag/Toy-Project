// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";

// Data
import articleSectionsList from "./data/articleSectionsList";
import useSectionImages from "./data/useSectionImages";

//API
import GetArticlesBySection from "../../api";
import { useQuery } from "@tanstack/react-query";
``;

//react hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticles, addArticleFilter, addSearchItem } from "../../store";
import PaginationBar from "../../components/PaginationBar.js";

function Dashboard() {
  const dispatch = useDispatch();

  const searchItem = useSelector((state) => {
    return state.articleFilter[1];
  });

  let query = useQuery(["articles", searchItem], () => GetArticlesBySection(searchItem));

  const handleOnClickSection = (item) => {
    const action = addSearchItem(item);
    dispatch(action);
  };

  // const renderSections
  const renderSections = articleSectionsList.map((e) => {
    return (
      <Grid item xs={12} lg={5} key={e.imgKey}>
        <WorkWithTheRockets
          label={e.label}
          requestItem={e.requestItem}
          img={useSectionImages[e.imgKey]}
          handleOnClickSection={handleOnClickSection}
        />
      </Grid>
    );
  });

  useEffect(() => {
    if (query.isError) {
      console.log(query.error);
    } else if (query.data) {
      const action1 = addArticles(query.data);
      const action2 = addArticleFilter(query.data);
      dispatch(action1);
      dispatch(action2);
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [searchItem]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2} >
            {query.isFetched && searchItem ? (
              <Grid
                item
                md={12}
                lg={12}
                xs={12}
                sx={{ alignSelf: "center", justifySelf: "center" }}
              >
                <PaginationBar data={query.data} />
              </Grid>
            ) : (
              <></>
            )}
            {searchItem ? <BuildByDevelopers/>: renderSections}
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
