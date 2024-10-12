import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BlastFrog', synchronize: false })
export class BlastFrog {
  @PrimaryColumn() edition: number;
  @Column() name: string;
  @Column() description: string;
  @Column() background: string;
  @Column() body: string;
  @Column() eyes: string;
  @Column() mouth: string;
  @Column() shirt: string;
  @Column() hat: string;
  @Column() image: string;
}
