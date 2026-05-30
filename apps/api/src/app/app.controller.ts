import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiStatus() {
    return { 
      success: true, 
      message: 'Matrimony EventHub API is running and connected to MongoDB!' 
    };
  }

  @Post('auth/register')
  async registerUser(@Body() body: RegisterDto) {
    return this.appService.registerUser(body);
  }

  @Post('auth/login')
  async loginUser(@Body() body: any) {
    return this.appService.loginUser(body);
  }

  @Post('profile/create')
  async createProfile(@Body() body: any) {
    return this.appService.createProfile(body);
  }

  
}
