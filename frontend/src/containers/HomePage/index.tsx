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
  const [checkedTemperature, setCheckedTemperatue] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const showValues = process.env.REACT_APP_SHOW_VALUES || '4';
  const { type } = useParams<HomepageParam>();
  let limit = process.env.REACT_APP_TOP_PAGE || '8'

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
      setLoadDataError('');
      setResults([]);
      setCheckedTemperatue(false);
      if (!type) {
        setSelected([]);
      } else if (type.toUpperCase() === PAGE_TYPE.TOP) {
        mostCommon(parseInt(limit))
          .then((res) => {
            handlePost(res.data, false);
          })
          .catch(() => {});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (!type && selected.length > results.length) {
      handlePost(selected.slice(results.length, results.length + parseInt(showValues)), true);
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {}, [
    selected,
    isLoading,
    loadDataError,
    checkedTemperature,
    username,
    showMore,
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
    sel: SelectionItem[] | null,
    saveToDb: boolean
  ) => {
    if (username) {
      let selection = sel ? sel : [];
      setLoadDataError('');
      setIsLoading(true);
      postCities(selection,username,saveToDb)
        .then((res: any) => {
          setResults(results.length === 0 || type ? res.data : [...results].concat(res.data));
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setLoadDataError(
            err.response ? err.response.data.error : 'General error'
          );
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
                handlePost(selected.slice(0, parseInt(showValues)), true);
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
                setLoadDataError('');
              }}
            >
              New Search
            </Button>
          </Grid>
        </Grid>
      )}
      {showMore && !type && (
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12}>
            <Alert
              severity='info'
              className={classes.marginTop}
              variant='filled'
            >
              <AlertTitle>
                Already calculate: {results.length} of {selected.length} results
              </AlertTitle>
            </Alert>
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

        {loadDataError && <Alert severity='error'>{loadDataError}</Alert>}
      </Grid>
    </div>
  );
};

export default App;
