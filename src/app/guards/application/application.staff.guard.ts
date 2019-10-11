import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../services/group.service';
import {UserService} from '../../services/user.service';

@Injectable()
export class ApplicationStaffGuard {


  constructor (
    private _groupService: GroupService,
    private _userService: UserService,
    private _router: Router
  )
  {}

  resolve(): Promise<any> {
    return this.getData().then((response) => {
      if (response) {
        console.log(response);
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      return false;
    });
  }

  async getData(): Promise<any> {
    let data : any[] = [];
    await this._groupService.groupStaffList().then(async (groups) => {


      await groups.forEach(async (group) => {

        // Construct the finalGroup object.
        let finalGroup : any = {};
        finalGroup.name = group.name;
        finalGroup.color = group.html_color;
        finalGroup.members = [];

        await this._groupService.groupGetStaffMembers(group._id).then( (members) => {

          // Filter group to get the correct one according to the group
          members.forEach(async (member) => {
            member.group = member.group.filter((a) => a._id === group._id)[0];
            member.discord = await this._userService.discord_placeholder(member._id).then((discord) => {
              console.log(discord);
            }).catch(null);
            finalGroup.members.push(member);
          });

        }).catch(null);

        data.push(finalGroup);

      });

    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
    return data;
  }
}
