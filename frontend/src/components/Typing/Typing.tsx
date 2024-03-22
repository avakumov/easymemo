import { Box, Sheet, Theme, Tooltip } from '@mui/joy';
import { memo, useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import api from '../../services/ApiService';
import Question from '../Question/Question';
import Loading from '../Loading/Loading';
import { useDispatch } from 'react-redux';

const spin = keyframes`
  from {
    background-color: gray;
  }
  to {
    background-color: white;
  }
`;

const styles = {
	active: {
		animation: `${spin} infinite 0.7s steps(2, end)`,
	},
	disabled: {
		color: 'gray',
	},
};

type TypingProps = {
	focus?: boolean;
};

export default function Typing({ focus }: TypingProps) {
	const {
		data: questions,
		error,
		isLoading,
	} = api.useGetTypingQuery({
		count: 10,
		categories: null,
	});

	if (error) {
		console.log(error);
	}

	const dispatch = useDispatch();
	const lines = questions?.map((q) => q.rightAnswers);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [currentLine, setCurrentLine] = useState(0);

	//слушатель нажатия
	useEffect(() => {
		function keyDownHandler(e: KeyboardEvent) {
			if (!lines) return;
			if (e.key.length === 1) {
				if (lines[currentLine][currentPosition] === e.key) {
					setCurrentPosition((prev) => {
						return prev + 1;
					});
				}
			}
		}

		document.addEventListener('keydown', keyDownHandler);
		return () => document.removeEventListener('keydown', keyDownHandler);
	}, [currentLine, currentPosition, lines]);

	//сброс строк при их окончании
	//сброс положения при переходе на следующую строку
	useEffect(() => {
		if (!lines) return;
		const len = lines[currentLine].length;
		if (len === currentPosition && currentLine + 1 === lines.length) {
			//end of typing
			return reload();
		}
		if (len === currentPosition) {
			setCurrentLine((prev) => prev + 1);
			setCurrentPosition(0);
		}
		function reload() {
			//invalidate
			dispatch(api.util.invalidateTags(['typing']));
			setCurrentPosition(0);
			setCurrentLine(0);
		}
	}, [currentLine, currentPosition, dispatch, lines]);

	if (isLoading) return <Loading />;

	return (
		<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
			<Sheet
				variant='outlined'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minWidth: '360px',
					maxWidth: '1000px',
					fontFamily: 'monospace',
					p: {
						xs: 1,
						md: 3,
					},
					borderRadius: '1rem',
					filter: focus ? 'none' : 'blur(5px)',
					fontWeight: 'bold',
					borderColor: (theme: Theme) => theme.palette.primary.softBg,
					borderWidth: 2,
					wordBreak: 'break-all',
				}}>
				{Array.isArray(lines)
					? lines.map((line, indexLine) => {
							return (
								<Tooltip
									title={<Question question={questions![indexLine]} />}
									variant='outlined'
									arrow
									placement='bottom-start'>
									<Box key={indexLine} sx={{ cursor: 'pointer', width: 'fit-content' }}>
										{line.split('').map((s, index) => {
											return (
												<ElementMemo
													key={index}
													content={s}
													isActive={index === currentPosition && indexLine === currentLine}
													disabled={
														(index < currentPosition && indexLine === currentLine) ||
														indexLine < currentLine
															? true
															: false
													}
												/>
											);
										})}
									</Box>
								</Tooltip>
							);
					  })
					: null}
			</Sheet>
		</Box>
	);
}

function Element({ content, isActive, disabled = false }: { content: string; isActive: boolean; disabled: boolean }) {
	if (content === ' ')
		return (
			<Box component='span' sx={[isActive ? styles.active : {}, disabled ? styles.disabled : {}]}>
				&nbsp;
			</Box>
		);
	return (
		<Box component='span' sx={[isActive ? styles.active : {}, disabled ? styles.disabled : {}]}>
			{content}
		</Box>
	);
}

const ElementMemo = memo(Element);
