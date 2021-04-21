import { context, logging, storage, RNG} from 'near-sdk-as';
import { questions, answers } from './model';


/**
 * answerMyQuestion is a
 * - "change" function (although it does NOT alter state, it DOES read from context)
 * - that takes string parameter
 * - and returns a random answer from storage
 *
 * - it has the side effect of appending to the log
 */
export function answerMyQuestion(value: string): string {
  logging.log("answerMyQuestion() was called");
  // check for What, When, Where, Why at beginning. 
  // instruct to ask yes/no question
  return answerQuestion();
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

  // assert(message.length > 0, "Message can not be blank.");

  questions.pushFront(context.sender + " asks " + question);

  return true;
}

export function addNewAnswerToOracle(answer: string): void {
  answers.push(answer);
}

/**
 * getAllQuestions is a
 * - "change" function (ie. alters state)
 * - that takes no parameters
 * - reads and removes all recorded questions from contract state (this can become expensive!)
 * - and returns an array of questions if any are found, otherwise empty array
 *
 * - it has the side effect of appending to the log
 */
export function getAllQuestions(): Array<string> {
  logging.log("getAllQuestions() was called");

  let results = new Array<string>();

  while (!questions.isEmpty) {
    results.push(questions.popBack());
  }

  return results;
}


// PRIVATE 

function answerQuestion(): string {
  const idx = getAnswerIdx();
  return answers[idx]
}

function getAnswerIdx(): i32 {
  const idx = random();
  return idx;
}

// Generate a random number using the Linear Congruential Generator algorithm,
// using the block number as the seed of randomness.
// The magic numbers `a`, `c` and `m` where taken from the Wikipedia article.
function random(): i32 { 
 const rng = new RNG<i32>(1, answers.length);
    const rollIdx = rng.next();
    return rollIdx;
}