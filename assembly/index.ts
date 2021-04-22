import { context, logging, storage, RNG, PersistentVector } from 'near-sdk-as';
import { MAXLEN, questions } from './model';

/**
 * answerMyQuestion is a
 * - "change" function (although it does NOT alter state, it DOES read from context)
 * - that takes string parameter
 * - and returns a random answer from storage
 *
 * - it has the side effect of appending to the log
 */

@nearBindgen
export class Contract {
  constructor() {
    this._init()
  }
  
  answers: PersistentVector<string> = new PersistentVector<string>('av');
  // ------------------------------------------------------------------
  // CHANGE methods
  // ------------------------------------------------------------------
  answerMyQuestion(question: string): string {
    logging.log("answerMyQuestion() was called");
    // assert(question.length > 0, "Question can not be blank.");
    // check for What, When, Where, Why at beginning.
    // instruct to ask yes/no question
    // assert(/^what|when|where|why/.test.question == "false");
    // // let answers = new Array<string>(20);
    const rng = new RNG<u8>(1, 20);
    const rollIdx = rng.next();
    // const idx = _getAnswerIdx();
    logging.log(rollIdx)
    return this.answers[rollIdx];
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
  saveMyQuestion(question: string): boolean {
    logging.log("saveMyQuestion() was called");

    // assert(message.length > 0, "Message can not be blank.");

    questions.pushFront(context.sender + " asks " + question);

    return true;
  }

  // TODO: make an owner-only call
  addNewAnswerToMagic8Ball(answer: string): void {
    // check length
    assert(answer.length > 0 && answer.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`)

    // TODO: check for special characters e.g. Ben's ...
    // should be new answer
    const formattedAnswer = answer.substring(0, 1).toUpperCase() + answer.substring(1).toLowerCase();
    log(formattedAnswer);
    assert(this._vectorHasContents(this.answers, formattedAnswer) == false, "That answer already exists!")
    this.answers.push(answer);
  }

  // ------------------------------------------------------------------
  // private methods
  // ------------------------------------------------------------------
  private _init(): void {
    // this.answers = new PersistentVector<string>('av');
    this.answers.push('As I see it, yes');
    this.answers.push('Ask again later.');
    this.answers.push('Better not tell you now.');
    this.answers.push('Cannot predict now.');
    this.answers.push('Concentrate and ask again.');
    this.answers.push('Don\'t count on it.');
    this.answers.push('It is certain.');
    this.answers.push('It is decidedly so.');
    this.answers.push('Most likely.');
    this.answers.push('My reply is no.');
    this.answers.push('My sources say no.');
    this.answers.push('Outlook not so good.');
    this.answers.push('Outlook good.');
    this.answers.push('Reply hazy, try again.');
    this.answers.push('Signs point to yes.');
    this.answers.push('Very doubtful.');
    this.answers.push('Without a doubt.');
    this.answers.push('Yes.');
    this.answers.push('Yes - definitely.');
    this.answers.push('Yes may rely on it.');
  }
   
  private _vectorHasContents(
    vector: PersistentVector<string>,
    target: string
  ): bool {
    if (vector.length == 0) {
      return false;
    }
    for (let i = 0; i < vector.length; i++) {
      if (vector[i] == target) return true
    }
    return false;
  }
}


export const m8 = new Contract();

// export function answerMyQuestion(question: string): string {
//   logging.log("answerMyQuestion() was called");
//   // assert(question.length > 0, "Question can not be blank.");
//   // check for What, When, Where, Why at beginning.
//   // instruct to ask yes/no question
//   // assert(/^what|when|where|why/.test.question == "false");
//   // // let answers = new Array<string>(20);
//   const rng = new RNG<u8>(1, 20);
//   const rollIdx = rng.next();
//   // const idx = _getAnswerIdx();
//   logging.log(rollIdx)
//   return answers[rollIdx];

// }

// export function getValue(): string | null {
//   return storage.getString("state");
// }

// export function setValue(value: string): void {
//   logging.log("Setting value to " + value);
//   storage.setString("state", value);
// }





// PRIVATE

// simply - er - I mean magically calls random idx of answers set
// function _retrieveAnswer(): string {
//   const idx = _getAnswerIdx();
//   return answers[idx]
// }

// function _getAnswerIdx(): i32 {
//   const idx = _random();
//   return idx;
// }

// Using RNG module from near-sdk to handle Math.random
// function _random(): i32 {
//   const rng = new RNG<i32>(0, 20);
//   const rollIdx = rng.next();
//   // assert(rollIdx % 1 == 0 && rollIdx >= 0 && rollIdx < 20, "Random number out of range of answers set");
//   assert(rollIdx % 1 == 0, "Random number must be integer");
//   logging.log(rollIdx);
//   return rollIdx;
// }
function _vectorHasContents(
  vector: PersistentVector<string>,
  expectedContents: Array<string>
): bool {
  if (vector.length != expectedContents.length) {
    return false;
  }
  for (let i = 0; i < expectedContents.length; i++) {
    if (expectedContents[i] != vector[i]) {
      // return false;
      logging.log("wrong" + expectedContents[i] + "," + vector[i]);
    }
  }
  return true;
}