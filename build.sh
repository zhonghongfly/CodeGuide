#!/usr/bin/env sh
rm -rf ./public ./resources .hugo_build.lock
git submodule update --init --recursive
hugo
# 部署到cloudflare后，需要更新algolia索引文件
echo "\\n\033[31mTODO 部署到cloudflare后，需要更新algolia索引文件\033[0m"