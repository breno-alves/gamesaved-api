import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export default class PaginatorPipe implements PipeTransform {
  public transform(dto: any) {
    try {
      const paginator = {
        page: dto?.page ? parseInt(dto.page, 10) - 1 : 0,
        limit: dto?.limit ? parseInt(dto.limit, 10) : 25,
      };
      return paginator;
    } catch (e) {
      // TODO: improve error handling
      console.log('error in paginator pipe', e);
      return { page: 0, limit: 25 };
    }
  }
}
