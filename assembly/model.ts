import { PersistentSet, PersistentVector } from 'near-sdk-as';

export const MAXLEN = 30;

/** 
 * Exporting a classes for managing storage of our 8-ball answers, and submissions.
 */

@nearBindgen
export class Session {
  q: string;
  a: string;
  constructor(quest: string, answ: string) {
    this.q = quest;
    this.a = answ;
  }
}
// // seed Vector
// @nearBindgen
// export class DataStore {
//   answersVector: PersistentVector<string>;
//   answersSet: PersistentSet<string>;
//   sessionStorage: Array<Session> = [];
//   historySet: PersistentVector<Session>  = new PersistentVector<Session>('hs');

//   constructor(answerSet: PersistentSet<string>, answerVector: PersistentVector<string>) {
//     this.answersSet    = answerSet;
//     this.answersVector = answerVector;
//   }


// }



/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.

 */    
export const answersVector: PersistentVector<string> = new PersistentVector<string>('av');
export const answersSet: PersistentSet<string> = new PersistentSet<string>('as');

export const sessionStorage: Array<Session> = [];
export const historySet: PersistentVector<Session>  = new PersistentVector<Session>('hs');

export function init(): void {
  answersVector.push('As I see it, yes.');
  answersVector.push('Ask again later.');
  answersVector.push('Better not tell you now.');
  answersVector.push('Cannot predict now.');
  answersVector.push('Concentrate and ask again.');
  answersVector.push('Don\'t count on it.');
  answersVector.push('It is certain.');
  answersVector.push('It is decidedly so.');
  answersVector.push('Most likely.');
  answersVector.push('My reply is no.');
  answersVector.push('My sources say no.');
  answersVector.push('Outlook not so good.');
  answersVector.push('Outlook good.');
  answersVector.push('Reply hazy, try again.');
  answersVector.push('Signs point to yes.');
  answersVector.push('Very doubtful.');
  answersVector.push('Without a doubt.');
  answersVector.push('Yes.');
  answersVector.push('Yes - definitely.');
  answersVector.push('Yes may rely on it.');
    
    // for adding answers
  answersSet.add('asiseeityes');
  answersSet.add('Ask again later.');
  answersSet.add('Better not tell you now.');
  answersSet.add('Cannot predict now.');
  answersSet.add('Concentrate and ask again.');
  answersSet.add('Don\'t count on it.');
  answersSet.add('It is certain.');
  answersSet.add('It is decidedly so.');
  answersSet.add('Most likely.');
  answersSet.add('My reply is no.');
  answersSet.add('My sources say no.');
  answersSet.add('Outlook not so good.');
  answersSet.add('outlookgood');
  answersSet.add('Reply hazy, try again.');
  answersSet.add('Signs point to yes.');
  answersSet.add('Very doubtful.');
  answersSet.add('Without a doubt.');
  answersSet.add('Yes.');
  answersSet.add('Yes - definitely.');
  answersSet.add('Yes may rely on it.');
}
// answersVector.push('As I see it, yes.');
// answersVector.push('Ask again later.');
// answersVector.push('Better not tell you now.');
// answersVector.push('Cannot predict now.');
// answersVector.push('Concentrate and ask again.');
// answersVector.push('Don\'t count on it.');
// answersVector.push('It is certain.');
// answersVector.push('It is decidedly so.');
// answersVector.push('Most likely.');
// answersVector.push('My reply is no.');
// answersVector.push('My sources say no.');
// answersVector.push('Outlook not so good.');
// answersVector.push('Outlook good.');
// answersVector.push('Reply hazy, try again.');
// answersVector.push('Signs point to yes.');
// answersVector.push('Very doubtful.');
// answersVector.push('Without a doubt.');
// answersVector.push('Yes.');
// answersVector.push('Yes - definitely.');
// answersVector.push('Yes may rely on it.');
  
//   // for adding answers
// answersSet.add('asiseeityes');
// answersSet.add('Ask again later.');
// answersSet.add('Better not tell you now.');
// answersSet.add('Cannot predict now.');
// answersSet.add('Concentrate and ask again.');
// answersSet.add('Don\'t count on it.');
// answersSet.add('It is certain.');
// answersSet.add('It is decidedly so.');
// answersSet.add('Most likely.');
// answersSet.add('My reply is no.');
// answersSet.add('My sources say no.');
// answersSet.add('Outlook not so good.');
// answersSet.add('outlookgood');
// answersSet.add('Reply hazy, try again.');
// answersSet.add('Signs point to yes.');
// answersSet.add('Very doubtful.');
// answersSet.add('Without a doubt.');
// answersSet.add('Yes.');
// answersSet.add('Yes - definitely.');
// answersSet.add('Yes may rely on it.');

// export const m8 = new DataStore(answersSet, vectorSeed);
