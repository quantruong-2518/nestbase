export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;

      DB_URL: string;

      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_EXP: string;
      JWT_REFRESH_EXP: string;
    }
  }

  // namespace Express {
  //   // eslint-disable-next-line @typescript-eslint/no-empty-interface
  //   interface User extends JwtPayload {}
  // }
}
