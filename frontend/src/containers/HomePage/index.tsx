import { Button, Chip, Grid, LinearProgress, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getCities, postCities } from './actions';
import './index.scss';
import SelectionCard from '../SelectionCard';

const App = () => {
  const [selected, setSelected] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadDataError, setLoadDataError] = useState(false);
  const [clicked, setClicked] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const showValues = process.env.REACT_APP_SHOW_VALUES || '4';

  useEffect(() => {}, [selected, results, isLoading, loadDataError, clicked]);

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

  const handlePost = (value: number) => {
    setLoadDataError(false);
    setIsLoading(true);
    setShowMore(selected.length > value*parseInt(showValues) + parseInt(showValues))
    postCities(selected.slice(value === 0 ? 0 : value*parseInt(showValues), value*parseInt(showValues) + parseInt(showValues)))
      .then((res:any) => {
        setResults(value === 0 ? res.data : [...results].concat(res.data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setLoadDataError(true);
      });
  };

  return (
    <div>
      <div className='select'>
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
      </div>
      {selected && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
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
      >
        <Button
          variant='contained'
          color='primary'
          disabled={!selected.length || isLoading}
          onClick={() => {
            setClicked(0)
            handlePost(0)
          }}
        >
          Check Temperature
        </Button>
      </Grid>

      <div className='select'></div>
      {isLoading && (
        <Grid container>
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )}

      <Grid
        container
        spacing={1}
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
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

        {showMore  && (
          <Button
            variant='contained'
            color='primary'
            disabled={!selected.length || isLoading}
            onClick={() => {
              setClicked(clicked+1)
              handlePost(clicked+1);
            }}
          >
            SHOW MORE...
          </Button>
        )}
      </Grid>
    </div>
  );
};

export default App;
