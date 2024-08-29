import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Tadpole', synchronize: false })
export class Tadpole {
  @PrimaryColumn() id: string;
  @Column() tokenId: number;
  @Column() name: string;
  @Column() description: string;
  @Column() imageUrl: string;
  @Column() background: string;
  @Column() skin: string;
  @Column() clothing?: string;
  @Column() face: string;
  @Column() hat?: string;
  @Column() accessories?: string;
  @Column() createdAt: Date;
  @Column() updatedAt?: Date;
}
