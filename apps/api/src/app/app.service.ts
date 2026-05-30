import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>
  ) {}

  async registerUser(body: any) {
    const { email, password, phone, profileCreatedBy, gender } = body;

    if (!email || !password || !phone) {
      throw new BadRequestException('Email, password, and phone number are required');
    }

    const existingUser = await this.userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new BadRequestException('An account with this email already exists');
    }

    const existingPhone = await this.userModel.findOne({ phone });
    if (existingPhone) {
      throw new BadRequestException('An account with this phone number already exists');
    }

    try {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // FIX: Added 'phone' property back into the database model configuration object below
      const newUser = new this.userModel({
        email: email.toLowerCase(),
        passwordHash,
        phone, // 💥 Added this missing line
        profileCreatedBy,
        gender,
      });

      await newUser.save();

      return {
        success: true,
        message: 'User successfully created in MongoDB!',
        userId: newUser._id,
      };
    } catch (error: any) {
      // Catch-all to prevent unhandled 500 crashes and log the actual error details to your terminal window
      console.error('❌ NestJS Registration Save Error:', error);
      throw new InternalServerErrorException(error.message || 'Database save operation failed.');
    }
  }

  async loginUser(body: any) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      success: true,
      message: 'Logged in successfully',
      accessToken: 'mock-jwt-token-id-' + user._id,
      user: { id: user._id, email: user.email, gender: user.gender }
    };
  }

  async createProfile(body: any) {
    const { userId, fullName, dateOfBirth, religion, community, occupation } = body;

    if (!userId || !fullName) {
      throw new BadRequestException('User ID and Full Name are required');
    }

    const userExists = await this.userModel.findById(userId);
    if (!userExists) {
      throw new BadRequestException('Associated system user account not found');
    }

    const newProfile = new this.profileModel({
      userId,
      fullName,
      dateOfBirth: new Date(dateOfBirth),
      religion,
      community,
      occupation,
    });

    await newProfile.save();

    return {
      success: true,
      message: 'Matrimony profile successfully written to MongoDB!',
      profileId: newProfile._id,
    };
  }
}
