import { context, logging, storage, RNG, PersistentVector, PersistentSet } from 'near-sdk-as';
import { init, MAXLEN,answersSet, answersVector, sessionStorage, historySet, Session} from './model';

// init helper to avoid duplicates
function checkForInit(): void {
  if (answersVector.length == 0) init()
}

// must be commented out if running tests or they will fail
// checkForInit();

// -- change methods:

/**
 * answerMyQuestion is a
 * - "change" function (although it does NOT alter state, it DOES read from context)
 * - that takes string parameter
 * - and returns a random answer from storage
 *
 * - it has the side effect of appending to the log
 */
export function answerMyQuestion(question: string): string {

  log("answerMyQuestion() was called");
  assert(question.length > 0, "Question can not be blank.");

  const rng = new RNG<u8>(1, answersVector.length);
  const rollIdx = rng.next();
  log(answersVector.last);
  const obj = new Session(question , answersVector[rollIdx]);

  sessionStorage.push(obj);
  const answ = answersVector[rollIdx];
  return answ;
}

/**
  * saveMyQuestion is a
  * - "change" function (ie. alters state)
  * - that takes no parameters
  * - saves the sender account name and message to contract state
  * - and returns nothing
  *
  * - it has the side effect of appending to the log
  */
export function saveMyQuestion(question: string): boolean {
  logging.log("saveMyQuestion() was called");
  assert(question.length > 0, "Message can not be blank.");
  historySet.add(sessionStorage.pop());
  return true;
}

export function addNewAnswerToMagic8Ball(answerToAdd: string): void {
  logging.log(answerToAdd);
  // check length
  assert(answerToAdd.length > 0 && answerToAdd.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`);

  const lastChar = answerToAdd.substr(-1) === '.' ? answerToAdd.substr(-1) : '.';
  const formattedForSet = _removeCharfromString(answerToAdd)
  log(formattedForSet)
  const formattedAnswerToAdd = answerToAdd.substr(0, 1).toUpperCase() + answerToAdd.substr(1, answerToAdd.length - 2).toLowerCase() + lastChar;
  log(answersSet.values().length);
  assert(!answersSet.has(formattedForSet), "That answer already exists!");
  answersSet.add(formattedForSet);
  answersVector.push(formattedAnswerToAdd);
}



// -- private methods
 
// workaround for RegEx until it's native in AS
function _removeCharfromString(str: string): string {
  return str.toLowerCase().split('.').join('').split("'").join('').split('"').join('').split(',').join('').split('-').join('').split(' ').join('');
}
