import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersWithCount } from 'src/global/custom.interfaces';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { Profile } from './models/profile.entity';
import { User } from './models/user.entity';
//import { FindOneParams } from './validators/params.validator';

@Injectable()
export class UsersService {

    /**
     * 
     * @param userRepository 
     * @param profileRepository 
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    /**
     * 
     * @param createUserDto 
     * 
     */
    //create below assumes that tenant model does not allow cascade create of custom theme
    /*
    async create (createTenantDto: CreateTenantDto): Promise<Tenant>{

        const newCustomTheme = this.customThemeRepository.create(createTenantDto.customTheme)
        const customTheme = await this.customThemeRepository.save(newCustomTheme);


        const newItem = this.tenantRepository.create(createTenantDto);
        //associate the custom theme created above with newItem before saving
        newItem.customTheme = customTheme;

        
        return this.tenantRepository.save(newItem);
    }
    */

    /**
     * 
     * @param createUserDto 
     */
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);

    }

    /**
     * See https://typeorm.io/#/find-options
     */
    
    async findAllWithOptions(findOptions: string): Promise<UsersWithCount> {
        const [users, count] = await this.userRepository.findAndCount(JSON.parse(findOptions));
        return {users,count};
    }

    async findAll(): Promise<UsersWithCount> {
        const [users, count] = await this.userRepository.findAndCount();
        return {users, count}
    }
    
    
    //2. Note: You can indicate the fields to be returned
    /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find({select: ["code", "name"]});
    }*/

    //3. For relations, you can specify relations to be included in return
    /**
     * find all and return only code and name along with customTheme relation
     */
    /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find({select: ["code", "name"], relations: ["customTheme"]});
    }
    */
    
    //4. Etc. See https://typeorm.io/#/find-options

    /**
     * 
     * @param id 
     * find by id
     */
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    
    /**
     * 
     * @param id 
     * Finds by a criterion (id in this case) and deletes. Returns void
     */
    /* FindOneParams not working well. Using ParseIntPipe
    async delete(id: FindOneParams): Promise<void> {
        await this.tenantRepository.delete(id);
    }
    */
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**
     * 
     * @param user 
     * Remove the Tenant specifed. Returns Tenant removed.
     */
    async remove(user: User): Promise<User> {
        return await this.userRepository.remove(user);
    }

    //partial update
    /**
     * 
     * @param id 
     * @param user 
     * Find by the id and replace the fields sent in Dto
     */
    /*
    /* FindOneParams not working well. Using ParseIntPipe
    async update1(id: FindOneParams, tenant: UpdateTenantDto): Promise<UpdateResult> {
        return await this.tenantRepository.update(id, { ...tenant })
    }
    */
    async update1(id: number, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, { ...user })
    }

    /**
     * 
     * @param user 
     * No partial update allowed here. Saves the tenant object supplied
     */
    async update2(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }


}
