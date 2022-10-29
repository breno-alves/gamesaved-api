import { UserDocument } from '@/modules/users/schemas/user.schema';
import { SchemaId } from '@/shared/types/schema-id.type';
import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
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
    return this.request.user;
  }
}
