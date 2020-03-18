import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, Theme, makeStyles, createStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/Cloud';
import { CALL } from '../actions/data';
import { mapStateToPropsType, mapDispatchToPropsType } from '../types';
import { dataState } from '../reducers/data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative'
    },
    progress: {
      color: '#055aaf',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  })
);

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#0989f1',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#67b7f8'
    }
  }
}))(Button);

export const ConfiguredButton = ({ loading, ...props }) => (
  <StyledButton
    endIcon={<CloudUploadIcon />}
    variant="contained"
    style={{
      backgroundColor: loading && '#d6d6d6'
    }}
    {...props}
  >
    Call API
  </StyledButton>
);

export const LoadingFeedback = props => <CircularProgress {...props} />;

interface thisButtonProps {
  loading: boolean;
  data: dataState;
  CALL(): void;
}

export const thisButton = (props: thisButtonProps) => {
  const classes = useStyles();
  const { CALL, loading, data } = props;
  return (
    <div style={{ margin: 25 }}>
      <span className={classes.wrapper}>
        <ConfiguredButton
          loading={loading}
          disabled={
            data.response &&
            data.response.status &&
            data.response.status === 200
          }
          onClick={() => CALL()}
        >
          Call API
        </ConfiguredButton>
        {loading &&
          !(
            data.response &&
            data.response.status &&
            data.response.status === 200
          ) && <LoadingFeedback size={24} className={classes.progress} />}
      </span>
    </div>
  );
};

const mapStateToProps = (state: mapStateToPropsType) => ({
  loading: state.data.loading,
  data: state.data
});

const mapDispatchToProps: mapDispatchToPropsType = {
  CALL
};

const connectedElement = connect(
  mapStateToProps,
  mapDispatchToProps
)(thisButton);

export default connectedElement;
