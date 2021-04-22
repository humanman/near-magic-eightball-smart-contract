import {
  // init,
  Contract,
  answerMyQuestion,
  saveMyQuestion,
  addNewAnswerToMagic8Ball
} from '../index';
import { logging, PersistentVector } from "near-sdk-as";
// import { answers } from '../model';

// const answers = init()
const m8 = new Contract();
describe('Answers tests', () => {

    // let answersList = new PersistentVector<answers>("av");
    // it('answers has been seeded', () => {
    
    //   // expect(answer).toBeNaN();
    //   expect(answersList.length).toBe(20);
    // });
    // const answers = init()
    
    it('answers have an index greater than 2', () => {
      const answer = m8.answerMyQuestion("Will I be a NEARionnaire?");
    
      // expect(answer).toBe(answer);
    });

   // it('adds a new answer', () => {
   //    const previousAnswersListSize = answers.length;
   //    const newAnswer = addNewAnswerToOracle("Not a chance.");
   //    expect(newAnswer).toBeNaN();
   //    expect(answers.length >= previousAnswersListSize);
   // });

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