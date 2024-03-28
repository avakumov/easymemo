import {
	Controller,
	Delete,
	Get,
	Param,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
	StreamableFile,
	Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream, unlink } from 'node:fs';
import { Public } from 'src/auth/decorators';
import { v4 as uuidv4 } from 'uuid';

const path_to_audio = './uploads/audio';
const path_to_books = './uploads/books';

@Controller('files')
export class FilesController {
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: path_to_audio,
				filename: (req, file, callback) => {
					const fileExtName = file.originalname.split('.').pop();
					const randomName = uuidv4();
					callback(null, `${randomName}.${fileExtName}`);
				},
			}),
		})
	)
	@Post('upload/mp3')
	uploadFileAndFailValidationMP3(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: 'audio/mpeg',
				})
				.build()
		)
		@UploadedFile()
		file: Express.Multer.File
	) {
		return {
			file,
		};
	}

	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: path_to_books,
				filename: (req, file, callback) => {
					const fileExtName = file.originalname.split('.').pop();
					const randomName = uuidv4();
					callback(null, `${randomName}.${fileExtName}`);
				},
			}),
		})
	)
	@Post('upload/pdf')
	uploadFileAndFailValidationPDF(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: 'application/pdf',
				})
				.build()
		)
		@UploadedFile()
		file: Express.Multer.File
	) {
		return {
			file,
		};
	}

	@Delete('remove/mp3/:filename')
	removeFileMp3(@Param('filename') name: string) {
		unlink(path_to_audio + '/' + name, (error) => {
			console.log('error: ', error);
		});
	}

	@Get('get/mp3/:filename')
	getFlileMp3(@Param('filename') filename: string): StreamableFile {
		const file = createReadStream(path_to_audio + '/' + filename);
		return new StreamableFile(file);
	}

	@Delete('remove/pdf/:filename')
	removeFilePdf(@Param('filename') name: string) {
		unlink(path_to_books + '/' + name, (error) => {
			console.log('error: ', error);
		});
	}

	@Header('Content-Type', 'application/pdf')
	@Public()
	@Get('get/pdf/:filename')
	getFlilePdf(@Param('filename') filename: string): StreamableFile {
		const file = createReadStream(path_to_books + '/' + filename);
		return new StreamableFile(file);
	}
}
