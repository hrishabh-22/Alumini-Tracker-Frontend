import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight: 370,
  },
  media: {
    height: 200,
    width: 345,
  },
});

const MyCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ marginLeft: 50, marginBottom: 20 }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.author}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={props.url}>
          <Button size="small" color="secondary">
            {props.buttonAction}
          </Button>
        </a>
      </CardActions>
    </Card>
  );
};

export default MyCard;
