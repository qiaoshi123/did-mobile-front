---
name: create-route
description: 创建、修改页面路由配置。当用户提到以下任意场景时必须使用此技能：新建页面路由、注册路由、配置页面路由、修改导航栏样式、配置分包、修改pages.json。触发关键词包括但不限于：路由配置、pages.json、路由注册、导航栏配置、分包配置、路由常量、新增页面路由、修改导航头。只要涉及修改 pages.json 路由配置或 src/constants/routes.ts 路由常量的工作，都应该触发此技能。
allowed-tools: []
disable: false
---

# 创建/修改页面路由配置

## 必须遵循的规范

执行此技能前，**必须先读取以下 Rule 文件**，所有操作须严格遵守：

- `.codebuddy/rules/06-路由规范.mdc` — 路径常量、pages.json 约束、分包策略、tabBar 规范
- `.codebuddy/rules/03-项目结构.mdc` — 页面目录结构、分包目录命名

> 编码规范（TypeScript、命名约定）已作为 always apply rule 自动生效，无需手动读取。

---

## 职责边界

**只管路由配置，不管页面内容。**

| 输出 | 说明 |
|------|------|
| `src/constants/routes.ts` | ✅ 路由路径常量的增删改 |
| `src/pages.json` | ✅ 页面路由配置的增删改（pages 数组、subPackages 数组、preloadRule） |
| 页面目录创建 | ✅ 确保页面目录存在（`src/pages/<name>/` 或 `src/pages-sub/<module>/<name>/`） |
| 页面 .vue 文件 | ❌ 不涉及（由 create-sfc 处理） |
| globalStyle | ⚠️ 除非明确要求，否则不修改全局样式 |

---

## 支持场景

1. **新建页面路由**（高频）— 新页面的路由常量 + pages.json 配置 + 目录创建
2. **修改页面路由配置**（中频）— 更新已有页面的导航栏样式、窗口配置等
3. **删除页面路由**（低频）— 移除废弃页面的路由配置和常量

---

## 场景一：新建页面路由

### 步骤总览

0. **确认路由信息**（必须先做）— 确认主包/分包、页面名称、导航栏配置
1. **新增路由常量** — 在 `src/constants/routes.ts` 中添加
2. **配置 pages.json** — 在对应数组中添加页面路由
3. **确保页面目录存在** — 创建页面目录（不创建 .vue 文件）

### 第 0 步（必须先做）：确认路由信息

> ⚠️ **每次新建页面路由时都必须执行，不可跳过。**

**重名检查（必须执行）：**

读取 `src/pages.json` 和 `src/constants/routes.ts`，检查是否已有同名路由：

| 检查结果 | 处理方式 |
|---------|---------| 
| 路由路径不存在 | 正常继续后续步骤 |
| 路由路径已存在 | **告知用户**："该页面路由已存在"，询问是否需要修改配置 → 转场景二 |

**需确认以下信息（来自 create-proposal 的 Spec）：**

| 信息 | 说明 | 来源 |
|------|------|------|
| 页面名称 | kebab-case | Spec 需求摘要 |
| 页面中文名 | 用于 JSDoc 注释和导航栏标题 | Spec 需求摘要 |
| 主包/分包 | 决定路径前缀和配置位置 | Spec 需求摘要（决策点） |
| 分包模块名 | 仅分包需要，kebab-case | Spec 需求摘要（决策点） |
| 导航栏配置 | 标题文字、字体颜色、背景色、是否自定义导航栏 | Spec 需求摘要 / 设计稿 |
| 是否为 tabBar 页面 | 影响路由跳转方式 | Spec 需求摘要 |

---

### 第 1 步：新增路由常量

在 `src/constants/routes.ts` 中添加路径常量。

**命名规则：**

| 页面位置 | 常量前缀 | 示例 |
|---------|---------|------|
| 主包 | `PAGE_` | `PAGE_LOGIN`、`PAGE_REGISTER` |
| 分包 | `PAGE_SUB_` | `PAGE_SUB_PROFILE`、`PAGE_SUB_SETTINGS` |

**路径值规则：**

