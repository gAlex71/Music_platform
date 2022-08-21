import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track>{
        //Создание трека и картинки
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        //Указываем в конце названия файлов, для получения их на фронт
        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }

    //Функция возвращает массив треков
    //Параметры идет пагинация
    async getAll(count = 10, offset = 0): Promise<Track[]>{
        const tracks = await this.trackModel.find().skip(offset).limit(count)
        return tracks
    }

    //Возвращать будет промис с массивом треков
    async search(query: string): Promise<Track[]>{
        const tracks = await this.trackModel.find({
            //Поиск по названию, используем регулярное выражение
            //i - не учитываем регистр поиска
            name: {$regax: new RegExp(query, 'i')}
        })
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track>{
        //Так же притягиваем с собой комментарии
        const track = await (await this.trackModel.findById(id)).populated('comments')
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }

    //Создаем функцию создания комментария
    async addComment(dto: CreateCommentDto): Promise<Comment> {
        //Вытаскиваем id трэке
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        //Добавляем в базу данных и сохраняем эти изменения
        track.comments.push(comment._id)
        await track.save()
        return comment._id
    }

    //Функция количества прослушиваний
    async listen(id: ObjectId){
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }
}