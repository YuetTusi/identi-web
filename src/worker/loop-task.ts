const minute: number = 3;

const fetchMessageTask = `
self.setInterval(() => {
	self.postMessage('read-message');
}, 1000 * 60 * 1 * ${minute});
`;

export { fetchMessageTask };


