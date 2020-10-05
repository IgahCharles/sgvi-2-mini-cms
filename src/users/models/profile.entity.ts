import { BaseAbstractEntity } from "src/global/base-abstract.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile extends BaseAbstractEntity{

    @Column()
    homeAddress: string

    @Column()
    Nationality: string

    @Column()
    stateOfOrigin: string

    @Column({nullable:true})
    photo:string//photo

    @Column("simple-json", {nullable: true})
    bulmaProperties: {primaryColor: string, primaryBackground: string}
    
    @JoinColumn()
    @OneToOne(type => User, user => user.profile, {onDelete: 'CASCADE'})
    user: User

}