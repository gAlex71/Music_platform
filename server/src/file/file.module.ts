import { Module } from "@nestjs/common";
import { FileService } from "./file.service";

@Module({
    //Регистрируем сервис
    providers: [FileService]
})
export class FileModule {}