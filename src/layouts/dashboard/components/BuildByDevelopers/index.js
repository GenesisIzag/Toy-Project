// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import CircularProgress from '@mui/material/CircularProgress';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import { useSelector } from "react-redux";

function BuildByDevelopers() {
  let renderArticles;

  const data = useSelector((state) => {
    return state.articleFilter[0];
  });

  let defectImg;

  const limitStringToShow = (string, limit) => {
    let limitString;
    let index;
    limitString = string.substring(0, limit);
    index = limitString.lastIndexOf(" ");
    return limitString.slice(0, index) + "...";
  };

  function getRandomInt() {
    return Math.floor((Math.random() * (9999888 - 1 + 1)) + 1);
  }
  if (data){
    renderArticles = data.map((e) => {
      e.multimedia // is the image sended via props
        ? (defectImg = e?.multimedia[1]?.url)
        : (defectImg =
            "https://around.uoregon.edu/sites/default/files/styles/landscape_xl/public/field/image/nyt.jpg?itok=gNTLA2e2");
      if (e.title != "") {
        return (
          <Grid item xs={12} md={6} lg={6} key={getRandomInt()}>
            <Card sx={{minHeight:'100%', justifyContent:'center'}}>
              <SoftBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    <SoftBox display="flex" flexDirection="column" height="100%">
                      <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                        {limitStringToShow(e.title, 48)}
                      </SoftTypography>
                      <SoftBox mb={6}>
                        <SoftTypography variant="body2" color="text">
                          {limitStringToShow(e.abstract, 80)}
                        </SoftTypography>
                      </SoftBox>
                      <SoftTypography
                        component="a"
                        href={e.url}
                        target="_blank"
                        variant="button"
                        color="text"
                        fontWeight="medium"
                        sx={{
                          mt: "auto",
                          mr: "auto",
                          display: "inline-flex",
                          alignItems: "center",
                          cursor: "pointer",
  
                          "& .material-icons-round": {
                            fontSize: "1.125rem",
                            transform: `translate(2px, -0.5px)`,
                            transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                          },
  
                          "&:hover .material-icons-round, &:focus  .material-icons-round": {
                            transform: `translate(6px, -0.5px)`,
                          },
                        }}
                      > 
                        Read More
                        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
                    <SoftBox
                      height="100%"
                      display="grid"
                      justifyContent="center"
                      alignItems="center"
                      bgColor="info"
                      borderRadius="lg"
                      variant="gradient"
                    >
                      <SoftBox
                        component="img"
                        src={wavesWhite}
                        alt="waves"
                        display="block"
                        position="absolute"
                        left={0}
                        width="100%"
                        height="100%"
                      />
                      <img src={defectImg} alt="rocket" width="100%" pt={3} loading="lazy" />
                    </SoftBox>
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
          </Grid>
        );
      }
    });
  }
  else{
    renderArticles = <Grid item>
                        <CircularProgress color="primary"/>
                     </Grid>
  }
  return renderArticles;
}

export default BuildByDevelopers;
