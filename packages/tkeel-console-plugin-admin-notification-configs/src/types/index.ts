export interface MailFormField {
  id?: string;
  smtpAddress: string;
  port: string;
  ssl: number;
  smtpUserName: string;
  smtpPassWord: string;
  fromAddress: string;
}