| 页面位置 | 路径格式 | 示例 |
|---------|---------|------|
| 主包 | `/pages/<name>/index` | `/pages/login/index` |
| 分包 | `/pages-sub/<module>/<name>/index` | `/pages-sub/user/profile/index` |

> ⚠️ 路径值以 `/` 开头（用于跳转 API 的 url 参数）

**标准写法：**

```typescript
/** 页面中文名 */
export const PAGE_XXX = '/pages/<name>/index'
```

---

### 第 2 步：配置 pages.json

#### 主包页面

在 `pages` 数组中添加配置项：

```json
{
    "path": "pages/<name>/index",
    "style": {
        "navigationBarTitleText": "页面中文名"
    }
}
```

#### 分包页面

在 `subPackages` 数组中对应模块下添加，如果分包模块不存在则新建：

**已有分包模块 — 追加页面：**

```json
{
    "root": "pages-sub/<module>",
    "pages": [
        // ... 已有页面
        {
            "path": "<name>/index",
            "style": {
                "navigationBarTitleText": "页面中文名"
            }
        }
    ]
}
```

**新建分包模块：**

```json
{
    "root": "pages-sub/<module>",
    "pages": [
        {
            "path": "<name>/index",
            "style": {
                "navigationBarTitleText": "页面中文名"
            }
        }
    ]
}
```

#### pages.json 关键约束

| 约束 | 说明 |
|------|------|
| `path` 不以 `/` 开头 | 错误：`/pages/login/index` ✗ ；正确：`pages/login/index` ✓ |
| `path` 不含 `.vue` 后缀 | 错误：`pages/login/index.vue` ✗ |
| `pages` 数组第一项 = 启动页 | 新页面不要插到第一位（除非明确要求更换启动页） |
| `style` 只覆盖差异项 | 与 `globalStyle` 相同的配置不要重复写 |

---

### 第 3 步：确保页面目录存在

| 页面位置 | 目录路径 |
|---------|---------|
| 主包 | `src/pages/<name>/` |
| 分包 | `src/pages-sub/<module>/<name>/` |

> 只创建目录，不创建 `.vue` 文件（由 create-sfc 负责）。
> 如果目录已存在，跳过此步。

---

## 导航栏样式配置参考

### style 属性速查表

| 属性 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `navigationBarTitleText` | string | 导航栏标题文字 | `"注册"` |
| `navigationBarTextStyle` | string | 导航栏标题颜色（仅 `white` / `black`） | `"black"` |
| `navigationBarBackgroundColor` | HexColor | 导航栏背景色 | `"#FFFFFF"` |
| `navigationStyle` | string | 导航栏样式，`default` 或 `custom`（自定义导航栏） | `"custom"` |
| `backgroundColor` | HexColor | 窗口背景色 | `"#F8F8F8"` |
| `backgroundTextStyle` | string | 下拉 loading 样式（仅 `dark` / `light`） | `"dark"` |
| `enablePullDownRefresh` | boolean | 是否开启下拉刷新 | `true` |
| `onReachBottomDistance` | number | 页面上拉触底距离（px） | `50` |
| `disableScroll` | boolean | 是否禁止页面滚动 | `false` |

### 有设计稿时的导航栏配置

当 Spec 中有设计稿或明确的导航栏样式要求时，按照设计稿配置：

```json
{
    "path": "pages/<name>/index",
    "style": {
        "navigationBarTitleText": "页面标题",
        "navigationBarTextStyle": "white",
        "navigationBarBackgroundColor": "#1A1A1A"
    }
}
```

### 无设计稿时的默认配置

当 Spec 中没有设计稿、也没有指定导航栏样式时，仅配置标题文字，其余继承 `globalStyle`：

```json
{
    "path": "pages/<name>/index",
    "style": {
        "navigationBarTitleText": "页面中文名"
    }
}
```

### 自定义导航栏

当 Spec 指定使用自定义导航栏（如页面有特殊头部设计）时：

```json
{
    "path": "pages/<name>/index",
    "style": {
        "navigationStyle": "custom"
    }
}
```

