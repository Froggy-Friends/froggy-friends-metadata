import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Frog } from "./frog.entity";

@Injectable()
export class FrogService {
  
  constructor(@InjectRepository(Frog) private frogRepo: Repository<Frog>) {

  }

  findOne(edition: number): Promise<Frog> {
    return this.frogRepo.findOneBy({ edition: edition });
  }

  async saveFrog(frog: Frog): Promise<Frog> {
    return await this.frogRepo.save(frog);
  }

  
}