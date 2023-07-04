export const serializationNonPOJOs = <T>(obj: T): T => {
	return structuredClone(obj);
};

export const countWords = (htmlText: string) => {
	const plainText = htmlText.replace(/<[^>]+>/g, ' ');
	const words = plainText.split(' ').filter(word => word !== '');

	return words.length;
};

const youtubeIframe = (src: string) => `
			<div>
      <iframe
        class="rounded-md bg-black"
        width="100%"
        height="310"
        src=${src}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen/>
    	</div>
		`;

export const converterLtGt = (content: string) => {
	// if (content.includes('youtu.be/')) {
	// 	const src = content.replace('youtu.be/', 'youtube.com/embed/');
	// 	return youtubeIframe(src);
	// } else if (content.includes('watch?v=')) {
	// 	const src = content.replace('watch?v=', 'embed/');
	// 	console.log(src);
	// 	console.log(youtubeIframe(src));
	// 	return youtubeIframe(src);
	// }

	if (content.includes('style="')) {
		const replacedContent = content.replace(/style="[^"]*"/g, '');
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
