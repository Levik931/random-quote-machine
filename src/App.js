import { Component } from "react";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectQuoteIndex: null,
    };
    this.assingNewQuoteIndex = this.assingNewQuoteIndex.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((data) => data.json())
      .then((quotes) =>
        this.setState({ quotes: quotes }, this.assingNewQuoteIndex)
      );
  }

  selectQuoteIndex() {
    return Math.floor(Math.random() * this.state.quotes.length);
  }

  assingNewQuoteIndex() {
    this.setState({ selectQuoteIndex: this.selectQuoteIndex() });
  }

  render() {
    return (
      <Grid className={this.props.classes.containera} id="quote-box" container>
        <Grid xs={11} lg={8} item>
          {this.state.quotes[this.state.selectQuoteIndex] ? (
            <Card style={{ backgroundColor: "#FAFGET" }}>
              <CardContent>
                <Typography id="text">
                  {this.state.quotes[this.state.selectQuoteIndex].quote}-
                  <span id="author">
                    {this.state.quotes[this.state.selectQuoteIndex].author}
                  </span>
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
                  onClick={this.assingNewQuoteIndex}
                >
                  Next Quote
                </Button>
                <IconButton
                  id="tweet-quote"
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?text=${
                    this.state.quotes[this.state.selectQuoteIndex].quote
                  }`}
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
}
export default withStyles(styles)(App);
