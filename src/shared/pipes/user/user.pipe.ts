import { UserDocument } from '@/modules/users/schemas/user.schema';
import { SchemaId } from '@/shared/types/schema-id.type';
import {
  HttpException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export type UserPipeOutput = {
  user: UserDocument;
  userId: SchemaId;
  username: string;
};

@Injectable({ scope: Scope.REQUEST })
export default class UserPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & {
      user: { userId: SchemaId; username: string; user: UserDocument };
    },
  ) {}

  public transform() {
    const user = this.request.user;

    if (!user) {
      throw new HttpException({ message: 'user not authenticated' }, 401);
    }
    return user;
  }
}
