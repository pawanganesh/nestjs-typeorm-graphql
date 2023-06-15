import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { UserOTPType } from '../enums/user-otp.enum';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'user_otp' })
export class UserOTP extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'code', type: 'varchar', length: 6 })
  code: string;

  @Column({ name: 'otp_type', type: 'enum', enum: UserOTPType })
  otp_type: UserOTPType;

  @Column('uuid', { name: 'user_id' })
  user_id: string;
  @ManyToOne(() => User, (user) => user.user_otps)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
