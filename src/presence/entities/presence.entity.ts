import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Types, SchemaTypes } from 'mongoose';
@Schema({ timestamps: true })
export class Presence {
  @Prop()
  date:Date
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Users' })
  user: Types.ObjectId;
}
export const presenceschema = SchemaFactory.createForClass(Presence);