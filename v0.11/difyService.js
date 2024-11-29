class DifyService {
    constructor() {
        this.API_KEY = 'your-api-key';
        this.API_URL = 'https://api.dify.ai/v1/completion-messages';
    }

    async generateEmail(content) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: { query: content },
                    response_mode: "blocking",
                    user: "chrome-extension-user"
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            return data.answer || '生成回复失败';
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}