import { context, logging, storage, RNG, PersistentVector, PersistentSet } from 'near-sdk-as';
import { init as initt, MAXLEN, answersSet, answersVector, sessionStorage, historyVector, Session } from './model';


@nearBindgen
export class Contract {
  constructor() {
    initt()
  }

  getPossibleAnswers(): Array<string> {
    const len = answersVector.length;
    const resultList: Array<string> = [];
    for (let i = 0; i < len; i++) {
      resultList[i] = answersVector[i];
    }
    return resultList;
  }

  getHistory(): Array<Session> {
    return []
  }

  answerMyQuestion(question: string): string {
    return ''
  }

  saveMyQuestion(): boolean {
    return false
  }

  addNewAnswerToMagic8Ball(answerToAdd: string): string {
    return ''
  }

}

// -- view methods:

// get all the possible answers magic 8 ball currently has
export function getPossibleAnswers(): Array<string> {
  const len = answersVector.length;
  const resultList: Array<string> = [];
  for (let i = 0; i < len; i++) {
    resultList[i] = answersVector[i];
  }
  return resultList;
}

//  get all the question/answers previous users have saved
export function getHistory(): Array<Session> {
  const len = historyVector.length;
  const resultList: Array<Session> = [];
  for (let i = 0; i < len; i++) {
    resultList[i] = historyVector[i];
  }
  return resultList;
}


// -- change methods:

/**
 * answerMyQuestion is a
 * - "change" function (although it does NOT alter state, it DOES read from context)
 * - that takes string parameter
 * - and returns a random answer from storage
 *
 * - it has the side effect of appending to the log
 */
//  TODO: add bool flag to save question
export function answerMyQuestion(question: string): string {
  logging.log('answerMyQuestion() called');
  assert(question.length > 0, "Question can not be blank.");
  const rng = new RNG<u8>(1, answersVector.length);
  const rollIdx = rng.next();
  const obj = new Session(question, answersVector[rollIdx]);
  // const obj = objInit.init();
  sessionStorage.push(obj);
  logging.log(`class ${sessionStorage.last.q}`);
  const answ = answersVector[rollIdx];
  return answ;
}

/**
  * saveMyQuestion is a
  * - "change" function (ie. alters state)
  * - that takes no parameters
  * - saves the last question and answer from storage
  * - and returns true
  *
  */
export function saveMyQuestion(): boolean {
  logging.log("saveMyQuestion() was called");
  const lastSession = sessionStorage.pop();
  logging.log(lastSession.a);
  historyVector.push(lastSession);
  return true;
}

/**
  * addNewAnswerToMagic8Ball is a
  * - "change" function (ie. alters state)
  * - that takes string parameter ( new magic 8 ball answer )
  * - adds the new answer (if unique) to the answersSet and answersVector (formatted differently for each)
  * - and returns nothing
  */
export function addNewAnswerToMagic8Ball(answerToAdd: string): string {
  logging.log(answerToAdd);
  // check length
  assert(answerToAdd.length > 0 && answerToAdd.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`);

  const lastChar = answerToAdd.substr(-1) === '.' ? answerToAdd.substr(-1) : '.';
  const formattedForSet = _removeCharfromString(answerToAdd)
  const formattedAnswerToAdd = answerToAdd.substr(0, 1).toUpperCase() + answerToAdd.substr(1, answerToAdd.length - 1).toLowerCase() + lastChar;
  assert(!answersSet.has(formattedForSet), "That answer already exists!");
  answersSet.add(formattedForSet);
  answersVector.push(formattedAnswerToAdd);
  return answersVector.last;
}



// -- private methods

// workaround for RegEx until it's native in AS
function _removeCharfromString(str: string): string {
  return str.toLowerCase().split('.').join('').split("'").join('').split('"').join('').split(',').join('').split('-').join('').split(' ').join('');
}
