const AudioProgressBar = ({
	progressBarRef,
	audioRef,
	timeProgress,
	duration,
}: {
	progressBarRef: any;
	audioRef: any;
	timeProgress: number;
	duration: number;
}) => {
	const handleProgressChange = () => {
		audioRef.current.currentTime = progressBarRef.current.value;
	};

	const formatTime = (time: number) => {
		if (time && !isNaN(time)) {
			const minutes = Math.floor(time / 60);
			const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
			const seconds = Math.floor(time % 60);
			const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
			return `${formatMinutes}:${formatSeconds}`;
		}
		return '00:00';
	};

	return (
		<div className='progress'>
			<span className='time current'>{formatTime(timeProgress)}</span>
			<input
				type='range'
				ref={progressBarRef}
				defaultValue='0'
				onChange={handleProgressChange}
				max={Math.floor(duration)}
			/>
			<span className='time'>{formatTime(duration)}</span>
		</div>
	);
};

export default AudioProgressBar;
