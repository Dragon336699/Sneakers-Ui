import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { filter, tap } from 'rxjs';
import { UserDto } from '../../../core/dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private roleId!: number;
  private token: string | null = null;
  constructor(
    private router: Router,
    private userService: UserService
) {
    if (typeof localStorage !== 'undefined') {
        this.token = localStorage.getItem("token");
        this.roleId = parseInt(JSON.parse(localStorage.getItem("userInfor") || '{"role_id": "0"}').role_id || '0');
    }
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.roleId == 1 || !this.roleId){
        return false;
    }
    return true;
  }
}