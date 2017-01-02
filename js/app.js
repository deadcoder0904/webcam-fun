document.addEventListener('DOMContentLoaded',function() {
	const video = document.getElementById('webcam');
	const canvas = document.getElementById('draw');
	const ctx = canvas.getContext('2d');
	const strip = document.getElementById('strip');
	const snap = document.getElementById('snap');
	const button = document.querySelector('button');

	function getVideo() {
		navigator.mediaDevices.getUserMedia({video : true, audio: false})
			.then(localMediaStream => {
				video.src = window.URL.createObjectURL(localMediaStream);
				video.play();
			})
			.catch(err => {
				console.error(err);
				alert('GIVE PERMISSION TO ACCESS VIDEO PLAYER');
			});
	}

	function paintToCanvas() {
		const width = video.videoWidth;
		const height = video.videoHeight;
		canvas.width = width;
		canvas.height = height;

		setInterval(function() {
			ctx.drawImage(video, 0, 0, width, height);
		},16);
	}

	function takePic() {
		snap.currentTime = 0;
		snap.play();

		const data = canvas.toDataURL('image/jpeg');
		const link = document.createElement('a');
		link.href = data;
		link.setAttribute('download', 'pic');
		link.textContent = 'Download Image';
		link.innerHTML = 	`<img src="${data}" alt="pic" />`;
		strip.insertBefore(link, strip.firstChild);
	}

	video.addEventListener('canplay', paintToCanvas);
	button.addEventListener('click', takePic);

});
