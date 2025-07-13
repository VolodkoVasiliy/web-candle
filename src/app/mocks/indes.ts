
export interface IPrice {
    value: number;
    curency: 'zl' | 'usd' | 'eur'
}

export interface IItem {
    id: string;
    imgUrl: string;
    category: string;
    title: string;
    subtitle?: string;
    price: IPrice
}
export const mockShopData: IItem[] = [
    {
        id: '1',
        imgUrl: '/collectionsPage/uniquePage/one.png',
        category: '',
        title: 'Opulent Prism Radiance',
        subtitle: 'saffron and amber',
        price: {
            value: 25,
            curency: 'usd'
        }
    },
    {
        id: '2',
        imgUrl: '/collectionsPage/uniquePage/two.png',
        category: '',
        title: 'ManeMind Manifestation',
        subtitle: 'cedarwood and sandalwood',
        price: {
            value: 25,
            curency: 'usd'
        }
    },
    {
        id: '3',
        imgUrl: '/collectionsPage/uniquePage/three.png',
        category: '',
        title: 'Expectant Goddess',
        subtitle: 'vanilla and warm sandalwood',
        price: {
            value: 25,
            curency: 'usd'
        }
    },
    {
        id: '4',
        imgUrl: '/collectionsPage/uniquePage/four.png',
        category: '',
        title: 'Mindful Maestro',
        subtitle: 'lavender and vanilla',
        price: {
            value: 25,
            curency: 'usd'
        }
    },
    {
        id: '5',
        imgUrl: '/collectionsPage/uniquePage/five.png',
        category: '',
        title: 'Sensual Silhouette',
        subtitle: 'orchids, magnolia and touch of musk',
        price: {
            value: 25,
            curency: 'usd'
        }
    },
    {
        id: '6',
        imgUrl: '/collectionsPage/uniquePage/six.png',
        category: '',
        title: 'Bloomscape Elegance',
        subtitle: 'roses, lavender, and jasmine',
        price: {
            value: 25,
            curency: 'usd'
        }
    }
]