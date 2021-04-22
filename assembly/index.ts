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
    assert(question.length > 0, "Question can not be blank.");
    // TODO: implement RegEx when AS does :/
    // check for What, When, Where, Why at beginning.
    // const regexp: RegExp = /^what|when|where|why/i;
    // assert(regexp.test(question) == false, "Please ask Yes or No questions only.");
    const rng = new RNG<u8>(1, this.answers.length);
    const rollIdx = rng.next();
    logging.log(rollIdx);
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

  addNewAnswerToMagic8Ball(answerToAdd: string): void {
    // check length
    assert(answerToAdd.length > 0 && answerToAdd.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`)

    // TODO: check for special characters e.g. Ben's ...
    // should be new answer
    const formattedAnswerToAdd = answerToAdd.substring(0, 1).toUpperCase() + answerToAdd.substring(1).toLowerCase();
    logging.log(formattedAnswerToAdd);
    assert(this._vectorHasContents(this.answers, formattedAnswerToAdd) == false, "That answer already exists!")
    this.answers.push(formattedAnswerToAdd);
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

