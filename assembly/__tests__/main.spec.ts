import {
  answerMyQuestion,
  saveMyQuestion,
  addNewAnswerToOracle
} from '../index';
import { storage, PersistentDeque, VMContext, VM } from "near-sdk-as";
import { answers } from '../model';


// describe('Answers tests', () => {

//    it('answers a question', () => {
//       const answer = answerMyQuestion("Will I be a NEARionnaire?");
//       expect(answer).toBeNaN();
//       expect(answers.indexof(answer)).toBeGreaterThan(-1);
//    });

//    // it('adds a new answer', () => {
//    //    const previousAnswersListSize = answers.length;
//    //    const newAnswer = addNewAnswerToOracle("Not a chance.");
//    //    expect(newAnswer).toBeNaN();
//    //    expect(answers.length >= previousAnswersListSize);
//    // });

// });

const theMeaningOfLife = 42;

describe("a test group", () => {
  test("the meaning of life", () => {
    expect(theMeaningOfLife).toBe(42);
  });
});

