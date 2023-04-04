import { useEffect, useState } from "react";
import usePagination from "../../hooks/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { addArticleFilter } from "../../store";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function PaginationBar(Props) {
  const searchParam = useSelector((state) => {
    return state.articleFilter[2];
  });
  let render;
  let [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const allArticles = Props.data;

  const filterData = () => {
    let filterArticles = [];
    if (searchParam) {
      allArticles.filter((e) => {
        if (e.title.toLowerCase().includes(searchParam.toLowerCase())) {
          filterArticles.push(e);
        }
      });
      return filterArticles;
    } else {
      return allArticles;
    }
  };

  const articles = filterData();
  const PER_PAGE = 6;
  const count = Math.ceil(articles.length / PER_PAGE);
  const _DATA = usePagination(articles, PER_PAGE);
  

  useEffect(() => {
    const action = addArticleFilter(_DATA.currentData());
    dispatch(action);
  }, [page]);

  useEffect(()=>{
    const action = addArticleFilter(_DATA.currentData());
    dispatch(action);
  })

  useEffect(() => {
      setPage(1);
      _DATA.jump(1);
    const action = addArticleFilter(_DATA.currentData());
    dispatch(action);
  }, [searchParam]);

  const handleChange = (s, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (articles.length == 0) {
    render = <h2>Sorry, we haven&apos;t found articles with that term.</h2>;
  } else {
    render = (
      <Grid item xs={12} md={12} lg={12}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          color="secondary"
          onChange={handleChange}
        />
      </Grid>
    );
  }

  return (
   render
  );
}

export default PaginationBar;
