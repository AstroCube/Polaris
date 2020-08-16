import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {ForumPermissible, IForumPermissions} from "../newModels/permissions/IForumPermissions";

@Injectable()
export class ForumUtilities {

  constructor() {}

  public getGuestPermissions(id: string): Observable<IForumPermissions> {
    return of({
      id,
      manage: false,
      create: false,
      view: ForumPermissible.All,
      edit: ForumPermissible.None,
      comment: ForumPermissible.None,
      delete: false,
      pin: false,
      lock: false,
      globalAdmin: false,
      official: false
    });
  }

}
