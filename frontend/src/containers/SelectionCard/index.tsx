import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { CARD_SIZE } from '../../constants/types/enum';
import { SelectionItem } from '../../constants/types/types';
import './index.scss';

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
  const cardSize: CARD_SIZE =
    process.env.REACT_APP_CARD_SIZE &&
    Object.values(CARD_SIZE).includes(
      process.env.REACT_APP_CARD_SIZE as CARD_SIZE
    )
      ? (process.env.REACT_APP_CARD_SIZE as CARD_SIZE)
      : CARD_SIZE.MEDIUM;

  const flagSize:string = cardSize === CARD_SIZE.BIG ? '64' : cardSize === CARD_SIZE.MEDIUM ? '48' : '32'
  return (
    <Grid
      item
      lg={
        cardSize === CARD_SIZE.BIG ? 6 : cardSize === CARD_SIZE.MEDIUM ? 4 : 3
      }
      md={6}
      sm={12}
      xs={12}
    >
      <div className={index && index % 2 === 0 ? 'showDown' : 'showUp'}>
        <Card>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {city}
            </Typography>
            <img
              src={`${
                'https://www.countryflags.io/' + countryCode + '/shiny/' + flagSize +  '.png'
              }`}
              alt='flag'
            ></img>
            <Typography>
              <div className='stat-border'>
                <Box m={1}>
                  <p className={max === now ? 'stat-equal' : ''}>
                    max: {max + '\xB0C'}
                  </p>
                </Box>
                <hr></hr>
                <Box m={1}>
                  <p className={min === now ? 'stat-equal' : ''}>
                    min: {min + '\xB0C'}
                  </p>
                </Box>
                <hr></hr>
                <Box m={1}>
                  <p className={avg === now ? 'stat-equal' : ''}>
                    average:{' '}
                    {avg
                      ? (Math.round(avg * 100) / 100).toFixed(2) + '\xB0C'
                      : '-'}
                  </p>
                </Box>
              </div>
              <Box m={1}>
                <p className='current-border'>last: {now + '\xB0C'}</p>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};

export default SelectionCard;
