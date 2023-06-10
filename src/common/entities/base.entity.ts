import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
    select: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: 'now()',
    onUpdate: 'now()',
    nullable: false,
    select: false,
  })
  updated_at: Date;
}
