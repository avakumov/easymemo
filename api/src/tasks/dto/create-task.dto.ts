import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;

	status: string;

	duration: number;
	actualDuration: number;

	complexity: number;
	priority: number;
	startDate: Date;
	endDate: Date;
}
