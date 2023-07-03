export const serializationNonPOJOs = <T>(obj: T): T => {
	return structuredClone(obj);
};

export const countWords = (htmlText: string) => {
	const plainText = htmlText.replace(/<[^>]+>/g, ' ');
	const words = plainText.split(' ').filter(word => word !== '');

	return words.length;
};

export const converterLtGt = (content: string) => {
	if (content.includes('&lt;') && content.includes('&gt;')) {
		const replacedContent = content.replace('&lt;', '<').replace('&gt;', '>');
		return replacedContent;
	}
};

export const fetcher = async <T extends {}>(
	url: string,
	method: 'POST' | 'PATCH' | 'DELETE',
	data: Partial<T>,
	options?: RequestInit,
) => {
	const res = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...data }),
		...options,
	});

	return await res.json();
};
