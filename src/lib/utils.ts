interface CookieObject {
	Name: string;
	Value: string;
	Expires: number;
	SameSite: boolean | 'strict' | 'lax' | 'none' | undefined;
	Path: string;
	MaxAge: number;
	Secure: boolean;
	HttpOnly: boolean;
}

export function parseCookie(cookieString: string): CookieObject {
	const cookieData: Partial<CookieObject> = {};
	const parts = cookieString
		.trim()
		.split(';')
		.map((part) => part.trim());

	const [name, value] = parts[0].split('=');
	cookieData.Name = name.trim();
	cookieData.Value = value.trim();

	parts.slice(1).forEach((part) => {
		const [key, value] = part.split('=');
		if (!key) return;

		switch (key.toLowerCase()) {
			case 'name':
				cookieData.Name = decodeURIComponent(value || '');
				break;
			case 'value':
				cookieData.Value = decodeURIComponent(value || '');
				break;
			case 'expires':
				cookieData.Expires = new Date(value || '').getMilliseconds();
				break;
			case 'max-age':
				cookieData.MaxAge = parseInt(value || '', 10);
				break;
			case 'samesite':
				cookieData.SameSite = true;
				break;
			case 'path':
				cookieData.Path = value || '';
				break;
			case 'secure':
				cookieData.Secure = true;
				break;
			case 'httponly':
				cookieData.HttpOnly = true;
				break;
		}
	});

	if (!cookieData.Name || !cookieData.Value) {
		throw new Error('Invalid cookie data');
	}

	return cookieData as CookieObject;
}
