import { Attribute } from "../models/Attribute";

export interface Item {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}