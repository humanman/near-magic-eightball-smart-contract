import {answerMyQuestion, addNewAnswerToMagic8Ball, getHistory, getPossibleAnswers, saveMyQuestion} from '../index';
import {init, answersSet, answersVector, sessionStorage, historyVector, MAXLEN} from '../model';
import { logging, PersistentVector, PersistentSet } from "near-sdk-as";

// use `logging.log()` to log to terminal
// use `log()` to log in testing blocks

describe('answerMyQuestion tests', () => {

  it('Throws AssertionError if string is empty', () => {
    expect(() => {
      answerMyQuestion("");
    }).toThrow();
  });

  it('String of some length should return', () => {
    init();
    const answer = answerMyQuestion("Will I be a NEARionnaire?");
    expect(answer.length > 0).toBe(true);
  });

})

describe('addNewAnswerToMagic8Ball tests', () => {

  it('Successfully adds new string', () => {
    init();
    addNewAnswerToMagic8Ball('not with that attitude.');
    expect(answersVector.length).toBe(21);
  });

  it('Throws and AssertionError if string is too short', () => {
    
    expect(() => {
      addNewAnswerToMagic8Ball('');
    }).toThrow();
    
  });

  it('Throws AssertionError if string is too long', () => {

     expect(() => {
      addNewAnswerToMagic8Ball('new answer that is longer than maximum allowed characters which should be around 30')
    }).toThrow();

  });

  it('Throws AssertionError if list already contains string', () => {
    init();
    expect(() => {
      addNewAnswerToMagic8Ball('Outlook good.');
    }).toThrow();
    
  });

});

describe('saveMyQuestion tests', () => {

  it('saves new question and answer to storage', () => {
    init();
    const questionToSave = "Will this test pass?";
    answerMyQuestion(questionToSave);
    saveMyQuestion();
    expect(historyVector.last.q).toBe(questionToSave);
  });

  it('shows lists of previous questions', () => {
    init();
    const questionToSave = "Will this show up in history";
    answerMyQuestion(questionToSave);
    saveMyQuestion();
    const list = getHistory();
    expect(list[list.length -1].q).toBe(questionToSave);
  });

});

describe('view answers tests', () => {

  it('retrieves list of magic 8 answers ', () => {
    init();
    const list = getPossibleAnswers();
    expect(list.length).toBe(20);
  });
});
