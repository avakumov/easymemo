import { Input } from '@mui/joy';
import { cloneElement, ReactNode, useState } from 'react';

export default function Focus({ children }: { children: ReactNode }) {
	const [focus, setFocus] = useState(true);
	return (
		<>
			<Input
				sx={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
				slotProps={{
					input: {
						type: 'text',
						autoFocus: true,
						onBlur: ({ target }) => target.focus(),
						onFocus: () => setFocus(true),
						onBlurCapture: () => setFocus(false),
					},
				}}
			/>
			{/* @ts-ignore*/}
			{children && cloneElement(children, { focus })}
		</>
	);
}
