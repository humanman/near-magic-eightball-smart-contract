import { context, logging, storage, PersistentDeque, PersistentVector } from 'near-sdk-as';

@nearBindgen
class MyClass {
  private x: string = '123'
}

export const questions = new PersistentDeque<string>("questions");
export const MAXLEN = 30;
// export let answers = new PersistentVector<string>("av");
// export let answers = new Array<string>(20);

// answers.push('As I see it, yes');
// answers.push('Ask again later.');
// answers.push('Better not tell you now.');
// answers.push('Cannot predict now.');
// answers.push('Concentrate and ask again.');
// answers.push('Don\'t count on it.');
// answers.push('It is certain.');
// answers.push('It is decidedly so.');
// answers.push('Most likely.');
// answers.push('My reply is no.');
// answers.push('My sources say no.');
// answers.push('Outlook not so good.');
// answers.push('Outlook good.');
// answers.push('Reply hazy, try again.');
// answers.push('Signs point to yes.');
// answers.push('Very doubtful.');
// answers.push('Without a doubt.');
// answers.push('Yes.');
// answers.push('Yes - definitely.');
// answers.push('Yes may rely on it.');

// SEED QUESTIONS
