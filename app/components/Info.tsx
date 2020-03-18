import React from 'react';
import { connect } from 'react-redux';
import { mapStateToPropsType } from '../types';
import { makeStyles, Theme, Avatar } from '@material-ui/core';
import { axiosGet } from '../sagas';
import { User } from '../reducers/data';

const profile = require('../images.png');

interface InfoTypes extends mapStateToPropsType {
  // In case any additional props
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center'
  },
  item: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    paddingTop: 15,
    height: 340,
    width: 270,
    display: 'inline-block',
    textAlign: 'center',
    color: '#696969',
    background: `#fff`,
    boxShadow: theme.shadows[5],
    borderRadius: 5
  },
  error: {
    color: '#fff',
    fontSize: theme.spacing(7),
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: theme.spacing(8)
  },
  profilePict: {
    height: 50,
    width: 50,
    marginBottom: theme.spacing(1),
    display: 'inline-block',
    boxShadow: theme.shadows[3]
  }
}));

export const ErrorMessage = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export interface ItemProps {
  user: User;
  classes: { item: any; profilePict: any };
}

export const Item = ({ user, classes: { item, profilePict } }: ItemProps) => {
  return (
    <React.Fragment>
      <span key={user.id} className={item}>
        <div>
          <Avatar src={profile.default} className={profilePict} />
        </div>
        {user.name}
      </span>
    </React.Fragment>
  );
};

export const Info = ({ data: { error, response } }: InfoTypes) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {error ? (
        <ErrorMessage className={classes.error}>{error.message}</ErrorMessage>
      ) : (
        response &&
        response.data.map((user: User) => (
          <Item
            key={user.id}
            user={user}
            classes={{ item: classes.item, profilePict: classes.profilePict }}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state: mapStateToPropsType) => state;

export default connect(mapStateToProps, null)(Info);
