import { PersistentDeque, PersistentVector } from 'near-sdk-as';

export const questions = new PersistentDeque<string>("questions");
export const MAXLEN = 30;


// SEED QUESTIONS

export function init(): PersistentVector<string> {
  let av = new PersistentVector<string>("av");
  // // let av = new Array<string>(20);

  av.push('As I see it, yes');
  av.push('Ask again later.');
  av.push('Better not tell you now.');
  av.push('Cannot predict now.');
  av.push('Concentrate and ask again.');
  av.push('Don\'t count on it.');
  av.push('It is certain.');
  av.push('It is decidedly so.');
  av.push('Most likely.');
  av.push('My reply is no.');
  av.push('My sources say no.');
  av.push('Outlook not so good.');
  av.push('Outlook good.');
  av.push('Reply hazy, try again.');
  av.push('Signs point to yes.');
  av.push('Very doubtful.');
  av.push('Without a doubt.');
  av.push('Yes.');
  av.push('Yes - definitely.');
  av.push('Yes may rely on it.');
  return av
}

// export const answers = init();