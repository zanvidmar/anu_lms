import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
}));

const ButtonWrapper = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.inner}>{children}</Box>;
};

ButtonWrapper.propTypes = {
  children: PropTypes.node,
};

export default ButtonWrapper;
