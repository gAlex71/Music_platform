//Для примера!!!
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

//В контроллере мы взаимодействуем непосредственно с запросами и ответами

//Параметром в декоратор передаем маршрут, по которому будут отрабатывать запросы, описанные в этом декораторе
@Controller('/api')
export class AppController{
    //Внедряем сервис в наш контроллер
    constructor(private appService: AppService){}
    //Сами функции мы помечаем декораторами, чтобы знать за что они отвечают
    @Get()
    getUsers(){
        return this.appService.getUsers()
    }
}