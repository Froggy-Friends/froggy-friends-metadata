import { Attribute } from "src/models/Attribute";

export interface ItemMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}