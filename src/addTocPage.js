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

    const getJson = (fileName) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `${fileName}.json`, false);
        xhttp.send(null);
        return JSON.parse(xhttp.response);
    }

    function testJsonKey(json, key) {
        if (Object.keys(json).indexOf(key) > -1) {
            return true
        }
        return false
    }

    function buildPageFromJson(postMetadata) {
        hasSubtitle = testJsonKey(postMetadata, "subtitle")
        let pageContent = ""

        if (hasSubtitle) {
            var { time, title, subtitle, tag, image, href } = jsonVariable[jsonIndex];
        } else {
            var { time, title, tag, image, href } = jsonVariable[jsonIndex];
        }

        if (Array.isArray(tag)) {
            tag = tag.join(' ⋅ ');
        }
        
        pageContent += `<a class="toc-page-display-a" href="${href}" target="_blank">
            <div class="toc-page-display-div">
                <div class="toc-page-display-title-img">
                    <center>
                        <img class="ignore-view-full-image-img" src="${image}">
                    </center>
                </div>
                <div class="toc-page-display-title-div">
                    ${title}
                </div>`;
        if ( hasSubtitle ) {
            pageContent += `
                <div class="toc-page-display-subtitle-div">
                    ${subtitle}
                </div>`;
        }
        
        pageContent += `
                <div class="toc-page-display-date-div">
                    ${time} &nbsp;&nbsp; ${tag}
                </div>
            </div>
        </a>`;

        return pageContent
    }

    hook.init(() => {
        try {
            jsonVariable = getJson(metadataUrl);
        } catch (e) {
            console.error(`Failed to fetch ${metadataUrl}.json.`, e);
        }
    })

    hook.beforeEach((content) => {
        if (content.includes("<!-- dashboard -->")) {
            let dashboardContent = "";
            let tabIndex = 1;
            
            for (let i = 0; i < jsonVariable.length; i++) {
                dashboardContent += `\n\n#### **${tabIndex}**\n\n`;
                dashboardContent += `<div class="toc-page-div">\n`;
                for (let j = 0; j < numTabContent; j++) {
                    jsonIndex = i * numTabContent + j;
                    if (jsonIndex >= jsonVariable.length) {
                        break;
                    }
                    dashboardContent += buildPageFromJson(jsonVariable[jsonIndex])
                }
                dashboardContent += `</div>\n\n`;
                tabIndex++;

                if (jsonIndex >= jsonVariable.length) {
                    break;
                }
            }
            return content.replace(/<!--\s*dashboard\s*-->/gm, dashboardContent);
        }
    });
};

window.$docsify.plugins = [].concat([plugin, dashboardPlugin], window.$docsify.plugins)