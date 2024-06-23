import { Attribute } from './Attribute';
import { Asset } from './Asset';
import { MetadataStandard } from './MetadataStandard';
import { MetadataExtensions } from './MetadataExtensions';

export interface Metadata {
  name: string;
  description: string;
  edition: number;
  image: string;
  image3d?: string;
  imagePixel?: string;
  animation_url?: string;
  date?: string;
  ribbit?: number;
  rarity?: string;
  attributes: Attribute[];
  assets?: Asset[];
  metadata_standard?: MetadataStandard;
  extensions?: MetadataExtensions[];
}
