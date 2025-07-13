export interface IPathList {
    [key: string]: {
        path: string;
        title?: string;
        subtitle?: string;
    }
}

export const pathList: IPathList = {
    '/collections': {
        path: '/collections',
        title: 'Collections',
        subtitle: 'Explore curated candles that elevate spaces and captivate hearts'
    },
    '/collections/unique': {
        path: '/collections/unique',
        title: 'Our Unique Collection',
        subtitle: 'Transforming Light into Art'
    },
    '/collections/about': {
        path: '/collections/about',
        title: 'The Story Behind Luminous Nature',
        subtitle: 'Where Artistry Meets Illumination'
    },
    '/collections/ingredients': {
        path: '/collections/ingredients',
        title: 'Our Natural Ingredients',
        subtitle: 'Crafting Each Candle: Our Artisanal Process'
    },
    '/collections/contact': {
        path: '/collections/contact',
        title: 'Contact Us',
    },

}