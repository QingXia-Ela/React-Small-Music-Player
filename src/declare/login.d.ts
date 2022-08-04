export interface LoginStatus {
  code: number;
  account: { [propName: string]: any };
  profile: { [propName: string]: any };
}
