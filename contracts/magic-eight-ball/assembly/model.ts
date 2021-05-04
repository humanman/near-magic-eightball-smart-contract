import { PersistentSet, PersistentVector } from 'near-sdk-as';

export const MAXLEN = 40;

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

// Vector for pulling answers
export const answersVector: Vector<string> = new Vector<string>('av');

// Set for adding answers
export const answersSet: PersistentSet<string> = new PersistentSet<string>('as');

export const sessionStorage: PersistentVector<Session> = new PersistentVector<Session>('sv');
export const historyVector: Vector<Session> = new Vector<Session>('hs');

/**
 * setup a generic subclass instead of duplicating the get_last method
 */
@nearBindgen
export class Vector<T> extends PersistentVector<T> {
  /**
   * this method isn't normally available on a PersistentVector
   * so we add it here to make our lives easier when returning the
   * last `n` items for comments, votes and donations
   * @param count
   */
  get_last(count: i32): Array<T> {
    const n = min(count, this.length);
    const startIndex = this.length - n;
    const result = new Array<T>();
    for (let i = startIndex; i < this.length; i++) {
      const entry = this[i];
      result.push(entry);
    }
    return result;
  }
}


export const answers = `As I see it, yes.
Ask again later.
Better not tell you now.
Cannot predict now.
Concentrate and ask again.
Don\'t count on it.
It is certain.
It is decidedly so.
Most likely.
My reply is no.
My sources say no.
Outlook not so good.
Outlook good.
Reply hazy, try again.
Signs point to yes.
Very doubtful.
Without a doubt.
Yes.
Yes - definitely.
Yes may rely on it.`
