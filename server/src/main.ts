import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

//Именно этот файл будет запускать наше приложение
const start = async () => {
  try{
    const PORT = process.env.PORT || 5000
    //Параметром в эту функцию передаем модуль
    const app = await NestFactory.create(AppModule)
    //Корс требуется для отправки запросов с браузера
    app.enableCors()
    await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  }catch(e){
    console.log(e);
    
  }
}
start()