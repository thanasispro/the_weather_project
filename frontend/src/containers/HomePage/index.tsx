import { Button, Chip, Grid, LinearProgress, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import {
  getCities,
  postCities,
  saveLastSelection,
  findAll,
  mostCommon,
} from './actions';
import './index.scss';
import SelectionCard from '../SelectionCard';
import { useLocation, useParams } from 'react-router-dom';
import { HomepageParam } from '../../types/types';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const App = () => {
  const [selected, setSelected] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadDataError, setLoadDataError] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [checkedTemperature, setCheckedTemperatue] = useState(false);
  const showValues = process.env.REACT_APP_SHOW_VALUES || '4';
  const { type } = useParams<HomepageParam>();

  const location: any = useLocation();

  let history = useHistory();

  const username = location?.state?.username;

  const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
    },
    buttonStyle: {
      marginTop: '20px',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (!username) {
      history.push('/');
    } else {
      setResults([]);
      setClicked(0);
      setCheckedTemperatue(false);
      setShowMore(false);
      if (!type) {
        setSelected([]);
      } else if (type.toUpperCase() === 'TOP') {
        mostCommon()
          .then((res) => {
            setSelected(res.data ? res.data : []);
            handlePost(0, res.data, false);
          })
          .catch(() => {});
      } else if (type.toUpperCase() === 'HISTORY') {
        findAll(username)
          .then((res) => {
            setSelected(res.data ? res.data : []);
            handlePost(0, res.data, false);
          })
          .catch(() => {});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
  }, [
    selected,
    results,
    isLoading,
    loadDataError,
    clicked,
    checkedTemperature,
    username,
  ]);

  const loadOptions = async (inputValue: string) => {
    let chank: any[] = [];
    await getCities(inputValue)
      .then((res) => {
        chank = res?.data?.data ? res.data.data : [];
      })
      .catch((w) => {
        return (chank = []);
      });
    return chank;
  };

  const handlePost = (value: number, sel: any, saveToDb: boolean) => {
    if (username) {
      let selection = sel && selected.length > 0 ? sel : selected;
      setLoadDataError(false);
      setIsLoading(true);
      setShowMore(selection.length > value * parseInt(showValues) + parseInt(showValues));
      postCities(
        sel
          ? sel
          : selection.slice(
              value === 0 ? 0 : value * parseInt(showValues),
              value * parseInt(showValues) + parseInt(showValues)
            ),
        username,
        saveToDb
      )
        .then((res: any) => {
          setResults(value === 0 ? res.data : [...results].concat(res.data));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setLoadDataError(true);
        });
    } else {
      history.push('/');
    }
  };

  return (
    <div>
      <Header username={username}></Header>
      <div className='select'></div>
      {!type && !checkedTemperature && (
        <div>
          <Grid container>
            <Grid lg={4} md={3}></Grid>
            <Grid item md={4} sm={12} xs={12}>
              <AsyncSelect
                placeholder='Start typing a city...'
                value={null}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={[]}
                getOptionLabel={(option) => option.city + ', ' + option.country}
                onChange={(value) => {
                  if (value) {
                    let newSelects = [...selected, value];
                    setSelected(newSelects);
                  }
                }}
                isOptionDisabled={(option) => {
                  let found = false;
                  selected.forEach((o: any) => {
                    if (o.id === option.id) {
                      found = true;
                    }
                  });
                  return found;
                }}
              />
            </Grid>
          </Grid>
          {selected && (
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
              className={classes.buttonStyle}
            >
              <Grid item xs={8}>
                <Paper>
                  {selected.map((data: any) => {
                    let icon;
                    return (
                      <Chip
                        icon={icon}
                        label={data.city}
                        onDelete={(s: any) => {
                          const newList = selected.filter(
                            (s: any) => s.id !== data.id
                          );
                          setSelected(newList);
                        }}
                      />
                    );
                  })}
                </Paper>
              </Grid>
            </Grid>
          )}
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            className={classes.buttonStyle}
          >
            <Button
              variant='contained'
              color='primary'
              disabled={!selected.length || isLoading}
              onClick={() => {
                setClicked(0);
                handlePost(0, null, true);
                if (username) {
                  saveLastSelection(selected, username);
                }
                setCheckedTemperatue(true);
              }}
            >
              Check Temperature
            </Button>
          </Grid>
        </div>
      )}

      <div className='select'></div>
      {isLoading && (
        <Grid container>
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )}

      {checkedTemperature && !isLoading && (
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs-={12}>
            <Button
              className={classes.buttonStyle}
              variant="contained"
              startIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
              onClick={() => {
                setCheckedTemperatue(false);
                setResults([]);
                setShowMore(false);
                setSelected([]);
              }}
            >
              Search Again
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        spacing={1}
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
        className={classes.buttonStyle}
      >
        {results &&
          !isLoading &&
          results.map((res: any, index: number) => (
            <SelectionCard
              city={res.city}
              country={res.country}
              max={res.max}
              min={res.min}
              avg={res.avg}
              now={res.now}
              countryCode={res.countryCode}
              index={index}
            ></SelectionCard>
          ))}

        {loadDataError && <p>Error while retrieved data</p>}
      </Grid>
      <div className='selects'>
        {showMore && !type && !isLoading && (
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              setClicked(clicked + 1);
              handlePost(clicked + 1, null, true);
            }}
          >
            SHOW MORE...
          </Button>
        )}
      </div>
    </div>
  );
};

export default App;
