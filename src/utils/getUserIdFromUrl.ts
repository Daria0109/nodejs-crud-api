export const getUserIdFromUrl = (url: string) => {
	const urlSegments = url.split('/');
	
	return urlSegments[urlSegments.length - 1];
};

export const isValidId = (id: string) => {
	const uuidRegex = /^[a-z,0-9-]{36}$/;
	
	return uuidRegex.test(id);
};
