import { MediaType } from './MediaType';
import { File } from './File';
import { AssetType } from './AssetType';

export interface Asset {
  name?: string;
  description?: string;
  media_type: MediaType;
  asset_type: AssetType;
  files: File[];
}
