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

  const answers: PersistentVector<string> = new PersistentVector<string>('av');
  // seed Vector
  _init();
  // ------------------------------------------------------------------
  // CHANGE methods
  // ------------------------------------------------------------------
  export function answerMyQuestion(question: string): string {
    logging.log("answerMyQuestion() was called");
    assert(question.length > 0, "Question can not be blank.");
    // TODO: implement RegEx when AS does :/
    // check for What, When, Where, Why at beginning.
    // const regexp: RegExp = /^what|when|where|why/i;
    // assert(regexp.test(question) == false, "Please ask Yes or No questions only.");
    const rng = new RNG<u8>(1, answers.length);
    const rollIdx = rng.next();
    logging.log(rollIdx);
    return answers[rollIdx];
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
    assert(question.length > 0, "Message can not be blank.");
    questions.pushFront(context.sender + " asks " + question);

    return true;
  }

  export function addNewAnswerToMagic8Ball(answerToAdd: string): void {
    logging.log(answerToAdd);
    // check length
    assert(answerToAdd.length > 0 && answerToAdd.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`);

    // TODO: check for special characters e.g. Ben's ...
    // should be new answer, but this cost $$$$ in gas
    const lastChar = answerToAdd.substr(-1) == '.' ? answerToAdd.substr(-1) : '.';
    const formattedAnswerToAdd = answerToAdd.substr(0, 1).toUpperCase() + answerToAdd.substr(1, answerToAdd.length - 1).toLowerCase() + lastChar;
    logging.log(formattedAnswerToAdd);
    assert(!_vectorHasContents(answers, formattedAnswerToAdd), "That answer already exists!");
    answers.push(formattedAnswerToAdd);
  }

  // ------------------------------------------------------------------
  // private methods
  // ------------------------------------------------------------------
  function _init(): void {
    // answers = new PersistentVector<string>('av');
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
  }
   
  function _vectorHasContents(
    vector: PersistentVector<string>,
    target: string
  ): bool {
    if (vector.length == 0) {
      return false;
    }
    for (let i = 0; i < vector.length; i++) {
      if (vector[i] == target) return true;
    }
    return false;
  }


