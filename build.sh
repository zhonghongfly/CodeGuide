#!/usr/bin/env sh
rm -rf ./public ./resources .hugo_build.lock
git submodule update --init --recursive
hugo