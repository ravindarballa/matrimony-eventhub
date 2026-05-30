import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // Automatically manages createdAt and updatedAt fields
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string; // Storing hashed password for high security

  @Prop({ required: true, enum: ['Self', 'Parents', 'Sibling', 'Friend'], default: 'Self' })
  profileCreatedBy!: string;

  @Prop({ required: true, enum: ['Male', 'Female'] })
  gender!: string;

  @Prop({ required: true, unique: true, trim: true })
  phone!: string; 
}

// ⬇️ ADD AND EXPORT THIS LINE AT THE BOTTOM OF THE FILE ⬇️
export const UserSchema = SchemaFactory.createForClass(User);
