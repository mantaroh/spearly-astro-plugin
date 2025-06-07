# @mantaroh/spearly-astro

Spearly CMSのAstroインテグレーション

## インストール

```bash
npm install @mantaroh/spearly-astro
```

## 使用方法

1. `astro.config.mjs`にインテグレーションを追加します：

```js
import { defineConfig } from 'astro/config';
import spearly from '@mantaroh/spearly-astro';

export default defineConfig({
  integrations: [
    spearly({
      apiKey: 'your-api-key',
      projectId: 'your-project-id',
      baseUrl: 'https://api.spearly.com' // オプション
    })
  ]
});
```

2. コンポーネントでSpearly CMSのコンテンツを使用します：

```astro
---
import { SpearlyClient } from '@mantaroh/spearly-astro/client';

const client = new SpearlyClient({
  apiKey: import.meta.env.SPEARLY_API_KEY,
  projectId: import.meta.env.SPEARLY_PROJECT_ID
});

const content = await client.getContent('your-content-id');
---

<div>
  <h1>{content.title}</h1>
  <div set:html={content.body} />
</div>
```

## 環境変数

以下の環境変数を設定することをお勧めします：

```env
SPEARLY_API_KEY=your-api-key
SPEARLY_PROJECT_ID=your-project-id
```

## API

### SpearlyClient

#### getContent(contentId: string)

特定のコンテンツを取得します。

#### getContents(params?: { page?: number; perPage?: number; filters?: Record<string, any> })

コンテンツのリストを取得します。ページネーションとフィルタリングが可能です。

## ライセンス

MIT 