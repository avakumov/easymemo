import { useState, useRef, useEffect } from 'react';
import { Box, IconButton } from '@mui/joy';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import CheckIcon from '@mui/icons-material/Check';
import { encodeAudio } from '../../utils';
import api from '../../services/ApiService';
import { showMessage } from '../../store/slices/messageSlice';
import { useDispatch } from 'react-redux';

type StateType = {
	audioContext: AudioContext | null;
	settings: MediaTrackSettings | null;
	audioRecorder: AudioWorkletNode | null;
	buffers: any[];
};

export default function AudioRecorder() {
	const dispatch = useDispatch();
	const [uploadAudio] = api.useUploadAudioMutation();
	const [isRecording, setIsRecording] = useState(false);
	const [state, setState] = useState<StateType>({
		audioContext: null,
		settings: null,
		audioRecorder: null,
		buffers: [],
	});
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		main();
		async function main() {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: false,
				audio: {
					noiseSuppression: true,
					autoGainControl: true,
					channelCount: 1,
					echoCancellation: true,
				},
			});

			const [track] = stream.getAudioTracks();
			const settings = track.getSettings();

			const audioContext = new AudioContext();
			await audioContext.audioWorklet.addModule('/worklet/audio-recorder.js');

			const mediaStreamSource = audioContext.createMediaStreamSource(stream);
			const audioRecorder = new AudioWorkletNode(audioContext, 'audio-recorder');

			const buffers: any[] = [];

			audioRecorder.port.addEventListener('message', (event) => {
				buffers.push(event.data.buffer);
			});
			audioRecorder.port.start();

			mediaStreamSource.connect(audioRecorder);
			audioRecorder.connect(audioContext.destination);
			setState({ audioContext, settings, audioRecorder, buffers });
		}
	}, []);

	function startStopRecording() {
		if (isRecording) {
			if (!state.settings || !state.audioRecorder || !state.audioContext) return;
			const blob = encodeAudio(state.buffers, state.settings);
			const url = URL.createObjectURL(blob);
			const parameter = state.audioRecorder.parameters.get('isRecording');
			parameter && parameter.setValueAtTime(0, state.audioContext.currentTime);
			if (audioRef.current) {
				audioRef.current.src = url;
			}
			setIsRecording(false);
		} else {
			if (!state.audioRecorder || !state.audioContext) return;
			const parameter = state.audioRecorder.parameters.get('isRecording');
			parameter && parameter.setValueAtTime(1, state.audioContext.currentTime);
			state.buffers.splice(0, state.buffers.length);
			setIsRecording(true);
		}
	}

	async function saveRecord() {
		const form = new FormData();

		const blob = encodeAudio(state.buffers, state.settings);
		const file = new File([blob], 'audio.wav', { type: 'audio/wav' });
		form.append('file', file);

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
				title={isRecording ? 'Stop recording' : 'Start recording'}>
				{isRecording ? <StopIcon /> : <FiberManualRecordIcon />}
			</IconButton>
			<IconButton color='success' title='Save' onClick={saveRecord}>
				<CheckIcon />
			</IconButton>
		</Box>
	);
}
