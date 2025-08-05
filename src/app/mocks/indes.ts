import { IReview } from "@/components/Review/Review";

export interface IPrice {
    value: number;
    curency: 'zl' | 'usd' | 'eur'
}

export enum Collection {
    LUXORY = 'Luxory',
    ESSENTIALS = 'Essentials'
}

export interface IItem {
    id: string;
    imgUrl: string;
    collection: Collection;
    title: string;
    subtitle?: string;
    price: IPrice;
    size: string;
    burnTime: string;
    scent: string;
    type: string;
}
export const mockShopData: IItem[] = [
    {
        id: '1',
        imgUrl: '/new/collections/pic1.png',
        collection: Collection.LUXORY,
        title: 'Opulent Prism Radiance',
        subtitle: 'saffron and amber',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    },
    {
        id: '2',
        imgUrl: '/new/collections/pic2.png',
        collection: Collection.LUXORY,
        title: 'ManeMind Manifestation',
        subtitle: 'cedarwood and sandalwood',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    },
    {
        id: '3',
        imgUrl: '/new/collections/pic3.png',
        collection: Collection.LUXORY,
        title: 'Expectant Goddess',
        subtitle: 'vanilla and warm sandalwood',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    },
    {
        id: '4',
        imgUrl: '/new/collections/pic1.png',
        collection: Collection.ESSENTIALS,
        title: 'Mindful Maestro',
        subtitle: 'lavender and vanilla',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    },
    {
        id: '5',
        imgUrl: '/new/collections/pic1.png',
        collection: Collection.ESSENTIALS,
        title: 'Sensual Silhouette',
        subtitle: 'orchids, magnolia and touch of musk',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    },
    {
        id: '6',
        imgUrl: '/new/collections/pic1.png',
        collection: Collection.ESSENTIALS,
        title: 'Bloomscape Elegance',
        subtitle: 'roses, lavender, and jasmine',
        price: {
            value: 25,
            curency: 'usd'
        },
        size: '8 cm',
        burnTime: '10 h',
        scent: 'lavender',
        type: 'wax'
    }
]

export const reviews: IReview[] = [
    {
        name: 'Ava Bennett',
        timeStamp: '2 months ago',
        avatar: '/new/reviews/avatar.png',
        stars: 5,
        review: 'These candles are absolutely divine! The scents are so unique and long-lasting. They create such a cozy atmosphere in my home.'
    },
    {
        name: 'Ava Bennett',
        timeStamp: '2 months ago',
        avatar: '/new/reviews/avatar.png',
        stars: 5,
        review: 'These candles are absolutely divine! The scents are so unique and long-lasting. They create such a cozy atmosphere in my home.'
    },
    {
        name: 'Ava Bennett',
        timeStamp: '2 months ago',
        avatar: '/new/reviews/avatar.png',
        stars: 5,
        review: 'These candles are absolutely divine! The scents are so unique and long-lasting. They create such a cozy atmosphere in my home.'
    }
]