import { memo, useState } from 'react';
import { Box, Button, IconButton, Sheet, Table } from '@mui/joy';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IQuestion } from '../../types';

type QuestionsTableProps = {
	questions: IQuestion[];
	remove: (id: number) => void;
	edit: (q: IQuestion) => void;
};

export default function QuestionsTable({ questions, remove, edit }: QuestionsTableProps) {
	return (
		<Sheet variant='outlined' sx={{ display: { xs: 'none', sm: 'block' } }}>
			<Table stickyHeader>
				<thead>
					<tr>
						<th>id</th>
						<th>Categories</th>
						<th>Question</th>
						<th>Answer</th>
						<th>edit</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(questions)
						? questions.map((q) => (
								<TableRowMemo key={q.id} row={q} removeElement={remove} editElement={edit} />
						  ))
						: null}
				</tbody>
			</Table>
		</Sheet>
	);
}

const TableRowMemo = memo(
	({
		row,
		removeElement,
		editElement,
	}: // selected,
	// setSelected,
	{
		row: IQuestion;
		removeElement: (id: number) => void;
		editElement: (data: IQuestion) => void;
		// selected: boolean;
		// setSelected: (value: boolean) => void;
	}) => {
		const [selected, setSelected] = useState<boolean>(false);
		return (
			<Box
				component='tr'
				key={row.id}
				sx={{ backgroundColor: (theme) => (selected ? theme.vars.palette.background.level2 : 'inherit') }}
				onClick={() => {
					console.log('selecred: ', row.id);
					console.log('selecred: ', selected);
					setSelected(!selected);
				}}>
				<td>{row.id}</td>
				<td>{row.categories?.map((c) => c.name).join(', ') ?? 'not found'}</td>
				<td>{row.question}</td>
				<td>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						{row.correctAnswers.map((a) => (
							<Sheet key={a} variant='soft' sx={{ p: '0.3rem', borderRadius: '0.3rem' }}>
								{a}
							</Sheet>
						))}
					</Box>
				</td>
				<td align='center'>
					<IconButton
						onClick={() => {
							editElement(row);
						}}>
						<EditIcon fontSize='inherit' />
					</IconButton>
					<IconButton onClick={() => removeElement(row.id)}>
						<DeleteOutlineIcon fontSize='inherit' />
					</IconButton>
				</td>
			</Box>
		);
	}
);
