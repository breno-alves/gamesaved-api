import { Gender } from '../../schemas/user.schema';

export type CreateUserDto = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  phone: string;
  email: string;
  avatarRef?: string;
  psnId?: string;
  xboxGamertag?: string;
  nintendoAccount?: string;
  steamProfile?: string;
};
