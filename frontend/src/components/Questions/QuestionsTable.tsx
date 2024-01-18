import { memo, useState } from 'react';
import { Box, IconButton, Link, Sheet, Table } from '@mui/joy';
import LinkIcon from '@mui/icons-material/Link';
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
						<th style={{ width: '5%' }}>id</th>
						<th style={{ width: '10%' }}>Categories</th>
						<th style={{ width: '35%' }}>Question</th>
						<th style={{ width: '35%' }}>Answer</th>
						<th style={{ width: '5%' }}>URL</th>
						<th style={{ width: '10%' }}>edit</th>
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
	}: {
		row: IQuestion;
		removeElement: (id: number) => void;
		editElement: (data: IQuestion) => void;
	}) => {
		const [selected, setSelected] = useState<boolean>(false);
		return (
			<Box
				component='tr'
				key={row.id}
				sx={{ backgroundColor: (theme) => (selected ? theme.vars.palette.background.level2 : 'inherit') }}
				onClick={() => {
					setSelected(!selected);
				}}>
				<td>{row.id}</td>
				<td>{row.categories?.map((c) => c.name).join(', ') ?? 'not found'}</td>
				<td>{row.question}</td>
				<td>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						{row.rightAnswers.split(' |-| ').map((a) => (
							<Sheet key={a} variant='soft' sx={{ p: '0.3rem', borderRadius: '0.3rem' }}>
								{a}
							</Sheet>
						))}
					</Box>
				</td>
				<td>
					{row.url ? (
						<Link href={row.url} target='_blank' title={row.url}>
							<LinkIcon></LinkIcon>
						</Link>
					) : (
						'-'
					)}
				</td>
				<td>
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
