import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject } from './subject.schema';
import { Model }  from 'mongoose';

@Injectable()
export class SubjectService {

    constructor(
        @InjectModel(Subject.name) private readonly SubjectModel : Model<Subject>
    ){}

    async createSubject(name : string) : Promise<Subject> {
        const subject = new this.SubjectModel({name});
        return await subject.save();
    }

    async getSubjectById( id : string ) : Promise<Subject> {
        try{
            const subject = await this.SubjectModel.findById(id);
            return subject;
        }catch(error){
            Logger.error(`Cannot find Subject with id : ${id}`);
            throw new Error(`Subject with Id : ${id} not found, ${error.message}`)
        }
    }

    async getSubjectId( name : string ) : Promise<string> {
        try{
            const subject = await this.SubjectModel.findOne({name : name});
            return subject._id.toString();
        }catch(error){
            Logger.error(`Cannot find Subject with name : ${name}`);
            throw new Error(`Subject with name : ${name} not found, ${error.message}`)
        }
        
    }

    async getAllSubjects() : Promise<Subject[]> {
        return await this.SubjectModel.find();
    }

    async renameSubject(oldName : string, newName : string) : Promise<Subject> {
        return await this.SubjectModel.findOneAndUpdate({name : oldName},{
            $set : { name : newName }
        });
    }

    async deleteSubject(name : string) : Promise<Subject> {
        return await this.SubjectModel.findOneAndDelete({name});
    }
}
