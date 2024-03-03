import { memo, useState } from 'react';
import { Box, Link, Sheet, Table } from '@mui/joy';
import LinkIcon from '@mui/icons-material/Link';
import { IQuestion } from '../../types';
import QuestionMenu from '../QuestionMenu/QuestionMenu';

type QuestionsTableProps = {
	questions: IQuestion[];
};

export default function QuestionsTable({ questions }: QuestionsTableProps) {
	return (
		<Sheet variant='outlined' sx={{ display: { xs: 'none', sm: 'block' } }}>
			<Table stickyHeader>
				<thead>
					<tr>
						<th style={{ width: '5%' }}>id</th>
						<th style={{ width: '10%' }}>Categories</th>
						<th style={{ width: '45%' }}>Question</th>
						<th style={{ width: '30%' }}>Answer</th>
						<th style={{ width: '5%' }}>URL</th>
						<th style={{ width: '5%' }}>edit</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(questions) ? questions.map((q) => <TableRowMemo key={q.id} row={q} />) : null}
				</tbody>
			</Table>
		</Sheet>
	);
}

const TableRowMemo = memo(({ row }: { row: IQuestion }) => {
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
						<Sheet
							key={a}
							variant='soft'
							title={a}
							sx={{
								p: '0.3rem',
								borderRadius: '0.3rem',
								overflowWrap: 'break-word',
							}}>
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
				<QuestionMenu questionId={row.id} />
			</td>
		</Box>
	);
});
