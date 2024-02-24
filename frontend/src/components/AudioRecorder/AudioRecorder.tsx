import { useState, useRef, useCallback, useEffect } from 'react';
import { Box, IconButton } from '@mui/joy';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import CheckIcon from '@mui/icons-material/Check';
import api from '../../services/ApiService';
import { showMessage } from '../../store/slices/messageSlice';
import { useDispatch } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AudioProgressBar from '../AudioProgressBar/AudioProgressBar';

export default function AudioRecorder() {
	const dispatch = useDispatch();
	const [uploadAudio] = api.useUploadAudioMutation();

	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
	const [blob, setBlob] = useState<Blob | null>(null);
	const [timeProgress, setTimeProgress] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const progressBarRef = useRef<HTMLInputElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	const togglePlayPause = () => {
		setIsPlaying((prev) => !prev);
	};

	// ref for animation
	const playAnimationRef = useRef<number>();

	const repeat = useCallback(() => {
		if (!audioRef.current || !progressBarRef.current) {
			return;
		}
		const currentTime = audioRef.current.currentTime;
		setTimeProgress(currentTime);
		progressBarRef.current.value = currentTime.toString();
		progressBarRef.current.style.setProperty('--range-progress', `${(currentTime / duration) * 100}%`);

		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [audioRef, duration, progressBarRef, setTimeProgress]);

	useEffect(() => {
		if (!audioRef.current) {
			return;
		}
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
		playAnimationRef.current = requestAnimationFrame(repeat);
		return () => cancelAnimationFrame(playAnimationRef.current ?? 0);
	}, [isPlaying, audioRef, repeat]);

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

	const onLoadedMetadata = () => {
		if (!audioRef.current) return;
		const audio = audioRef.current;
		if (audio.duration === Infinity || isNaN(Number(audio.duration))) {
			audio.currentTime = 1e101;
			audio.addEventListener('timeupdate', getDuration);
		}
	};

	function getDuration(event: any) {
		event.target.currentTime = 0;
		event.target.removeEventListener('timeupdate', getDuration);
		setDuration(event.target.duration);
	}

	return (
		<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
			<audio
				id='audio'
				ref={audioRef}
				onLoadedMetadata={onLoadedMetadata}
				onEnded={() => setIsPlaying(false)}></audio>
			<IconButton onClick={togglePlayPause} size='sm' color='warning'>
				{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>
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
			<AudioProgressBar
				progressBarRef={progressBarRef}
				audioRef={audioRef}
				timeProgress={timeProgress}
				duration={duration}
			/>
		</Box>
	);
}
