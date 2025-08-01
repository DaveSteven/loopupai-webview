#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始发布流程...');

// 检查是否在正确的目录
if (!fs.existsSync('package.json')) {
  console.error('❌ 请在项目根目录运行此脚本');
  process.exit(1);
}

// 读取package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 检查包名
if (packageJson.name === 'react-native-webview') {
  console.error('❌ 请先修改package.json中的包名');
  process.exit(1);
}

console.log(`📦 包名: ${packageJson.name}`);
console.log(`📋 版本: ${packageJson.version}`);

// 构建项目
console.log('🔨 构建项目...');
try {
  execSync('yarn prepare', { stdio: 'inherit' });
  console.log('✅ 构建完成');
} catch (error) {
  console.error('❌ 构建失败');
  process.exit(1);
}

// 检查是否已登录npm
console.log('🔐 检查npm登录状态...');
try {
  execSync('npm whoami --registry=http://123.249.90.239:4873/', { stdio: 'pipe' });
  console.log('✅ npm已登录');
} catch (error) {
  console.error('❌ 请先运行 npm login --registry=http://123.249.90.239:4873/');
  process.exit(1);
}

// 发布
console.log('📤 发布到私有npm库...');
try {
  // 使用npm publish，确保使用正确的registry
  execSync('npm publish --registry=http://123.249.90.239:4873/', { stdio: 'inherit' });
  console.log('✅ 发布成功!');
  console.log(`📦 包地址: http://123.249.90.239:4873/package/${packageJson.name}`);
} catch (error) {
  console.error('❌ 发布失败');
  console.log('💡 可能的解决方案:');
  console.log('1. 确保已登录到正确的npm registry');
  console.log('2. 检查包名是否已存在');
  console.log('3. 检查是否有发布权限');
  console.log('4. 检查私有npm库的uplink配置');
  process.exit(1);
} 