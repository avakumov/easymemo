import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService<AllConfigType>);

	const config = new DocumentBuilder().setTitle('Easymemo').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	//use large body
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	app.enableCors();

	app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }));

	await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
