import { registerAs } from '@nestjs/config';

export default registerAs('email', () => {
  console.log('process.env.EMAIL_SERVICE', process.env.EMAIL_SERVICE);
  return {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
    baseUrl: process.env.EMAIL_BASE_URL,
  };
});
