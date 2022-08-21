// Для примера!!!
import { Injectable } from "@nestjs/common";

//В сервисах мы описываем какую-то логику(может использоваться в разных контроллерах)
// Здесь идет взаимодейтсвие с бизнес логикой
@Injectable()
export class AppService{
    getUsers(): string {
        return 'GET ALL USERS'
    }
}