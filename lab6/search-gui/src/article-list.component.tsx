import React, { useState } from 'react';

import { Grid, Link, ListItem, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    centered: {
        textAlign: "center",
        justifyContent: "center",
        margin: "auto"
    },
    listItem: {
        border: '1px solid lightgrey',
        borderRadius: '5px',
        width: '90%',
        margin: 'auto',
        marginTop: '5px'
    }
}));


export interface Article {
    title: string
    url: string
    close: string
}

interface ArticleListProps {
    articles: Article[]
}

export const ArticleListComponent = ({ articles }: ArticleListProps): JSX.Element => {
    return <>
        {articles.map(a => <ArticleComponent key={a.title} article={a} />)}
    </>
}

const ArticleComponent = ({ article }: { article: Article }) => {
    const classes = useStyles();
    return <Grid container spacing={2} className={classes.listItem}>
        <Grid item xs={3} className={classes.centered}>
            <Typography component="p" >
                {article.title}
            </Typography>
        </Grid>
        <Grid item xs={6} className={classes.centered}>
            <Link href={article.url}>
                {article.url}
            </Link>
        </Grid>
        <Grid item xs={3} className={classes.centered}>
            <Typography component="p" >
                {article.close}
            </Typography>
        </Grid>
    </Grid>
}