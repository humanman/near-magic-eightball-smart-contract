import { context, logging, storage, RNG, PersistentVector } from 'near-sdk-as';
import { MAXLEN , questions} from './model';

/**
 * answerMyQuestion is a
 * - "change" function (although it does NOT alter state, it DOES read from context)
 * - that takes string parameter
 * - and returns a random answer from storage
 *
 * - it has the side effect of appending to the log
 */
export function answerMyQuestion(question: string): string {
  logging.log("answerMyQuestion() was called");
  // assert(question.length > 0, "Question can not be blank.");
  // check for What, When, Where, Why at beginning. 
  // instruct to ask yes/no question
  // assert(/^what|when|where|why/.test.question == "false");
  let answers = new PersistentVector<string>("av");
  // // let answers = new Array<string>(20);

  answers.push('As I see it, yes');
  answers.push('Ask again later.');
  answers.push('Better not tell you now.');
  answers.push('Cannot predict now.');
  answers.push('Concentrate and ask again.');
  answers.push('Don\'t count on it.');
  answers.push('It is certain.');
  answers.push('It is decidedly so.');
  answers.push('Most likely.');
  answers.push('My reply is no.');
  answers.push('My sources say no.');
  answers.push('Outlook not so good.');
  answers.push('Outlook good.');
  answers.push('Reply hazy, try again.');
  answers.push('Signs point to yes.');
  answers.push('Very doubtful.');
  answers.push('Without a doubt.');
  answers.push('Yes.');
  answers.push('Yes - definitely.');
  answers.push('Yes may rely on it.');

  const rng = new RNG<i32>(1, 20);
  const rollIdx = rng.next();
  logging.log(rollIdx);
  // const idx = _getAnswerIdx();
  return answers[rollIdx];

}

export function getValue(): string | null {
  return storage.getString("state");
}

export function setValue(value: string): void {
  logging.log("Setting value to " + value);
  storage.setString("state", value);
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
//  TODO: ideally this saves a record of the transaction (question / answer), but that may already be on the chain rendering this method redundant
export function saveMyQuestion(question: string): boolean {
  logging.log("saveMyQuestion() was called");

  // assert(message.length > 0, "Message can not be blank.");

  questions.pushFront(context.sender + " asks " + question);

  return true;
}

// TODO: make an owner-only call
export function addNewAnswerToOracle(answer: string): void {
  // check length
  // assert(answer.length > 0 && answer.length <= MAXLEN, "Submission must be more than 0 and fewer than " + MAXLEN + " characters long.")

  // TODO: check for special characters e.g. Ben's ...
  // should be new answer
  const formattedAnswer = answer.substring(0, 1).toUpperCase() + answer.substring(1).toLowerCase();
  // assert(answers.indexof(formattedAnswer) == -1, "That answer already exists!")
  // answers.push(answer);
}


// PRIVATE 

// simply - er - I mean magically calls random idx of answers set
function _retrieveAnswer(): string {
  const idx = _getAnswerIdx();
  return answers[idx]
}

function _getAnswerIdx(): i32 {
  const idx = _random();
  return idx;
}

// Using RNG module from near-sdk to handle Math.random
function _random(): i32 {
  const rng = new RNG<i32>(0, 20);
  const rollIdx = rng.next();
  // assert(rollIdx % 1 == 0 && rollIdx >= 0 && rollIdx < 20, "Random number out of range of answers set");
  assert(rollIdx % 1 == 0, "Random number must be integer");
  logging.log(rollIdx);
  return rollIdx;
}