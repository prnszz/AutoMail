# Gmail 内容提取器 

这是一个 Chrome 扩展程序，可以帮助提取 Gmail 内容并使用 Dify.ai API 生成 AI 回复。

## 功能特点

1. 提取 Gmail 对话内容
2. 使用 Dify.ai 生成 AI 回复
3. 简洁的用户界面

## 安装方法

1. 克隆此仓库或下载源代码
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"，选择 `v0.11` 文件夹

## 使用方法

1. 打开一个 Gmail 对话
2. 点击扩展图标
3. 点击"提取邮件内容"获取邮件内容
4. 点击"生成回复"获取 AI 生成的回复

## API 配置
将`Autogmail.yml`文件导入到Dify里.  
扩展程序使用 Dify.ai API。您可以在 `difyService.js` 中配置您的 API 密钥：