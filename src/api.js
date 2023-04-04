import axios from "axios";

const GetArticlesBySection = async (term) => {
 return await axios.get(
    `https://api.nytimes.com/svc/topstories/v2/${term || 't-magazine'}.json?api-key=${process.env.REACT_APP_API_KEY}`,
    {
      headers: {
        Accept: "application/json",
      }
    }
  )
  .catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return error.request;
    } else {
      return 'Error', error.message;
    }
  })
  .then((res)=>{
    return res.data.results;
  });
};

export default GetArticlesBySection;