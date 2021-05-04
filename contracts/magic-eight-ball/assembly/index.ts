import { context, logging, storage, RNG, PersistentVector, PersistentSet } from 'near-sdk-as';
import { init, MAXLEN, answersSet, answersVector, sessionStorage, historyVector, Session, answers } from './model';


if (!storage.get("initialized")) {
  init()
}

export function init(): void {
  answers.split("\n").forEach(answer => {
    answersVector.push(answer)
    answersSet.add(_removeCharfromString(answer))
  })

  storage.set('initialized', true)
}


// init helper to avoid duplicates
function checkForInit(): void {
  if (answersVector.length == 0) init()
}

// must be commented out if running tests or they will fail
checkForInit();


// -- view methods:

// get all the possible answers magic 8 ball currently has
export function getPossibleAnswers(max: u32 = 10): Array<string> {
  return answersVector.get_last(10);
}

//  get all the question/answers previous users have saved
export function getHistory(): Array<Session> {
  return historyVector.get_last(10);
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
export function answerMyQuestion(question: string, save: bool = false): string {
  logging.log('answerMyQuestion() called');
  assert(question.length > 0, "Question can not be blank.");
  const rng = new RNG<u8>(1, answersVector.length);
  const rollIdx = rng.next();
  const obj = new Session(question, answersVector[rollIdx]);
  // const obj = objInit.init();
  // sessionStorage.push(obj);
  if (save) {
    historyVector.push(obj);
  }

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
// export function saveMyQuestion(): boolean {
//   logging.log("saveMyQuestion() was called");
//   const lastSession = sessionStorage.pop();
//   logging.log(lastSession.a);
//   historyVector.push(lastSession);
//   return true;
// }

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
