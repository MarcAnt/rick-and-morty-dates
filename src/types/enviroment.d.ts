export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SUPABASE_URL: string;
      REACT_APP_SUPABASE_KEY: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
