import { Document } from "mongoose";
export interface ISallon extends Document {
    readonly name:string;
   
    readonly capacity:number;
  
}