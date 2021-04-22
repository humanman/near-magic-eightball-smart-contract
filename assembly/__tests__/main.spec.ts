import { Contract } from '../index';
import { logging, PersistentVector } from "near-sdk-as";
import { MAXLEN } from '../model';

describe('Questions tests', () => {

  it('Throws AssertionError is string is empty', () => {
    expect(() => {
      const mag8 = new Contract();
      mag8.answerMyQuestion("");
    }).toThrow();
  });

// TODO: Implement RegEx when AS does
  // it('Throws AssertionError is string contains who|what|when|where|why', () => {
  //   expect(() => {
  //     const mag8 = new Contract();
  //     mag8.answerMyQuestion("Why do birds suddenly appear every time you are NEAR?");
  //   }).toThrow();
  // });
})

describe('Answers tests', () => {

  it('String of some length should return', () => {
    const mag8 = new Contract()
    const answer = mag8.answerMyQuestion("Will I be a NEARionnaire?");
    expect(answer.length > 0).toBe(true);
  });

  it('Successfully adds new string', () => {
    const mag8 = new Contract();
    mag8.addNewAnswerToMagic8Ball('not with that attitude.');
    expect(mag8.answers.length).toBe(21);
    logging.log(mag8.answers);
  });


  it('Throws and AssertionError if string is too short', () => {
    
    expect(() => {
      const mag8 = new Contract();
      mag8.addNewAnswerToMagic8Ball('');
    }).toThrow();
    
  });

  it('Throws and AssertionError if string is too long', () => {

     expect(() => {
      const mag8 = new Contract();
      mag8.addNewAnswerToMagic8Ball('new answer that is longer than maximum allowed characters which should be around 30')
    }).toThrow();

  });

  it('Throws and AssertionError if list already contains string', () => {
    
    expect(() => {
      const mag8 = new Contract();
      mag8.addNewAnswerToMagic8Ball('Outlook good.');
      logging.log(mag8.answers);
    }).toThrow();
    
  });

});
