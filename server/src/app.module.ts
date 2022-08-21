import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path'
import {ServeStaticModule} from '@nestjs/serve-static'

//Основной модуль, здесь мы подключаем все остальные модули!
//Помечаем этот класс декоратором Module
//Декоратор является оберткой, которая добавляет на класс дополнительный функционал, и сообщает о том, что он у нас модуль
//Импортируем модуль трек
@Module({
    imports: [
        //Добавляем статику, чтобы сервер мог раздавать файлы из папки static
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('параметром передается url кластера с бд'),
        TrackModule,
        FileModule
    ]
})
export class AppModule {}