const fetchMessageTask = `
self.setInterval(() => {
	self.postMessage('read-message');
}, 1000 * 60 * 2);
`;

export { fetchMessageTask };


