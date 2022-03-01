import React from 'react';
import PropTypes from 'prop-types';
import { Detector } from 'react-detect-offline';

import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ButtonWrapper from '@anu/components/ButtonWrapper';

const QuizSubmit = ({ onSubmit, isSubmitting, isQuiz, prevLesson, currentIndex, sections }) => {
  const theme = useTheme();
  const prevIsLesson = prevLesson && Boolean(prevLesson.sections);
  const noPrevLesson = !sections[currentIndex - 1];

  return (
    <Detector
      render={({ online }) => (
        <ButtonWrapper>
          {noPrevLesson && prevIsLesson && isSubmitting && (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<ChevronLeftIcon />}
              href={prevLesson.url}
            >
              {Drupal.t('Back', {}, { context: 'ANU LMS' })}
            </Button>
          )}

          <Button
            variant="contained"
            color={isQuiz ? 'primary' : 'default'}
            onClick={onSubmit}
            disabled={!online || isSubmitting}
            style={{ marginTop: theme.spacing(2) }}
          >
            {isSubmitting && (
              <CircularProgress size={20} style={{ marginRight: theme.spacing(2) }} />
            )}

            {isQuiz
              ? Drupal.t('Submit quiz', {}, { context: 'ANU LMS' })
              : Drupal.t('Submit answer', {}, { context: 'ANU LMS' })}
          </Button>

          {!online && (
            <Typography variant="subtitle1">
              {isQuiz
                ? Drupal.t('You cannot submit quizzes while offline.', {}, { context: 'ANU LMS' })
                : Drupal.t('You cannot submit answers while offline.', {}, { context: 'ANU LMS' })}
            </Typography>
          )}
        </ButtonWrapper>
      )}
    />
  );
};

QuizSubmit.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
  prevLesson: PropTypes.shape(),
  currentIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isQuiz: PropTypes.bool,
};

export default QuizSubmit;
