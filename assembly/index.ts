import { logging, RNG} from 'near-sdk-as';
import { seedPersistentLayers, MAXLEN, answersSet, answersVector, historyVector, Session } from './model';


@nearBindgen
export class Magic8Ball {

  constructor() {
    seedPersistentLayers();
  }


  //// -- VIEW METHODS

  // limit 10: throws memory out of bounds trap if too long
  getSampleAnswers(): Array<string> {
    const len = answersVector.length;
    const resultList: Array<string> = [];
    for (let i = 0; i < 10; i++) {
      resultList[i] = answersVector[i];
    }
    return resultList;
  }

  // limit 10: throws memory out of bounds trap if too long
  getHistory(): Array<Session> {
    const resultList: Array<Session> = [];
    for (let i = 0; i < 10; i++) {
      resultList[i] = historyVector[i];
    }
    return resultList;
  }


  //// -- CHANGE METHODS

  answerMyQuestion(question: string, save: bool = false): string {
    logging.log('answerMyQuestion() called');
    assert(question.length > 0, "Question can not be blank.");
    const rng = new RNG<u8>(1, answersVector.length);
    const rollIdx = rng.next();
    const answer = answersVector[rollIdx];
    if (save === true) {
      const obj = new Session(question, answer);
      historyVector.push(obj);
    }
    
    return answer;
  }

  addNewAnswerToMagic8Ball(answerToAdd: string): string {
    logging.log(answerToAdd);
    // check length
    assert(answerToAdd.length > 0 && answerToAdd.length <= MAXLEN, `Submission must be more than 0 and fewer than ${MAXLEN.toString()} characters long.`);

    const lastChar = answerToAdd.substr(-1) === '.' ? answerToAdd.substr(-1) : '.';
    // remove special characters for Set
    const formattedForSet = this._removeCharfromString(answerToAdd)
    // format to be capitalized with a period at end for Vector
    const formattedForVector = answerToAdd.substr(0, 1).toUpperCase() + answerToAdd.substr(1, answerToAdd.length - 1).toLowerCase() + lastChar;

    assert(!answersSet.has(formattedForSet), "That answer already exists!");
    answersSet.add(formattedForSet);
    answersVector.push(formattedForVector);

    return answersVector.last;
  }


  //// -- PRIVATE METHODS

  // workaround for RegEx until it's native in AS
  private _removeCharfromString(str: string): string {
    const charArr = ['.', '\'', '"', ',', '-', ' '];
    let idx = 0;
    let outputStr = str.toLowerCase();
    while(idx < charArr.length) {
      outputStr = outputStr.split(charArr[idx]).join('');
      idx++
    }  
    return outputStr;
  }

}
