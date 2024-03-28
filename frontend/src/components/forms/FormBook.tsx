import { Box, Button, Container, IconButton, Typography, Input } from '@mui/joy';
import { Dispatch, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import PdfjsLib from '../Pdfjs/Pdfjs';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/messageSlice';
import api from '../../services/ApiService';
import { EntityNames, IBook } from '../../types';
import fileService from '../../services/fileService';

const FormBook = ({ book, exit }: { exit: () => void; book?: IBook }) => {
	const dispatch = useDispatch();
	const [file, setFile] = useState<File | null>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const [pdfDoc, setPdfDoc] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [title, setTitle] = useState('');

	const [createBook] = api.useCreateBookMutation();

	const renderPage = useCallback(
		async function renderPage(pageNumber: number) {
			if (!pdfDoc || !canvas?.current) return;

			try {
				var page = await pdfDoc.getPage(pageNumber);
				// original width of the pdf page at scale 1
				var pdf_original_width = page.getViewport(1).width;

				// as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
				var scale_required = canvas.current.width / pdf_original_width;

				// get viewport to render the page at required scale
				var viewport = page.getViewport(scale_required);

				// set canvas height same as viewport height
				canvas.current.height = viewport.height;

				// page is rendered on <canvas> element
				var render_context = {
					canvasContext: canvas.current.getContext('2d'),
					viewport: viewport,
				};

				// render the page contents in the canvas
				await page.render(render_context).promise;
			} catch (error) {
				console.error(error);
			}
		},
		[pdfDoc]
	);
	//rerender canvas
	useEffect(() => {
		clearCanvas(canvas.current);
		renderPage(currentPage);
	}, [currentPage, renderPage]);

	//set title of book
	useEffect(() => {
		if (!file) return;
		const title = file?.name?.split('.')[0];
		setTitle(title);
	}, [file]);

	async function changeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target?.files) return;
		const file = e.target.files[0];
		if (!file || !canvas?.current) return;
		setFile(file);

		const fileURL = window.URL.createObjectURL(file);

		try {
			// @ts-ignore
			const pdf_doc = await window.pdfjsLib.getDocument({
				url: fileURL,
			}).promise;
			setPdfDoc(pdf_doc);
			setCurrentPage(1);
		} catch (error) {
			console.error(error);
		}
	}

	function clearCanvas(canvas: HTMLCanvasElement | null) {
		if (!canvas) return;
		const context = canvas.getContext('2d');
		context && context.clearRect(0, 0, canvas.width, canvas.height);
	}

	async function saveHandler() {
		if (!file) return;
		const { data } = await fileService.saveFile({ file, type: 'pdf' });
		if (!data) return;

		//image base64 TODO save
		const image = canvas.current?.toDataURL('image/png');
		if (typeof image === 'undefined') {
			console.error('image is undefined');
			return;
		}
		const newBook = {
			image,
			title,
			pdfFilename: data.file.filename,
			pdfFilePath: data.file.path,
		};

		try {
			const b = await createBook(newBook).unwrap();
			//show success message
			b.id && dispatch(showMessage({ message: 'Book saved', type: 'success' }));

			//TODO invalidate books
			dispatch(api.util.invalidateTags([EntityNames.BOOKS]));
		} catch (e) {
			console.error('ошибка:', e);
			dispatch(showMessage({ message: JSON.stringify(e), type: 'error' }));
		}
		exit();
	}

	const disabledSave = !file || !title;

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					gap: '1rem',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				<PdfjsLib />

				<Typography component='h1'>Добавление новой книги</Typography>

				{file ? (
					<>
						<Box>Название книги</Box>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							endDecorator={
								<IconButton onClick={() => setTitle('')}>
									<CloseIcon />
								</IconButton>
							}
						/>
					</>
				) : (
					<Button component='label' variant='soft' sx={{ width: 'fit-content' }}>
						Выберете файл pdf...
						<input
							onChange={changeFileHandler}
							style={{ display: 'none' }}
							type='file'
							accept='application/pdf'
						/>
					</Button>
				)}

				<Book canvas={canvas} showCanvas={!!file} />
				<Pages
					show={!!pdfDoc}
					//@ts-ignore
					countPages={pdfDoc?._pdfInfo?.numPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<Button variant='soft' onClick={exit}>
						Закрыть
					</Button>

					<Button variant='soft' onClick={saveHandler} disabled={disabledSave}>
						Сохранить
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

const Book = ({ canvas, showCanvas }: { canvas: RefObject<HTMLCanvasElement>; showCanvas: boolean }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<canvas width='200' ref={canvas} style={{ width: showCanvas ? '200px' : '0px' }} />
			<Box
				sx={{
					display: showCanvas ? 'none' : 'flex',
					height: '282px',
					flexDirection: 'column',
					gap: 5,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<BlockIcon style={{ fontSize: '5rem' }} />
				Пока нечего не выбрано
			</Box>
		</Box>
	);
};

const Pages = ({
	countPages,
	currentPage,
	setCurrentPage,
	show,
}: {
	countPages: number | null;
	currentPage: number;
	setCurrentPage: Dispatch<number>;
	show: boolean;
}) => {
	if (!show) return null;
	return (
		<>
			<Box>Выберeтe обложку</Box>
			<Box sx={{ display: 'flex', width: '100%', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
				<IconButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
					<KeyboardArrowLeftIcon />
				</IconButton>
				{currentPage}/{countPages}
				<IconButton
					disabled={currentPage === countPages}
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}>
					<KeyboardArrowRightIcon />
				</IconButton>
			</Box>
		</>
	);
};

export default FormBook;
