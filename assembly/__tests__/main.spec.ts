import { Magic8Ball } from '../index';
import { answersSet, answersVector, historyVector, MAXLEN } from '../model';

// use `logging.log()` to log to terminal
// use `log()` to log in testing blocks
let m8: Magic8Ball;
beforeEach(() => {
  m8 = new Magic8Ball();
})

describe('answerMyQuestion tests', () => {

  it('Throws AssertionError if string is empty', () => {
    expect(() => {
      m8.answerMyQuestion("");
    }).toThrow();
  });

  it('String of some length should return', () => {
    const answer = m8.answerMyQuestion("Will I be a NEARionnaire?");
    expect(answer.length > 0).toBe(true);
  });

});

describe('addNewAnswerToMagic8Ball tests', () => {

  it('Successfully adds new string', () => {
    m8.addNewAnswerToMagic8Ball('not with that attitude.');
    expect(answersVector.length).toBe(21);
  });

  it('Throws and AssertionError if string is too short', () => {
    expect(() => {
      m8.addNewAnswerToMagic8Ball('');
    }).toThrow();
    
  });

  it('Throws AssertionError if string is too long', () => {
     expect(() => {
      m8.addNewAnswerToMagic8Ball('new answer that is longer than maximum allowed characters which should be around 30')
    }).toThrow();

  });

  it('Throws AssertionError if list already contains string', () => {
    expect(() => {
      const formatted = m8.addNewAnswerToMagic8Ball('Outlook good.');
      log(formatted)
    }).toThrow();
    
  });

});

describe('saveMyQuestion tests', () => {

  it('saves new question and answer to storage', () => {
    const questionToSave = "Will this test pass?";
    m8.answerMyQuestion(questionToSave, true);
    expect(historyVector.last.q).toBe(questionToSave);
  });

  it('shows lists of previous questions', () => {
    const questionToSave = "Will this show up in history";
    m8.answerMyQuestion(questionToSave, true);
    const list = m8.getHistory();
    expect(list[list.length -1].q).toBe(questionToSave);
  });

});

describe('view answers tests', () => {

  it('retrieves list of magic 8 answers ', () => {
    const list = m8.getPossibleAnswers();
    expect(list.length).toBe(20);
  });
});
