import { PersistentDeque, PersistentVector } from 'near-sdk-as';

export const questions = new PersistentDeque<string>("questions");
export const MAXLEN = 30;
