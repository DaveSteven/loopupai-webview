# 私有npm库发布指南

## 配置说明

### 当前配置
- **包名**: `loopupai-webview`
- **私有npm库**: `http://123.249.90.239:4873/`
- **作用域**: `@jiajiaClass`

## 发布步骤

### 1. 登录私有npm库

```bash
# 登录到私有npm库
npm login --registry=http://123.249.90.239:4873/
```

### 2. 构建项目

```bash
# 构建TypeScript代码和类型定义
yarn prepare
```

### 3. 发布包

#### 方法1: 使用发布脚本（推荐）
```bash
yarn publish:script
```

#### 方法2: 手动发布
```bash
# 直接发布
yarn publish

# 或者分步执行
yarn prepare
npm publish
```

#### 方法3: 自动版本管理
```bash
# 发布补丁版本 (1.0.0 -> 1.0.1)
yarn publish:patch

# 发布次要版本 (1.0.0 -> 1.1.0)
yarn publish:minor

# 发布主要版本 (1.0.0 -> 2.0.0)
yarn publish:major
```

## 使用私有包

### 在其他项目中安装

```bash
# 配置私有npm库
npm config set @jiajiaClass:registry http://123.249.90.239:4873/

# 安装包
npm install loopupai-webview
```

### 在package.json中配置

```json
{
  "dependencies": {
    "loopupai-webview": "^1.0.0"
  },
  "publishConfig": {
    "@jiajiaClass:registry": "http://123.249.90.239:4873/"
  }
}
```

## 故障排除

### 登录问题
```bash
# 检查当前登录用户
npm whoami --registry=http://123.249.90.239:4873/

# 重新登录
npm logout --registry=http://123.249.90.239:4873/
npm login --registry=http://123.249.90.239:4873/
```

### 包名冲突
如果包名已存在，修改`package.json`中的`name`字段：
```json
{
  "name": "loopupai-webview-v2"
}
```

### 权限问题
确保你有发布到该私有npm库的权限。

### 网络问题
确保能够访问私有npm库地址：`http://123.249.90.239:4873/`

## 验证发布

### 查看包信息
```bash
npm view loopupai-webview --registry=http://123.249.90.239:4873/
```

### 测试安装
```bash
# 在测试项目中
npm install loopupai-webview --registry=http://123.249.90.239:4873/
```

## 注意事项

1. **registry配置**: 确保`.npmrc`中的registry配置正确
2. **包名唯一性**: 在私有库中确保包名唯一
3. **版本管理**: 遵循语义化版本控制
4. **网络访问**: 确保能访问私有npm库
5. **权限设置**: 确保有发布权限 