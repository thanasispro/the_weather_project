import { Button, Chip, Grid, LinearProgress, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import {
  getCities,
  postCities,
  saveLastSelection,
  mostCommon,
} from './actions';
import './index.scss';
import SelectionCard from '../SelectionCard';
import { useParams } from 'react-router-dom';
import { HomepageParam, SelectionItem } from '../../constants/types/types';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { PAGE_TYPE } from '../../constants/types/enum';
import { Alert, AlertTitle } from '@material-ui/lab';

const App = () => {
  const [selected, setSelected] = useState<SelectionItem[]>([]);
  const [results, setResults] = useState<SelectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadDataError, setLoadDataError] = useState('');
  const [clicked, setClicked] = useState(0);
  const [checkedTemperature, setCheckedTemperatue] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const showValues = process.env.REACT_APP_SHOW_VALUES || '4';
  const { type } = useParams<HomepageParam>();

  let history = useHistory();

  let username: string | null = localStorage.getItem('username');

  const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(3),
    },
    marginTop: {
      marginTop: '20px',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (!username) {
      history.push('/');
    } else {
      setShowMore(false);
      setLoadDataError('')
      setResults([]);
      setClicked(0);
      setCheckedTemperatue(false);
      if (!type) {
        setSelected([]);
      } else if (type.toUpperCase() === PAGE_TYPE.TOP) {
        mostCommon()
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
    console.log(selected)
    console.log(results)
    if (clicked > 0 && selected.length > results.length) {
      handlePost(clicked, null, true)
    } else {
      setShowMore(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, clicked, selected, showMore])

  useEffect(() => {}, [
    selected,
    results,
    isLoading,
    loadDataError,
    clicked,
    checkedTemperature,
    username,
  ]);

  const loadOptions = async (inputValue: string) => {
    let optionsToShow: SelectionItem[] = [];
    await getCities(inputValue)
      .then((res) => {
        optionsToShow = res?.data?.data ? res.data.data : [];
      })
      .catch((w) => {
        return (optionsToShow = []);
      });
    return optionsToShow;
  };

  const handlePost = (
    value: number,
    sel: SelectionItem[] | null,
    saveToDb: boolean
  ) => {
    if (username) {
      let selection = sel && selected.length > 0 ? sel : selected;
      setLoadDataError('');
      setIsLoading(true);
      setShowMore(
        selection.length > value * parseInt(showValues) + parseInt(showValues)
      );
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
          setClicked(clicked + 1);
        })
        .catch((err) => {
          setIsLoading(false);
          setLoadDataError(err.response ? err.response.data.error : 'General error');
        });
    } else {
      history.push('/');
    }
  };

  return (
    <div>
      <Header></Header>
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
                  setClicked(0)
                  if (value && selected) {
                    let newSelects: SelectionItem[] = [...selected, value];
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
              className={classes.marginTop}
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
            className={classes.marginTop}
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
              className={classes.marginTop}
              variant='contained'
              startIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
              onClick={() => {
                setCheckedTemperatue(false);
                setResults([]);
                setSelected([]);
                setLoadDataError('')
              }}
            >
              New Search
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
        className={classes.marginTop}
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

        {loadDataError && 
           <Alert severity="error">{loadDataError}</Alert>
        }
      </Grid>

      {showMore && !type && (
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12}>
            <Alert  severity="info" className={classes.marginTop} variant="filled">
                <AlertTitle>Already calculate: {results.length} results of {selected.length}</AlertTitle>
                CALCULATE{' '}
              {selected.length - (clicked + 1) * parseInt(showValues) >
              parseInt(showValues)
                ? ' NEXT ' + showValues
                : ' LAST ' +
                  (selected.length - (clicked + 1) * parseInt(showValues))}
            </Alert>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default App;
