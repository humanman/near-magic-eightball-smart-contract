import {
  // init,
  m8,
  Contract,
  // answerMyQuestion,
  // saveMyQuestion,
  // addNewAnswerToMagic8Ball
} from '../index';
import { logging, PersistentVector } from "near-sdk-as";
import { MAXLEN } from '../model';

// const answers = init()

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
    log(mag8.answers);
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
      log(mag8.answers);
    }).toThrow();
    
  });

  // let answersList = new PersistentVector<answers>("av");
  // it('answers has been seeded', () => {

  //   // expect(answer).toBeNaN();
  //   expect(answersList.length).toBe(20);
  // });
    // const m8 = new Contract();
});

// const theMeaningOfLife = 42;

// describe("a test group", () => {
//   test("the meaning of life", () => {
//     expect(theMeaningOfLife).toBe(42);
//   });
// });

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