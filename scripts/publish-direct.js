#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 尝试直接发布到私有npm库...');

// 检查是否在正确的目录
if (!fs.existsSync('package.json')) {
  console.error('❌ 请在项目根目录运行此脚本');
  process.exit(1);
}

// 读取package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

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

// 尝试多种发布方式
const publishMethods = [
  {
    name: 'npm publish with --no-proxy',
    command: 'npm publish --registry=http://123.249.90.239:4873/ --no-proxy'
  },
  {
    name: 'npm publish with --timeout',
    command: 'npm publish --registry=http://123.249.90.239:4873/ --timeout=60000'
  },
  {
    name: 'curl direct upload',
    command: `curl -X PUT http://123.249.90.239:4873/${packageJson.name} -H "Content-Type: application/json" -d '{"name":"${packageJson.name}","version":"${packageJson.version}"}'`
  }
];

for (const method of publishMethods) {
  console.log(`\n🔄 尝试方法: ${method.name}`);
  try {
    execSync(method.command, { stdio: 'inherit' });
    console.log(`✅ ${method.name} 成功!`);
    console.log(`📦 包地址: http://123.249.90.239:4873/package/${packageJson.name}`);
    process.exit(0);
  } catch (error) {
    console.log(`❌ ${method.name} 失败`);
  }
}

console.error('\n❌ 所有发布方法都失败了');
console.log('\n💡 建议解决方案:');
console.log('1. 联系私有npm库管理员检查uplink配置');
console.log('2. 请求临时禁用uplink检查');
console.log('3. 检查网络连接和防火墙设置');
console.log('4. 确认私有npm库服务状态'); 