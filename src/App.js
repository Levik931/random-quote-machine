import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
const styles = {
  containera: {
    alignItems: "center",
    display: "felx",
    height: "100vh",
    justifyContent: "center",
    backgroundColor: "#F4F9F9",
  },
};

function App({ classes }) {
  const [quotes, setQuotes] = useState([]);
  const [selectQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    );
    const quotes = await data.json();
    setQuotes(quotes);
    assingNewQuoteIndex(Math.random() * quotes.length);
  }, []);

  function generateQuoteIndex() {
    return Math.floor(Math.random() * quotes.length);
  }

  function assingNewQuoteIndex() {
    setSelectedQuoteIndex(generateQuoteIndex());
  }

  return (
    <Grid className={classes.containera} id="quote-box" container>
      <Grid xs={11} lg={8} item>
        {quotes[selectQuoteIndex] ? (
          <Card style={{ backgroundColor: "#FAFGET" }}>
            <CardContent>
              <Typography id="text">
                {quotes[selectQuoteIndex].quote}-
                <span id="author">{quotes[selectQuoteIndex].author}</span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                id="new-quote"
                style={{
                  borderRadius: 10,
                  backgroundColor: " #FFFFF",
                  padding: "5px 3px",
                  fontSize: "13px",
                }}
                size="small"
                onClick={assingNewQuoteIndex}
              >
                Next Quote
              </Button>
              <IconButton
                id="tweet-quote"
                target="_blank"
                href={`https://twitter.com/intent/tweet?text=${quotes[selectQuoteIndex].quote}`}
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  size="lg"
                  color="#26a7de"
                ></FontAwesomeIcon>
              </IconButton>
            </CardActions>
          </Card>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);
