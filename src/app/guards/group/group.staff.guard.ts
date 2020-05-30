import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {GroupService} from '../../services/group.service';
import {UserService} from '../../services/user.service';
import {IStaffList} from '../../models/group/IStaffList';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class GroupStaffGuard implements Resolve<IStaffList[]> {

  constructor (
    private _groupService: GroupService,
    private _userService: UserService,
    private _router: Router
  )
  {}

  resolve(): Observable<IStaffList[]> {
    return this._groupService.groupStaffList().pipe(map((response: any[]) => {
      let data: IStaffList[] = [];
      try {
        if (response) {
          response.forEach((group) => {
            let finalGroup: IStaffList = {details: group, users: []};
            this._groupService.groupGetStaffMembers(finalGroup.details._id).subscribe(
              (user) => {

                user.forEach(async (member) => {
                  member.group = member.group.filter((a) => a._id === group._id)[0];
                  member.discord = await this._userService.discord_placeholder(member._id).then((discord) => {
                    return discord;
                  }).catch(null);
                  finalGroup.users.push(member);
                });

              }
            );
            data.push(finalGroup);
          });
          return data;
        } else {
          throw new Error("Response was not received correctly");
        }
      } catch (err) {
        switch (err.status) {
          case 404: {
            this._router.navigate(['/error'] , { queryParams: {type: "404"}});
            return null;
          }
          default: {
            this._router.navigate(['/error'] , { queryParams: {type: "500"}});
            return null;
          }
        }
      }
    }));
  }
}
