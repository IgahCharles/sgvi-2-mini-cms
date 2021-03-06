import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { User } from "src/users/models/user.entity";


export class CreateRoleDto extends CreateBaseAbstractDto{
    readonly name: string;
    readonly description: string;  
    readonly user: User;
}