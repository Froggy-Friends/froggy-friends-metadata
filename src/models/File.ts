import { MimeType } from './MimeType';

export interface File {
  name?: string;
  description?: string;
  url: string;
  file_type: MimeType;
}
