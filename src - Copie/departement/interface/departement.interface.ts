import { Document } from "mongoose";
export interface IDepartement extends Document {
    readonly name:string;
   
    readonly HeadOfDepartement:string;
    readonly ListOfEmployers:string;
  
}