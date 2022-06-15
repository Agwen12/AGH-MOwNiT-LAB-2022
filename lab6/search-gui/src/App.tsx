import { Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Article, ArticleListComponent } from './article-list.component';
import { SearchFieldComponent } from './search-field.component';


const useStyles = makeStyles(theme => ({
  centered: {
    top: "auto",
    bottom: 0,
    textAlign: "center",
    marginTop: '5vh'
  }
}));

async function makeRequest(query: string): Promise<Article[]> {
  const response = await axios.post('http://127.0.0.1:5000/search', {
    keyword: query
  })
  if (response.status === 200 && response.data) {
    console.log(response.data)
    return response.data as Article[]
  } else {
    return []
  }

}

function App() {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([
    {
      title: 'Test',
      url: 'https://mui.com/material-ui/react-link/',
      close: '0.1'
    }
  ])


  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchArticles = async () => {
      const results = await makeRequest(query);
      setArticles(results);
    }
    fetchArticles();
  }, [query, setArticles])

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Typography variant="h1" component="h2" className={classes.centered} >
            Search articles
          </Typography>
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <SearchFieldComponent onChange={setQuery} />
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <ArticleListComponent articles={articles} />
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Grid>
  );
}

export default App;
