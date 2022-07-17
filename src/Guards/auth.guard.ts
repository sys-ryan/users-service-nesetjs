import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    request.user = {
      name: 'Dexter',
      email: 'dexter.haan@gmail.com',
    };
    return true;
  }

  private validateRequest(request: any) {
    return true;
  }
}
