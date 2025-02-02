/* global chrome */
import React from 'react';
import { render } from 'react-dom';
import { contentClient } from '../chrome';
import { contentMsgClient } from './postMessage';
import './ContentScripts.scss';
import DrawerDemo from './DrawerDemo';
// import { notification } from 'antd';

export default class ContentScripts {
    constructor() {
        this.container = null;
        this.init();
    }

    injectScript(file, node) {
        const th = document.getElementsByTagName(node)[0];
        const s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        th.appendChild(s);
    }

    init() {
    // 注意，必须设置了run_at=document_start 此段代码才会生效
        document.addEventListener('DOMContentLoaded', () => {
            this.initContainer();
            // this.initMessageClient();
            this.initPostMsgClient();
            this.injectScript(
                chrome.runtime.getURL('js/contentScriptsProxyEthereum.js'),
                'body'
            );
        });
    }

    async initPostMsgClient() {
        console.log('initPostMsgClient');
        await contentMsgClient.listenAndFrowardRequest();
    }

    // 初始化消息通道
    initMessageClient() {
        const { container } = this;

        contentClient.listen('show drawer', () => {
            this.showContainer();
            render(
                <DrawerDemo
                    onClose={() => {
                        this.hideContainer();
                    }}
                />,
                container
            );
        });
    }

    // 初始化外层包裹元素
    initContainer() {
        const { document } = window;
        const base = document.querySelector(
            '#chrome-extension-content-base-element'
        );
        if (base) {
            this.container = base;
        } else {
            this.container = document.createElement('div');
            this.container.setAttribute(
                'id',
                'chrome-extension-content-base-element'
            );
            this.container.setAttribute('class', WRAPPER_CLASS_NAME);
            document.body.appendChild(this.container);
        }
    }

    showContainer() {
        this.container.setAttribute('style', 'display: block');
    }

    hideContainer() {
        this.container.setAttribute('style', 'display: none');
    }
}
