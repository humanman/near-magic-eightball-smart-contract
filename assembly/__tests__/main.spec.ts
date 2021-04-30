import {answerMyQuestion, addNewAnswerToMagic8Ball} from '../index';
import {init, answersSet, answersVector, sessionStorage, historySet, MAXLEN} from '../model';
import { logging, PersistentVector, PersistentSet } from "near-sdk-as";

describe('answerMyQuestion tests', () => {

  it('Throws AssertionError if string is empty', () => {
    expect(() => {
      answerMyQuestion("");
    }).toThrow();
  });

  it('String of some length should return', () => {
    init();
    const answer = answerMyQuestion("Will I be a NEARionnaire?");
    log(answer);
    expect(answer.length > 0).toBe(true);
  });

})

describe('addNewAnswerToMagic8Ball tests', () => {

  it('Successfully adds new string', () => {
    init();
    addNewAnswerToMagic8Ball('not with that attitude.');
    expect(answersVector.length).toBe(21);
    log(answersVector.last);
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
