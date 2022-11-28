import { MongooseModule } from '@nestjs/mongoose';

export const MongooseConfig = MongooseModule.forRoot(
  'mongodb+srv://wibuland:wibuland123@cluster0.0luieeq.mongodb.net/wibuland?retryWrites=true&w=majority',
);
