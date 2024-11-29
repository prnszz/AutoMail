document.addEventListener('DOMContentLoaded', function() {
    const extractButton = document.getElementById('extractButton');
    const generateButton = document.getElementById('generateButton');
    const emailContentArea = document.getElementById('emailContent');
    const loadingDiv = document.getElementById('loading');
    const difyService = new DifyService();

    extractButton.addEventListener('click', async () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: extractEmailContent
            }, (results) => {
                if (results && results[0]) {
                    emailContentArea.value = results[0].result;
                }
            });
        });
    });

    generateButton.addEventListener('click', async () => {
        try {
            const content = emailContentArea.value;
            if (!content) {
                alert('请先提取邮件内容！');
                return;
            }
    
            loadingDiv.style.display = 'block';
            generateButton.disabled = true;
    
            const response = await difyService.generateEmail(content);
            if (response) {
                emailContentArea.value = response;
            } else {
                throw new Error('无法生成回复');
            }
        } catch (error) {
            alert('生成回复失败：' + error.message);
        } finally {
            loadingDiv.style.display = 'none';
            generateButton.disabled = false;
        }
    });
});

function extractEmailContent() {
    // 保持原有的提取邮件内容的代码不变
    const emailBlocks = document.querySelectorAll('div[role="main"] .adn');
    if (!emailBlocks || emailBlocks.length === 0) {
        return '未找到邮件内容';
    }
    
    let allContent = [];
    
    Array.from(emailBlocks).forEach((block, index) => {
        const fromElement = block.querySelector('.gD');
        const sender = fromElement ? fromElement.getAttribute('email') : '未知发件人';
        
        const timeElement = block.querySelector('.g3');
        const time = timeElement ? timeElement.textContent.trim() : '';
        
        const contentElement = block.querySelector('.a3s.aiL');
        if (contentElement) {
            let contentCopy = contentElement.cloneNode(true);
            
            const quotedContent = contentCopy.querySelector('.gmail_quote');
            if (quotedContent) {
                quotedContent.remove();
            }
            
            let content = contentCopy.innerText || contentCopy.textContent;
            
            content = content.trim()
                .replace(/\n{3,}/g, '\n\n')
                .replace(/\s+/g, ' ');
            
            const formattedMessage = `
发件人: ${sender}
时间: ${time}
内容:
${content}
----------------------------------------`;
            
            allContent.push(formattedMessage);
        }
    });
    
    return allContent.join('\n\n');
} 