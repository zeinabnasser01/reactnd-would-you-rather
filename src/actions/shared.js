import { getInitialData } from '../utils/api';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { receiveUsers, saveUserQuestion, saveUserAnswer } from './users';
import {
  receiveQuestions,
  saveQuestion,
  saveQuestionAnswer,
} from './questions';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(saveQuestion(question));
      dispatch(saveUserQuestion(authedUser, question.id));
    });
  };
}

export function handleAddAnswer({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(saveQuestionAnswer(authedUser, qid, answer));
      dispatch(saveUserAnswer(authedUser, qid, answer));
    });
  };
}
