import { Document } from 'mongoose';
export interface IPresence extends Document {
  readonly date: Date;
  readonly user: string;
}
