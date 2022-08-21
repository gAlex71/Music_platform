import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
//Работа с путями
import * as path from 'path'
// Работа с файловой системой
import * as fs from 'fs'
//Генерация случайных id
import * as uuid from 'uuid'

//Тип файла. Чтобы все хранилось на своем месте, в нужной папке
export enum FileType{
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService{

    //Эта функция возвращает строку
    createFile(type: FileType, file): string {
        try{
            //Достаем последнее значение в названии(расширение)
            const fileExtension = file.originalname.split('.').pop()
            //Генерируем уникальное имя и добавляем расширение
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..' , 'static', type)
            if(!fs.existsSync(filePath)){
                //Создаем папку по нужному пути
                fs.mkdirSync(filePath, {recursive: true})
            }
            //Записываем папку на диск
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return type + '/' + fileName
        }catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(fileName: string){

    }
}