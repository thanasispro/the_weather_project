import { Grid } from "@material-ui/core";
import "./index.scss";

const Header = () => {
  return (
    <div className='header'>
      <Grid container>
        <Grid item xs={12}>
          <h2 className='title'>The weather project</h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
