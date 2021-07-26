import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { SelectionItem } from "../../constants/types/types";
import "./index.scss";

const SelectionCard: React.FC<SelectionItem> = ({
  city,
  country,
  countryCode,
  max,
  min,
  avg,
  now,
  index,
}: SelectionItem) => {
  return (
    <Grid item lg={3} md={6} sm={12} xs={12}>
      <div className={index && index % 2 === 0 ? "showDown" : "showUp"}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {city}
            </Typography>
            <Typography>
              {country}
              <Box display="inline" textAlign="left" m={1}>
                <img
                  src={`${
                    "https://www.countryflags.io/" +
                    countryCode +
                    "/flat/16.png"
                  }`}
                  alt="flag"
                ></img>
              </Box>
            </Typography>
            <Typography>
              <div className="stat-border">
                <Box m={1}>
                  <p className={max === now ? 'stat-equal' : ''}>max: {max + "\xB0C"}</p>
                </Box>
                <hr></hr>
                <Box  m={1}>
                <p className={min === now ? 'stat-equal' : ''}>min: {min + "\xB0C"}</p>
                </Box>
                <hr></hr>
                <Box  m={1}>
                <p className={avg === now ? 'stat-equal' : ''}>average: {avg ? (Math.round(avg * 100) / 100).toFixed(2) + "\xB0C" : '-'}</p>
                </Box>
              </div>
              <Box  m={1}>
                <p className="current-border">last: {now + "\xB0C"}</p>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};

export default SelectionCard;
