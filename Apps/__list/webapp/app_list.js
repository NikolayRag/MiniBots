//import { CATALOG, ICONS } from './catalog.js';


/* =========================================================
   STATE
   ========================================================= */

const params = new URLSearchParams(location.search);

let currentGroup = params.get('group');
const title = document.getElementById('title');
const content = document.getElementById('content');
const back = document.getElementById('back');


/* =========================================================
   RECENT
   Сейчас заглушка.
   Позже здесь можно сделать fetch() / вызов API.
   ========================================================= */

async function loadRecent(scope) {

    /*
        scope === 'global'
        scope === 'colors'
        scope === 'realtime'
        ...

        Здесь позже:

        return await fetch(...).then(r => r.json());

        Формат:
        [
            {
                id: 'color-picker',
                name: 'Пипетка',
                description: 'Определение цвета',
                icon: ICONS.dropper,
                url: '...'
            }
        ]
    */

    return [];
}


/* =========================================================
   RENDER
   ========================================================= */

async function render() {

    content.innerHTML = '';

    if (currentGroup && CATALOG[currentGroup]) {
        await renderGroup(currentGroup);
    } else {
        currentGroup = null;
        await renderGroups();
    }
}


/* ---------- GROUP LIST ---------- */

async function renderGroups() {

    title.textContent = 'Инструменты';
    back.classList.remove('visible');

    const recent = await loadRecent('global');

    if (recent.length) {
        content.appendChild(
            createSection('Последние', recent, true)
        );
    }

    const groups = Object.entries(CATALOG).map(
        ([id, group]) => ({
            id,
            name: group.title,
            icon: group.icon,
            description: `${group.tools.length} инструментов`,
            action: () => openGroup(id)
        })
    );

    content.appendChild(
        createSection('Группы', groups)
    );
}

/* ---------- TOOL LIST ---------- */

async function renderGroup(groupId) {

    const group = CATALOG[groupId];

    title.textContent = group.title;
    back.classList.add('visible');

    const recent = await loadRecent(groupId);

    if (recent.length) {
        content.appendChild(
            createSection('Последние', recent, true)
        );
    }

    const tools = group.tools.map(tool => ({
        ...tool,
        action: () => openTool(tool)
    }));

    content.appendChild(
        createSection('Инструменты', tools)
    );
}


/* =========================================================
   UI BUILDERS
   ========================================================= */

function createSection(titleText, items, compact = false) {

    const section = document.createElement('section');

    section.className =
        'section' + (compact ? ' recent' : '');

    section.innerHTML = `
        <div class="section-title">${titleText}</div>
        <div class="list"></div>
    `;

    const list = section.querySelector('.list');

    for (const item of items) {
        list.appendChild(createItem(item));
    }

    return section;
}


function createItem(item) {

    const button = document.createElement('button');

    button.className = 'item';

    button.innerHTML = `
        <span class="icon">
            ${item.icon}
        </span>

        <span class="item-content">
            <span class="item-name">
                ${escapeHTML(item.name)}
            </span>

            ${
                item.description
                    ? `<span class="item-description">
                           ${escapeHTML(item.description)}
                       </span>`
                    : ''
            }
        </span>

        <span class="chevron">
            <svg viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6"/>
            </svg>
        </span>
    `;

    button.addEventListener('click', item.action);

    return button;
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function openGroup(groupId) {

    currentGroup = groupId;

    const url = new URL(location.href);

    url.searchParams.set('group', groupId);

    history.pushState({}, '', url);

    render();
}


function openTool(tool) {

    /*
        Пока просто открываем URL инструмента.

        Здесь впоследствии можно заменить на:
        Telegram.WebApp.openTelegramLink(...)
        или другую механику запуска Mini App.
    */

    if (tool.url) {
        Telegram.WebApp.openLink(tool.url);
    }
}


function openGroups() {

    currentGroup = null;

    const url = new URL(location.href);

    url.searchParams.delete('group');

    history.pushState({}, '', url);

    render();
}


back.addEventListener('click', openGroups);


window.addEventListener('popstate', () => {

    currentGroup =
        new URLSearchParams(location.search).get('group');

    render();
});


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}


/* =========================================================
   TELEGRAM
   ========================================================= */

Telegram.WebApp.ready();

/*
    Намеренно НЕ вызываем:

        Telegram.WebApp.expand();

    поэтому Telegram не переводится принудительно
    в полноэкранное состояние.
*/


/* =========================================================
   START
   ========================================================= */

render();
