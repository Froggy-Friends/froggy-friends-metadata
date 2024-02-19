import { Attribute } from './Attribute';

export interface TadpoleMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}
