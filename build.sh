#!/usr/bin/env sh
rm -rf ./public ./resources .hugo_build.lock
git submodule update --init --recursive
hugo
# 部署到cloudflare后，需要更新algolia索引文件
echo "\\n\033[31mTODO 部署到cloudflare后，需要更新algolia索引文件\033[0m"
# 更新百度收录
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://zhonghongfly.com&token=FP68QzTpim52Q60x"
