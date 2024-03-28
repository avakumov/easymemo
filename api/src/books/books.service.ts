import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestExtended } from 'src/entities/request';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable({ scope: Scope.REQUEST })
export class BooksService {
	constructor(private prisma: PrismaService, @Inject(REQUEST) private request: RequestExtended) {}
	create(book: CreateBookDto) {
		return this.prisma.book.create({
			data: {
				title: book.title,
				owner: {
					connect: {
						id: this.request.user.userId,
					},
				},
				image: book.image,
				pdfFilename: book.pdfFilename,
				pdfFilePath: book.pdfFilePath,
			},
		});
	}

	findAll() {
		const userId = this.request.user?.userId;
		const isAdmin = this.request.user?.isAdmin;

		return this.prisma.book.findMany({
			where: {
				...(isAdmin ? {} : userId ? { ownerId: userId } : { shared: true }),
			},
			orderBy: {
				id: 'desc',
			},
		});
	}

	findOne(id: number) {
		return `This action returns a #${id} book`;
	}

	update(id: number, updateBookDto: UpdateBookDto) {
		return `This action updates a #${id} book`;
	}

	remove(id: number) {
		return `This action removes a #${id} book`;
	}
}