> ⚠️ 自定义导航栏时不需要配置 `navigationBarTitleText` 等属性，由页面自行实现导航栏 UI。

---

## 场景二：修改页面路由配置

### 触发场景

- 第二次迭代有了设计稿，需要更新导航栏样式（字体颜色、背景色等）
- 页面改为自定义导航栏
- 修改页面标题
- 页面从主包移到分包（或反向）
- 开启/关闭下拉刷新等窗口配置

### 执行步骤

1. **读取当前配置** — 读取 `src/pages.json` 中该页面的现有配置
2. **对比差异** — 明确哪些 style 属性需要更新
3. **更新配置** — 修改 pages.json 中对应页面的 style
4. **同步路由常量**（如路径变更）— 更新 `src/constants/routes.ts`

### 特殊情况：主包/分包迁移

如果需要将页面从主包移到分包（或反向）：

1. 从原位置删除路由配置
2. 在新位置添加路由配置
3. 更新路由常量（`PAGE_` ↔ `PAGE_SUB_`）
4. 移动页面目录
5. **提醒用户**：所有引用该路由常量的地方需要检查（可通过全局搜索确认）

---

## 场景三：删除页面路由

### 执行步骤

1. **从 pages.json 中删除**该页面的路由配置
2. **从 routes.ts 中删除**对应的路由常量
3. **检查引用** — 搜索代码库中是否有其他地方引用了该路由常量，如有则告知用户
4. **不自动删除页面文件** — 告知用户可手动删除页面目录

---

## 预下载配置（分包场景）

当新建分包页面时，可根据需要配置预下载规则：

```json
{
    "preloadRule": {
        "pages/index/index": {
            "network": "wifi",
            "packages": ["pages-sub/<module>"]
        }
    }
}
```

**配置原则：**
- 优先 `"network": "wifi"`，避免消耗用户流量
- 在可能跳转到分包页面的入口页配置预下载
- 不主动添加预下载规则，除非 Spec 中明确要求或用户指定

---

## tabBar 页面配置

如果新增的页面是 tabBar 页面，除了常规路由配置外，还需要：

1. 在 `pages.json` 的 `tabBar.list` 中添加配置
2. 准备图标文件（`src/static/icons/<name>.png` 和 `<name>-active.png`，81×81 px）
3. tabBar 页面**必须在主包**，不能放分包

```json
{
    "tabBar": {
        "list": [
            {
                "pagePath": "pages/<name>/index",
                "text": "页面名称",
                "iconPath": "static/icons/<name>.png",
                "selectedIconPath": "static/icons/<name>-active.png"
            }
        ]
    }
}
```

> ⚠️ tabBar 的 `pagePath` 不以 `/` 开头，与 `pages` 数组中的 `path` 保持一致。

---

## 检查清单

### 新建页面路由
- [ ] 已读取 pages.json 和 routes.ts，确认无重名路由
- [ ] 路由常量命名正确：主包 `PAGE_` 前缀 / 分包 `PAGE_SUB_` 前缀，UPPER_SNAKE_CASE
- [ ] 路由常量路径值以 `/` 开头
- [ ] 路由常量有 JSDoc 注释（`/** 页面中文名 */`）
- [ ] pages.json 的 `path` 不以 `/` 开头、不含 `.vue`
- [ ] pages.json 的 `style` 只配置了需要覆盖 `globalStyle` 的属性
- [ ] 新页面没有插入到 `pages` 数组第一位（除非要更换启动页）
- [ ] 有设计稿时按设计稿配置了导航栏样式
- [ ] 无设计稿时仅配置了 `navigationBarTitleText`
- [ ] 分包页面已正确配置 `subPackages` 结构
- [ ] 页面目录已创建（仅目录，不含 .vue 文件）

### 修改页面路由配置
- [ ] 已读取当前配置，确认需要修改的属性
- [ ] 只修改了差异部分，未影响其他配置
- [ ] 如路径变更，已同步更新路由常量

### 删除页面路由
- [ ] 已从 pages.json 中移除路由配置
- [ ] 已从 routes.ts 中移除路由常量
- [ ] 已检查并告知用户引用该常量的代码位置
