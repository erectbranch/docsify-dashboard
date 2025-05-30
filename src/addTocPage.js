/*
 * This file is a modified version of the original work found at:
 * https://github.com/pikapikapikaori/pikapikapi-blog
 *
 * Original Work Copyright (C) 2023-2025 李亦楊
 * Modified Work Copyright (C) 2025 Sungjae Jeon (erectbranch)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
function plugin(hook, vm) {
    const tocMarkup = '<!-- toc -->'

    const tocDiv = '<div class=\'toc-page-div\'></div><div class=\'toc-paginator-div\'><div class=\'tocPaginatorLeftButtonDiv toc-paginator-button-div\'><?xml version="1.0" encoding="UTF-8"?><svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--theme-color,#ea6f5a)"><path d="M15 6l-6 6 6 6" stroke="var(--theme-color,#ea6f5a)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div class=\'toc-paginator-input\'></div><div class=\'tocPaginatorRightButtonDiv toc-paginator-button-div\'><?xml version="1.0" encoding="UTF-8"?><svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--theme-color,#ea6f5a)"><path d="M9 6l6 6-6 6" stroke="var(--theme-color,#ea6f5a)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div>'

    const ignoreTocPageList = ['README', 'PersonalTen', 'PersonalRecords',]

    const prefixes = ['jpg', 'gif', 'png', 'webp', 'jpeg',]

    const recentAmount = 8

    let hasTocs = false

    let sortedPages = []

    let curPageIndex = 1

    let maxPageIndex = 1

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function strToDate(dateStr) {
        if (Number.isNaN(dateStr - '0')) {
            return '&nbsp'
        }

        if (dateStr.length !== 8) {
            return '&nbsp'
        }

        return dateStr.substring(0, 4) + '-' + dateStr.substring(4, 6) + '-' + dateStr.substring(6, 8)
    }

    function renderSidebar() {
        if (hasTocs) {
            document.body.classList.add('force-close')
        }
        else {
            document.body.classList.remove('force-close')
        }
    }

    function imageExists(image_url) {

        var http = new XMLHttpRequest()

        http.open('HEAD', image_url, false)
        http.send()

        return http.status != 404

    }

    function testImgPrefix(imgUrl) {
        var curPrefix = ''
        prefixes.some(prefix => {
            var isExist = imageExists(imgUrl + '.' + prefix)
            if (isExist) {
                curPrefix = prefix
            }
            return isExist
        })

        return curPrefix
    }

    function setDefaultTocs() {
        hasTocs = false
    }

    function renderTocStage1(content, vm) {
        return content.replace(tocMarkup, tocDiv)
    }

    function renderTocContents() {
        pages = Array.from(document.getElementsByClassName('sidebar-nav')[0].getElementsByTagName('a'))
        pages.shift()

        pages = pages.filter(page => {
            var flag = false

            ignoreTocPageList.forEach(singleton => {
                if (page.href.indexOf(singleton) > 0) {
                    flag = true
                }
            })

            return !flag
        })

        pages.sort((a, b) => {
            aDate = a.href.substring(a.href.length - 8)
            bDate = b.href.substring(b.href.length - 8)

            if (Number.isNaN(aDate - '0')) {
                aDate = '-1'
            }

            if (Number.isNaN(bDate - '0')) {
                bDate = '-1'
            }

            return bDate - aDate
        })

        sortedPages = pages

        maxPageIndex = Math.ceil(pages.length / recentAmount)

        renderTocPageUnderPaginator()
    }

    function renderTocPageUnderPaginator() {
        tocPageDiv = document.getElementsByClassName('toc-page-div')[0]
        tocPageDiv.innerHTML = ''

        if (curPageIndex < 1) {
            curPageIndex = 1
        }

        if (curPageIndex > maxPageIndex) {
            curPageIndex = maxPageIndex
        }

        let pages = sortedPages.slice((curPageIndex - 1) * recentAmount, curPageIndex * recentAmount)

        pages.forEach(page => {
            pageHref = page.href
            tmp = pageHref.replace('#/', '')
            // .replace('index.html#/', '')
            // for testing
            pagePictureHref = tmp.substring(0, tmp.lastIndexOf('/')) + '/_media' + tmp.substring(tmp.lastIndexOf('/')) + '/cover-picture'

            // pageImgPrefix = testImgPrefix(pagePictureHref)

            // if (pageImgPrefix === '') {
            //     pagePictureHref = '_media/defaultImg/picture-2.gif'
            // }
            // else {
            //     pagePictureHref += '.' + pageImgPrefix
            // }

            pagePictureHref += '.' + 'jpg'

            pageHrefDiv = '<a class=\'toc-page-display-a\' href=' + pageHref + '><div class=\'toc-page-display-div\'><div class=\'toc-page-display-title-img\'><img class=\'ignore-view-full-image-img\' src=\'' + pagePictureHref + '\' loading=\'lazy\' onerror=\'this.src=\"_media/defaultImg/picture-2.gif\"\'></div><div class=\'toc-page-display-title-div\'>' + page.innerHTML + '</div><div class=\'toc-page-display-date-div\'>' + strToDate(tmp.substr(tmp.length - 8)) + '</div></div></a>'

            tocPageDiv.innerHTML += pageHrefDiv
        })

        tocPaginatorInputDiv = document.getElementsByClassName('toc-paginator-input')
        if (tocPaginatorInputDiv.length > 0) {
            tocPaginatorInputDiv = tocPaginatorInputDiv[0]
            if (tocPaginatorInputDiv.hasChildNodes()) {
                tocPaginatorInputDiv.childNodes[0].value = curPageIndex
            }
        }
        document.scrollingElement.scrollTop = 0
    }

    function renderTocPaginator() {
        tocPaginatorDiv = document.getElementsByClassName('toc-paginator-div')[0]
        tocPaginatorInputDiv = document.getElementsByClassName('toc-paginator-input')[0]
        tocPaginatorLeftButtonDiv = document.getElementsByClassName('tocPaginatorLeftButtonDiv')[0]
        tocPaginatorRightButtonDiv = document.getElementsByClassName('tocPaginatorRightButtonDiv')[0]

        tocPaginatorLeftButtonDiv.onclick = function (e) {
            if (curPageIndex > 1) {
                curPageIndex -= 1
                renderTocPageUnderPaginator()
            }
        }
        tocPaginatorRightButtonDiv.onclick = function (e) {
            if (curPageIndex < maxPageIndex) {
                curPageIndex += 1
                renderTocPageUnderPaginator()
            }
        }

        tocPaginatorInputDiv.innerHTML = '<input class=\'tocPaginatorInputBox\' type=\'number\' value=\'' + curPageIndex + '\' min=\'1\' max=\'' + maxPageIndex + '\'></input><span>/</span><span>' + maxPageIndex + '</span>'

        tocPaginatorInput = tocPaginatorInputDiv.childNodes[0]

        tocPaginatorInput.onchange = function () {
            curPageIndex = this.value

            renderTocPageUnderPaginator()

            this.value = curPageIndex
        }
    }

    hook.beforeEach(function (content) {
        hasTocs = content.includes(tocMarkup)

        if (hasTocs) {
            content = renderTocStage1(content, vm)
        }

        return content
    })

    hook.doneEach(function () {
        if (hasTocs) {
            renderTocContents()
            renderTocPaginator()
        }
        renderSidebar()
        setDefaultTocs()

        // fix auto2top
        document.scrollingElement.scrollTop = 0

        // fix autoHeader
        let path = location.href.split('#')[1]
        // for default title '- ピカピカピ'
        if (path != '/') {
            Array.from(document.getElementsByClassName('sidebar-nav')[0].getElementsByTagName('a')).some(a => {
                if (a.href.split('#')[1] === path) {
                    if (document.title != a.textContent) {
                        document.title = a.textContent
                    }
                    return true
                }
                return false
            })
        }
    })
}

function dashboardPlugin(hook, vm) {
    let jsonVariable;
    let hasSubtitle = false

    const dashboardConfig = vm.config.dashboard || {};
    const numTabContent = dashboardConfig.numTabContent || 3;
    const metadataUrl = dashboardConfig.metadataUrl || "metadata/posts";
    const sortPosts = dashboardConfig.sort || false;
    const dashboardTheme = dashboardConfig.theme || "default";
    const tagboardTheme = dashboardConfig.tagboardTheme || "default";
    const categoryTheme = dashboardConfig.categoryTheme || {};
    const pagination = dashboardConfig.pagination || false;

    const getJson = (fileName) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `${fileName}.json`, false);
        xhttp.send(null);
        return JSON.parse(xhttp.response);
    }

    // time: YYYY.MM.DD or YYYY/MM/DD
    function sortJsonByTime(jsonVariable) {
        jsonVariable.sort((a, b) => {
            let aTime = a.time.replace(/\./g, '/');
            let bTime = b.time.replace(/\./g, '/');

            let aDate = new Date(aTime);
            let bDate = new Date(bTime);

            return bDate - aDate;
        });
        return jsonVariable;
    }

    function testJsonKey(json, key) {
        if (Object.keys(json).indexOf(key) > -1) {
            return true
        }
        return false
    }

    function buildPageFromJson(postMetadata, boardTheme) {
        hasSubtitle = testJsonKey(postMetadata, "subtitle")
        let pageContent = ""

        if (hasSubtitle) {
            var { time, title, subtitle, tag, image, href } = postMetadata;
        } else {
            var { time, title, tag, image, href } = postMetadata;

            if (boardTheme === "list") {
                subtitle = "&nbsp;";
                hasSubtitle = true;
            }
        }

        if (Array.isArray(tag)) {
            tag = tag.join(' ⋅ ');
        }
        
        pageContent += `        <a class="toc-page-display-a" id="${boardTheme}" href="${href}" target="_blank">
            <div class="toc-page-display-div" id="${boardTheme}">
                <div class="toc-page-display-title-img" id="${boardTheme}">
                    <center>
                        <img class="ignore-view-full-image-img" src="${image}">
                    </center>
                </div>
                <div class="toc-page-display-title-div" id="${boardTheme}">
                    ${title}
                </div>`;
        if ( hasSubtitle ) {
            pageContent += `
                <div class="toc-page-display-subtitle-div" id="${boardTheme}">
                    ${subtitle}
                </div>`;
        }
        
        pageContent += `
                <div class="toc-page-display-date-div" id="${boardTheme}">
                    ${time} &nbsp;&nbsp; ${tag}
                </div>
            </div>
        </a>\n`;

        return pageContent
    }

    /* tagPlugin: filterByTag(), filterByHref(), getTagList(), renderTagPage() */
    function filterByTag(tag) {
        return jsonVariable.filter(item => {
            if (!item || !item.tag) return false;
            return item.tag.includes(tag);
        });
    }

    function filterByHref(href) {
        return jsonVariable.filter(item => {
            if (!item || !item.href) return false;
            return item.href.includes(href);
        });
    }

    function getTagList(jsonVariable) {
        const tagList = [];
        jsonVariable.forEach(item => {
            if (typeof item.tag === 'object' && item.tag.length > 0) {
                item.tag.forEach(tag => {
                    if (!tagList.includes(tag)) {
                        tagList.push(tag);
                    }
                });
            } else if (typeof item.tag === 'string' && item.tag.length > 0) {
                if (!tagList.includes(item.tag)) {
                    tagList.push(item.tag);
                }
            }
        });
        return tagList;
    }

    hook.init(() => {
        try {
            jsonVariable = getJson(metadataUrl);
            if (sortPosts) {
                jsonVariable = sortJsonByTime(jsonVariable);
            }
        } catch (e) {
            console.error(`Failed to fetch ${metadataUrl}.json.`, e);
        }
        tagList = getTagList(jsonVariable);
    })

    function renderDashboardContent(metadata, boardTheme) {
        let dashboardContent = "";
        let tabIndex = 1;
        
        for (let i = 0; i < metadata.length; i++) {
            dashboardContent += `\n\n#### **<span id="dashboard-tab">${tabIndex}</span>**\n\n`;
            dashboardContent += `<div class="toc-page-div">\n`;
            for (let j = 0; j < numTabContent; j++) {
                jsonIndex = i * numTabContent + j;
                if (jsonIndex >= metadata.length) {
                    break;
                }
                dashboardContent += buildPageFromJson(metadata[jsonIndex], boardTheme);
            }
            dashboardContent += `</div>\n\n`;
            tabIndex++;

            if ((jsonIndex + 1) >= metadata.length) {
                break;
            }
        }
        return dashboardContent;
    }


    hook.beforeEach((content) => {
        const dashboardReg = /<!--\s*dashboard(.*?) -->/gm;
        const dashboardMatch = content.match(dashboardReg) || [];
        hasDashboard = dashboardMatch.length > 0;      
        
        if (hasDashboard) {
            // e.g., <!-- dashboard:categoryName -->
            return content.replace(dashboardReg, (string, category) => {
                let filteredMetadata = jsonVariable;
                let boardTheme = dashboardTheme;

                if (category && category.trim()) {
                    category = category.replace(/^:/, '');
                    filteredMetadata = jsonVariable.filter(item => item.category && item.category.includes(category.trim()));

                    if (categoryTheme[category]) {
                        boardTheme = categoryTheme[category];
                    }
                }
                return string.replace(string, renderDashboardContent(filteredMetadata, boardTheme));
            });
        }
    });

    function replaceDocsifyTabsTheme(html) {
        if (!hasDashboard) return html;

        let docsifyTabDivClass = 'docsify-tabs docsify-tabs--material docsify-dashboard';

        if (pagination) docsifyTabDivClass += ' pagination';

        const docsifyThemeReg = new RegExp(`<!-- tabs:replace <div class="docsify-tabs (.*?)"> -->`, 'g');
        return html.replace(docsifyThemeReg, `<!-- tabs:replace <div class="${docsifyTabDivClass}"> -->`);
    }

    hook.afterEach(function (html, next) {
        html = replaceDocsifyTabsTheme(html);
        next(html);
    });

    function renderTabPagination(dashboardTabDiv, dashboardIndex) {
        if (!hasDashboard) return;

        const prevButtonId = `prev-tabs-${dashboardIndex}`;
        const nextButtonId = `next-tabs-${dashboardIndex}`;

        const prevButton = `<button class="docsify-tabs__slide-buttons prev-tabs" id="${prevButtonId}"><i class="fa-solid fa-caret-left"></i></button>\n`;
        const nextButton = `<button class="docsify-tabs__slide-buttons next-tabs" id="${nextButtonId}"><i class="fa-solid fa-caret-right"></i></button>\n`;
        dashboardTabDiv.innerHTML = dashboardTabDiv.innerHTML + prevButton + nextButton;

        const dashboardChildElements = dashboardTabDiv.querySelectorAll('*');
        dashboardChildElements.forEach((element) => {
            element.classList.add('pagination');
        });

        const numVisibleTab = window.innerWidth < 768 ? 5 : 10;

        let activeTabIndex = 1;
        let tabStorage = JSON.parse(sessionStorage.getItem(`docsify-tabs.persist.${window.location.pathname}`)) || {};

        if (tabStorage[dashboardIndex]) {
            activeTabIndex = parseInt(tabStorage[dashboardIndex].replace(/^\d+-/, '')) || 1;
        }
        let quotient = (activeTabIndex - 1) / numVisibleTab;
        let firstActiveTabIndex = Math.floor(quotient) * numVisibleTab + 1;

        const dashboardButtonDiv = dashboardTabDiv.querySelectorAll('.docsify-tabs__tab');
        let dashboardLength = dashboardButtonDiv.length;

        for (let i = 0; i < numVisibleTab; i++) {
            if (dashboardButtonDiv[firstActiveTabIndex + i - 1]) {
                dashboardButtonDiv[firstActiveTabIndex + i - 1].classList.add('current-tabs');
            }
        }

        for (let i = 0; i < dashboardLength; i++) {
            dashboardButtonDiv[i].setAttribute('data-tab', `${dashboardIndex}-${dashboardButtonDiv[i].getAttribute('data-tab')}`);
        }

        const nextTabsButton = dashboardTabDiv.querySelector(`#${nextButtonId}`);
        const prevTabsButton = dashboardTabDiv.querySelector(`#${prevButtonId}`);

        if (dashboardLength > firstActiveTabIndex + numVisibleTab) nextTabsButton.style.display = 'block';
        if (firstActiveTabIndex > numVisibleTab) prevTabsButton.style.display = 'block';

        const nextTabSlide = () => {
            const currentTabs = dashboardTabDiv.querySelectorAll('.docsify-tabs__tab.current-tabs');
            const firstTabIndex = parseInt(currentTabs[0].getAttribute('data-tab').replace(/^\d+-/, ''));

            prevTabsButton.style.display = 'block';
            if ((firstTabIndex + numVisibleTab * 2) > dashboardLength) {
                nextTabsButton.style.display = 'none';
            }

            for (let i = 0; i < currentTabs.length; i++) {
                let tabIndex = firstTabIndex + i;
                dashboardButtonDiv[tabIndex - 1].classList.remove('current-tabs');
            }

            for (let i = 0; i < numVisibleTab; i++) {
                let nextTabIndex = firstTabIndex + numVisibleTab + i;
                if (nextTabIndex > dashboardLength) break;
                dashboardButtonDiv[nextTabIndex - 1].classList.add('current-tabs');
            }

            dashboardButtonDiv[firstTabIndex + numVisibleTab - 1].click();
        }

        const prevTabSlide = () => {
            const currentTabs = dashboardTabDiv.querySelectorAll('.docsify-tabs__tab.current-tabs');
            const firstTabIndex = parseInt(currentTabs[0].getAttribute('data-tab').replace(/^\d+-/, ''));

            if (firstTabIndex === 1) return;

            nextTabsButton.style.display = 'block';

            if ((firstTabIndex - numVisibleTab)  === 1) prevTabsButton.style.display = 'none';

            for (let i = 0; i < currentTabs.length; i++) {
                let tabIndex = firstTabIndex + i;
                dashboardButtonDiv[tabIndex - 1].classList.remove('current-tabs');
            }
            
            for (let i = 0; i < numVisibleTab; i++) {
                dashboardButtonDiv[firstTabIndex - numVisibleTab + i - 1].classList.add('current-tabs');
            }

            dashboardButtonDiv[firstTabIndex - numVisibleTab - 1].click();
        }

        const syncActiveTabCurrent = () => {
            const activeTab = dashboardTabDiv.querySelector('.docsify-tabs__tab--active');
            if (!activeTab) return;

            if (!activeTab.classList.contains('current-tabs')) {
                activeTab.classList.add('current-tabs');
            }
        }

        dashboardTabDiv.addEventListener('click', (event) => {
            if (event.target.id === `${nextButtonId}`) {
                nextTabSlide();
                syncActiveTabCurrent();
            } else if (event.target.id === `${prevButtonId}`) {
                prevTabSlide();
                syncActiveTabCurrent();
            }
        });
    }

    function renderTagPage() {
        const path = window.location.href;
        hasTags = path.includes('tags');
        tagPageDiv = document.getElementsByClassName('markdown-section')[0]

        if (!hasTags) {
            return;
        }
        
        var tagName = path.split('?tag=')[1];
        if (tagName.includes('%20')) {
            tagName = tagName.replace(/%20/g, ' ');
        }

        const filteredItems = filterByTag(tagName);

        if (filteredItems && filteredItems.length > 0) {
            let tagBoardContent = `<h1 id="tag-dashboard-title">tag: ${tagName}</h1>\n<hr>`;
            tagBoardContent += `\n<div class="toc-page-div">\n`;
            for (let i = 0; i < filteredItems.length; i++) {
                tagBoardContent += buildPageFromJson(filteredItems[i], tagboardTheme);
            }
            tagBoardContent += `\n</div>\n`;

            tagPageDiv.innerHTML = tagBoardContent + tagPageDiv.innerHTML;
        } else {
            tagBoardContent = `<h1 id="tag-dashboard-title">Tags</h1>\n<hr>`;
            tagBoardContent += `\n${tagList.map(tag => `<a href="#/tags?tag=${tag}" target="_blank">${tag}</a>`).join(' | ')}\n`;
            tagPageDiv.innerHTML = tagBoardContent + tagPageDiv.innerHTML;
        }

        window.addEventListener('hashchange', () => {
            location.reload();
        });
    };

    function renderSidebarTagList() {
        let node = document.querySelector('.sidebar-nav');

        if (node.innerHTML.includes("<!-- tag-list -->")) {
            let tagListContent = `<div class="tag-container"><div class="tag-list">`;
            tagListContent += `${tagList.map(tag => `<a class="tag-element" id="sidebar" href="#/tags?tag=${tag}" target="_blank">${tag}</a>`).join('\n')}`;
            tagListContent += `</div></div>`;

            node.innerHTML = node.innerHTML.replace('<!-- tag-list -->', tagListContent);
        }
    }

    function renderPageTagList() {
        let node = document.querySelector('.markdown-section');
        let pathHref = `#/${window.location.href.split('/#/')[1]}`;

        if (node.innerHTML.includes("<!-- tag-list -->")) {
            const pageMetadata = filterByHref(pathHref)[0];
            if (!pageMetadata) return;

            var tagList = getTagList([pageMetadata]);

            let tagListContent = `<div class="tag-container"><div class="tag-list">`;
            tagListContent += `${tagList.map(tag => `<a class="tag-element" href="#/tags?tag=${tag}" target="_blank">${tag}</a>`).join('\n')}`;
            tagListContent += `</div></div>`;

            node.innerHTML = node.innerHTML.replace('<!-- tag-list -->', tagListContent);
        }
    }

    function setBoardTabIndex(dashboardTabDiv, dashboardIndex) {
        const dashboardTabs = dashboardTabDiv.querySelectorAll('.docsify-tabs__tab');
        dashboardTabs.forEach((tab, index) => {
            tab.setAttribute('data-tab', `${dashboardIndex}-${index + 1}`);
        });
    }

    hook.doneEach(() => {        
        renderTagPage();
        renderSidebarTagList();
        renderPageTagList();

        if (!hasDashboard) return;
        const dashboardTabDivList = document.getElementsByClassName('docsify-dashboard');
        if (dashboardTabDivList.length === 0) return;

        if (pagination) {
            for (let i = 0; i < dashboardTabDivList.length; i++) {
                renderTabPagination(dashboardTabDivList[i], i);
            }
        } else {
            for (let i = 0; i < dashboardTabDivList.length; i++) {
                setBoardTabIndex(dashboardTabDivList[i], i);
            }
        }
    });
};

window.$docsify.plugins = [].concat([plugin, dashboardPlugin], window.$docsify.plugins)