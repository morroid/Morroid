export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fingerprint: string;
  invite: string;
  date_of_birth: string; // yyyy/mm/dd
  gift_code_sku_id: string;
  captcha_key: string;
  consent: boolean;
}
