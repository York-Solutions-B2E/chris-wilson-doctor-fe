import { Injectable } from '@angular/core';
import { actions, roles } from '../models/constants';

import { mappings } from '../models/permissions';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  constructor() { }

  hasPermission(action: actions, user: User) {
      
  }
}
