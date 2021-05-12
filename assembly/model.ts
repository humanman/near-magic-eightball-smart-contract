import { PersistentSet, PersistentVector } from 'near-sdk-as';

// max length of new answers a user can add to 8-ball
export const MAXLEN = 40;

// creates object literal for saving question/answers
@nearBindgen
export class Session {
  q: string;
  a: string;
  constructor(quest: string, answ: string) {
    this.q = quest;
    this.a = answ;
  }
}

// Vector for pulling answers
export const answersVector: PersistentVector<string> = new PersistentVector<string>('av');

// Set for adding answers
export const answersSet: PersistentSet<string> = new PersistentSet<string>('as');

// Vector for storing previous question/answers
export const historyVector: PersistentVector<Session>  = new PersistentVector<Session>('hs');


// Seed Magic 8 Ball with default answers
export function seedPersistentLayers(): void {
  if (answersVector.length === 0) {
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
  }
  
  if (answersSet.size === 0) {
    answersSet.add('asiseeityes');
    answersSet.add('askagainlater');
    answersSet.add('betternottellyounow');
    answersSet.add('cannotpredictnow');
    answersSet.add('concentrateandaskagain');
    answersSet.add('dontcountonit');
    answersSet.add('itiscertain');
    answersSet.add('itisdecidedlyso');
    answersSet.add('mostlikely');
    answersSet.add('myreplyisno');
    answersSet.add('mysourcessayno');
    answersSet.add('outlooknotsogood');
    answersSet.add('outlookgood');
    answersSet.add('replyhazytryagain');
    answersSet.add('signspointtoyes');
    answersSet.add('verydoubtful');
    answersSet.add('withoutadoubt');
    answersSet.add('yes');
    answersSet.add('yesdefinitely');
    answersSet.add('yesmayrelyonit');
  }
}

