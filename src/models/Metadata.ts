import { Attribute } from './Attribute';
import { Asset } from './Asset';
import { MetadataStandard } from './MetadataStandard';
import { MetadataExtensions } from './MetadataExtensions';

export interface Metadata {
  name: string;
  description: string;
  image: string;
  image3d?: string;
  imagePixel?: string;
  animation_url?: string;
  edition: number;
  date: string;
  ribbit?: number;
  rarity: string;
  attributes: Attribute[];
  assets: Asset[];
  metadata_standard?: MetadataStandard;
  extensions?: MetadataExtensions[];
}
