const fetchMessageTask = `
self.setInterval(() => {
	console.log('timer in worker');
	self.postMessage('read-message');
}, 1000 * 60 * 2);
`;

export { fetchMessageTask };


