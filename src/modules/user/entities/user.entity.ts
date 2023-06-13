import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthProvider } from '../enums/auth-provider.enum';
import { UserStatus } from '../enums/user-status.enum';
import { UserRole } from '../enums/user-role.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  full_name: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'text', select: false })
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar: string;

  @Column({ name: 'auth_provider', type: 'enum', enum: AuthProvider })
  auth_provider: AuthProvider;

  @Column({ name: 'status', type: 'enum', enum: UserStatus })
  status: UserStatus;

  @Column({ name: 'role', type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ name: 'last_login', type: 'timestamp with time zone', nullable: true, select: false })
  last_login: Date;
}
