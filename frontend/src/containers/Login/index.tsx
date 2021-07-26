import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import { loginUser, registerUser } from './actions';
import { useHistory } from 'react-router-dom';
import './index.scss'

interface FormData {
  username: any;
  password: any;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  buttonStyle: {
    marginTop: '20px',
  },
}));

const LoginPage = () => {
  const { handleSubmit, register, reset } = useForm<FormData>();
  const [saveUser, setSaveUser] = useState(false);
  const [errorMessage, setErrorMesage] = useState('');

  const history = useHistory();

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUser, errorMessage]);

  const classes = useStyles();

  const onSubmit = handleSubmit((data: any) => {
    setErrorMesage('');
    if (saveUser) {
      registerUser(data)
        .then((res: any) => {
          history.push({
            pathname: '/weather',
            state: { username: res.data.username },
          });
        })
        .catch((err) => {
          setErrorMesage(err.response ? err.response.data.error : 'Error');
        });
    } else {
      loginUser(data)
        .then((res: any) => {
          history.push({
            pathname: '/weather',
            state: { username: res.data.username },
          });
        })
        .catch((err) => {
          setErrorMesage(err.response ? err.response.data.error : 'Error');
        });
    }
  });

  return (
    <Container className={classes.container} maxWidth='xs'>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('username', { required: true })}
                  fullWidth
                  label='Username'
                  name='username'
                  size='medium'
                  onChange={() => setErrorMesage('')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', { required: true })}
                  fullWidth
                  label='Password'
                  name='password'
                  size='medium'
                  type='password'
                  onChange={() => setErrorMesage('')}
                />
              </Grid>
            </Grid>
            {errorMessage && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p className='error-message'>{errorMessage}</p>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            {saveUser ? (
              <Grid container>
                <Grid item xs={12}>
                  <Button
                    className={classes.buttonStyle}
                    color='secondary'
                    fullWidth
                    type='submit'
                    variant='contained'
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.buttonStyle}
                    color='primary'
                    fullWidth
                    type='button'
                    variant='contained'
                    onClick={() => [setSaveUser(false)]}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <Button
                    className={classes.buttonStyle}
                    color='primary'
                    fullWidth
                    type='submit'
                    variant='contained'
                  >
                    Log in
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.buttonStyle}
                    color='secondary'
                    fullWidth
                    type='button'
                    variant='contained'
                    onClick={() => setSaveUser(true)}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
