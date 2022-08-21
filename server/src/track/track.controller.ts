import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express"

// В контроллере мы работаем с запроса, клиент-серверной составляющей
//Все методы данного контроллера будут вызываться по этому маршруту
@Controller('/tracks')
export class TrackController{
    constructor(private trackService: TrackService){

    }
    //Получаем dto из тела запроса, от клиента
    @Post()
    //Копируем из документации
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto:CreateTrackDto){
        console.log(files)
        //В них находятся по одному элементу
        const {picture, audio} = files
        return this.trackService.create(dto, picture[0], audio[0])
    }

    //Получение треков с пагинацией
    // Параметрами идут число треков и количество на странице
    @Get()
    getAll(@Query('count')count: number,
            @Query('offset')offset: number){
        return this.trackService.getAll(count, offset)
    }

    //Поиск трека
    @Get('/search')
    search(@Query('query')query: string){
        return this.trackService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        //Возвращаем результат выполнения функции в сервисе
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.trackService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto){
        return this.trackService.addComment(dto)
    }

    //Счетчик прослушивания трека
    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId){
        return this.trackService.listen(id)
    }
}