# 发布指南

## 准备工作

### 1. 修改配置信息

在发布之前，请确保修改以下文件中的信息：

#### package.json
- `name`: 改为你的npm用户名，例如 `@your-username/react-native-webview`
- `author`: 改为你的信息
- `version`: 设置初始版本，例如 `1.0.0`
- `homepage`: 改为你的GitHub仓库地址
- `repository.url`: 改为你的GitHub仓库地址

#### .npmrc
- 确认registry设置正确
- 如果使用私有npm仓库，修改registry地址

### 2. 登录npm

```bash
npm login
```

### 3. 构建项目

```bash
yarn prepare
```

这会执行以下操作：
- 生成TypeScript类型定义文件
- 编译TypeScript代码到lib目录

## 发布步骤

### 方法1: 手动发布

```bash
# 构建并发布
yarn publish

# 或者分步执行
yarn prepare
npm publish
```

### 方法2: 自动版本管理

```bash
# 发布补丁版本 (1.0.0 -> 1.0.1)
yarn publish:patch

# 发布次要版本 (1.0.0 -> 1.1.0)
yarn publish:minor

# 发布主要版本 (1.0.0 -> 2.0.0)
yarn publish:major
```

## 发布后的使用

在你的React Native项目中安装：

```bash
npm install @your-username/react-native-webview
# 或者
yarn add @your-username/react-native-webview
```

## 注意事项

1. **包名唯一性**: 确保包名在npm上是唯一的
2. **作用域包**: 建议使用 `@username/package-name` 格式
3. **版本管理**: 遵循语义化版本控制
4. **测试**: 发布前确保代码能正常工作
5. **文档**: 更新README.md中的安装说明

## 故障排除

### 包名冲突
如果包名已存在，修改package.json中的name字段。

### 权限问题
确保你有发布到该npm包的权限。

### 构建失败
检查TypeScript编译错误，确保所有依赖都正确安装。 