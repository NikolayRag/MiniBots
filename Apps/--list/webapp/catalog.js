/* =========================================================
   SVG ICONS
   ========================================================= */

const ICONS = {

    palette: `
        <svg viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0
                     0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0
                     0-10H12z"/>
            <circle cx="7.5" cy="10" r="1"/>
            <circle cx="10" cy="6.5" r="1"/>
            <circle cx="15" cy="6.5" r="1"/>
        </svg>`,

    dropper: `
        <svg viewBox="0 0 24 24">
            <path d="M14 5l5 5"/>
            <path d="M13 6l5 5-8.5 8.5L4 20l.5-5.5L13 6z"/>
            <path d="M4 20l4-1"/>
        </svg>`,

    gradient: `
        <svg viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16"/>
            <circle cx="7" cy="7" r="1"/>
            <circle cx="12" cy="12" r="1"/>
            <circle cx="17" cy="17" r="1"/>
        </svg>`,

    clock: `
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5"/>
            <path d="M12 7v5l3 2"/>
        </svg>`,

    timer: `
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="7"/>
            <path d="M12 6V3M9 3h6"/>
            <path d="M12 13l3-2"/>
        </svg>`,

    stopwatch: `
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="7"/>
            <path d="M12 6V3M10 3h4M17 8l2-2"/>
            <path d="M12 10v3l2 1"/>
        </svg>`,

    text: `
        <svg viewBox="0 0 24 24">
            <path d="M5 5h14M12 5v14M8 19h8"/>
        </svg>`
};
/* =========================================================
   CATALOG
   Весь каталог находится здесь и доступен сразу после загрузки.
   ========================================================= */

const CATALOG = {

    colors: {
        title: 'Цвета',
        icon: ICONS.palette,

        tools: [
            {
                id: 'color-picker',
                name: 'Color Picker',
                description: 'Define color space',
                icon: ICONS.dropper,
                url: 'https://t.me/colorpicker_minibot/colorpicker'
            },
            {
                id: 'gradient',
                name: 'Градиент',
                description: 'Создание градиентов',
                icon: ICONS.gradient,
                url: 'https://example.com/gradient'
            },
            {
                id: 'palette',
                name: 'Палитра',
                description: 'Работа с палитрами',
                icon: ICONS.palette,
                url: 'https://example.com/palette'
            }
        ]
    },

    realtime: {
        title: 'Realtime',
        icon: ICONS.clock,

        tools: [
            {
                id: 'clock',
                name: 'Часы',
                description: 'Текущее время',
                icon: ICONS.clock,
                url: 'https://example.com/clock'
            },
            {
                id: 'timer',
                name: 'Таймер',
                description: 'Обратный отсчёт',
                icon: ICONS.timer,
                url: 'https://example.com/timer'
            },
            {
                id: 'stopwatch',
                name: 'Секундомер',
                description: 'Измерение времени',
                icon: ICONS.stopwatch,
                url: 'https://example.com/stopwatch'
            }
        ]
    },

    text: {
        title: 'Текст',
        icon: ICONS.text,

        tools: [
            {
                id: 'counter',
                name: 'Счётчик',
                description: 'Символы и слова',
                icon: ICONS.text,
                url: 'https://example.com/counter'
            },
            {
                id: 'case',
                name: 'Регистр',
                description: 'Изменение регистра',
                icon: ICONS.text,
                url: 'https://example.com/case'
            }
        ]
    }
};
