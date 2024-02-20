import { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/joy';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import CheckIcon from '@mui/icons-material/Check';
import api from '../../services/ApiService';
import { showMessage } from '../../store/slices/messageSlice';
import { useDispatch } from 'react-redux';

export default function AudioRecorder() {
	const dispatch = useDispatch();
	const [uploadAudio] = api.useUploadAudioMutation();
	const audioRef = useRef<HTMLAudioElement>(null);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [blob, setBlob] = useState<Blob | null>(null);

	async function startStopRecording() {
		if (mediaRecorder) {
			//stop record
			mediaRecorder.stop();
		} else {
			//start record
			let chunks: any = [];
			const stream = await navigator.mediaDevices.getUserMedia({
				video: false,
				audio: {
					noiseSuppression: true,
					autoGainControl: true,
				},
			});

			const _mediaRecorder = new MediaRecorder(stream);
			_mediaRecorder.start();
			_mediaRecorder.ondataavailable = (e) => {
				chunks.push(e.data);
			};
			// обработчик окончания записи (см. ниже)
			_mediaRecorder.onstop = (e) => {
				const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
				const src = URL.createObjectURL(audioBlob);
				setBlob(audioBlob);

				audioRef.current!.src = src;
				chunks = [];
				setMediaRecorder(null);
			};
			setMediaRecorder(_mediaRecorder);
		}
	}

	async function saveRecord() {
		if (!blob) return;
		const form = new FormData();
		form.append('file', blob, 'record.mp3');

		try {
			const response = await uploadAudio(form).unwrap();
			const filename = response.file.filename;
			//show success message
			filename && dispatch(showMessage({ message: 'Audio saved', type: 'success' }));
		} catch (e) {
			console.error('ошибка:', e);
			dispatch(showMessage({ message: JSON.stringify(e), type: 'error' }));
		}
	}
	return (
		<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
			<audio controls id='audio' ref={audioRef}></audio>
			<IconButton
				onClick={startStopRecording}
				id='buttonStart'
				size='sm'
				color='danger'
				title={mediaRecorder ? 'Stop recording' : 'Start recording'}>
				{mediaRecorder ? <StopIcon /> : <FiberManualRecordIcon />}
			</IconButton>
			<IconButton color='success' title='Save' onClick={saveRecord}>
				<CheckIcon />
			</IconButton>
		</Box>
	);
}
