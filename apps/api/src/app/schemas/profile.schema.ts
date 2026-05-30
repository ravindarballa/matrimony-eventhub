import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, unique: true })
  userId!: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  dateOfBirth!: Date;

  @Prop({ required: true })
  religion!: string;

  @Prop({ required: true })
  community!: string;

  @Prop({ required: true })
  occupation!: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
