import React, { Component } from 'react';
import { LanguageContext } from './contexts/LanguageContext';

import { Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/FormStyles';

const words = {
  english: {
    email: 'Email',
    signIn: 'Sign In',
    password: 'Password',
    remember: 'Remember Me'
  },
  french: {
    email: 'Adresse Electronique',
    signIn: 'Se Connecter',
    password: 'Mot de Passe',
    remember: 'Souviens-yoi De Moi'
  },
  spanish: {
    email: 'Correo Electronico',
    signIn: 'Registrarse',
    password: 'Conterasena',
    remember: 'Recuerdame'
  }
};

class Form extends Component {
  static contextType = LanguageContext;
  render() {
    const { classes } = this.props;
    const { language, changeLanguage } = this.context;
    const { email, signIn, password, remember } = words[language];
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon></LockIcon>
          </Avatar>
          <Typography variant="h5">{signIn}</Typography>
          <Select value={language} onChange={changeLanguage}>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="french">French</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
          </Select>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">{email}</InputLabel>
              <Input id="email" name="email" autoFocus></Input>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">{password}</InputLabel>
              <Input id="password" name="password" autoFocus></Input>
            </FormControl>
            <FormControlLabel
              control={<Checkbox color="primary"></Checkbox>}
              label={remember}
            ></FormControlLabel>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              {signIn}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Form);
