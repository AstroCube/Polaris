import {IUser, IUserPlaceholder} from "../newModels/user/IUser";
import {Group} from "../models/group";

export function getUserPlaceholder(user: IUser): IUserPlaceholder {
  let mainGroup = user.groups[0].group;
  let groups: Group[] = [];
  user.groups.forEach((group) => {
    if (mainGroup.priority < group.group.priority) mainGroup = group.group;
    groups.push(group.group);
  });

  return {
    groups: groups,
    mainGroup: mainGroup
  } as IUserPlaceholder;
}
