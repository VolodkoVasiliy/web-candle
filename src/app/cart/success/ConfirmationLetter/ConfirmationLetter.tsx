import styles from './ConfirmationLetter.module.scss'

export const ConfirmationLetter = ({ orderId, lineItems }: { orderId: string, lineItems: any[] }) => {
    return (
        <div style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
            className={styles.container}>
            <h1>Thank you for your order</h1>
            <p>Order number {orderId}</p>
            {
                lineItems.map(i => {
                    return (
                        <div
                            key={i.id}
                            style={{
                                display: 'flex',
                                width: '90%',
                                justifyContent: 'space-between',
                                borderBottom: '1px solid black'
                            }}>
                            <p>{i.description}</p>
                            <p>{i.quantity}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import type * as React from 'react';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export interface Item {
    title: string;
    price: string;
    imageUrl: string;
}

export interface Props {
    name: string;
    address: string;
    orderId: string;
    items: Item[]
}

export const InnerLightRecieptMail = ({ orderId, name, address, items }: Props) => (
    <Html>
        <Head />
        <Body style={main}>
            <Preview>
                Get your order summary
            </Preview>
            <Container style={container}>
                <Hr style={global.hr} />
                <Section style={message}>
                    <Img
                        src={`https://0rerbrstvxai6udp.public.blob.vercel-storage.com/Glass%20Poetry-sl420Vy7EnOYBgAA6A0cRqSlIPKtVq`}
                        width="66"
                        height="22"
                        alt="InnerLight"
                        style={{ margin: 'auto' }}
                    />
                    <Heading style={global.heading}>It's On Its Way.</Heading>
                    <Text style={global.text}>
                        You order's is on its way.
                    </Text>
                </Section>
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                    <Text style={adressTitle}>Shipping to: {name}</Text>
                    <Text style={{ ...global.text, fontSize: 14 }}>
                        {address}
                    </Text>
                </Section>
                <Hr style={global.hr} />
                <Section
                    style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
                >
                    {items.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Column>
                                    <Img
                                        src={item.imageUrl}
                                        alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                        style={{ float: 'left' }}
                                        width="260px"
                                    />
                                </Column>
                                <Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
                                    <Text style={{ ...paragraph, fontWeight: '500' }}>
                                        {item.title}
                                    </Text>
                                    <Text style={global.text}>{item.price} zl</Text>
                                </Column>
                            </Row>
                        )
                    })}
                </Section>
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                    <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
                        <Column style={{ width: '170px' }}>
                            <Text style={global.paragraphWithBold}>Order Number</Text>
                            <Text style={track.number}>{orderId}</Text>
                        </Column>
                        <Column>
                            <Text style={global.paragraphWithBold}>Order Date</Text>
                            <Text style={track.number}>Sep 22, 2022</Text>
                        </Column>
                    </Row>
                    <Row>
                        <></>
                    </Row>
                </Section>
                {/* <Hr style={global.hr} />
                <Section style={paddingY}>
                    <Row>
                        <Text style={global.heading}>Top Picks For You</Text>
                    </Row>
                    <Row style={recomendations.container}>
                        <Column
                            style={{ ...recomendations.product, paddingLeft: '4px' }}
                            align="center"
                        >
                            <Img
                                src={`${baseUrl}/static/nike-recomendation-1.png`}
                                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                width="100%"
                            />
                            <Text style={recomendations.title}>
                                USWNT 2022/23 Stadium Home
                            </Text>
                            <Text style={recomendations.text}>
                                Women's Nike Dri-FIT Soccer Jersey
                            </Text>
                        </Column>
                        <Column style={recomendations.product} align="center">
                            <Img
                                src={`${baseUrl}/static/nike-recomendation-2.png`}
                                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                width="100%"
                            />
                            <Text style={recomendations.title}>
                                Brazil 2022/23 Stadium Goalkeeper
                            </Text>
                            <Text style={recomendations.text}>
                                Men's Nike Dri-FIT Short-Sleeve Football Shirt
                            </Text>
                        </Column>
                        <Column style={recomendations.product} align="center">
                            <Img
                                src={`${baseUrl}/static/nike-recomendation-4.png`}
                                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                width="100%"
                            />
                            <Text style={recomendations.title}>FFF</Text>
                            <Text style={recomendations.text}>Women's Soccer Jacket</Text>
                        </Column>
                        <Column
                            style={{ ...recomendations.product, paddingRight: '4px' }}
                            align="center"
                        >
                            <Img
                                src={`${baseUrl}/static/nike-recomendation-4.png`}
                                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                                width="100%"
                            />
                            <Text style={recomendations.title}>FFF</Text>
                            <Text style={recomendations.text}>
                                Women's Nike Pre-Match Football Top
                            </Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={menu.container}>
                    <Row>
                        <Text style={menu.title}>Get Help</Text>
                    </Row>
                    <Row style={menu.content}>
                        <Column style={{ width: '33%' }} colSpan={1}>
                            <Link href="https://www.nike.com/" style={menu.text}>
                                Shipping Status
                            </Link>
                        </Column>
                        <Column style={{ width: '33%' }} colSpan={1}>
                            <Link href="https://www.nike.com/" style={menu.text}>
                                Shipping & Delivery
                            </Link>
                        </Column>
                        <Column style={{ width: '33%' }} colSpan={1}>
                            <Link href="https://www.nike.com/" style={menu.text}>
                                Returns & Exchanges
                            </Link>
                        </Column>
                    </Row>
                    <Row style={{ ...menu.content, paddingTop: '0' }}>
                        <Column style={{ width: '33%' }} colSpan={1}>
                            <Link href="https://www.nike.com/" style={menu.text}>
                                How to Return
                            </Link>
                        </Column>
                        <Column style={{ width: '66%' }} colSpan={2}>
                            <Link href="https://www.nike.com/" style={menu.text}>
                                Contact Options
                            </Link>
                        </Column>
                    </Row>
                    <Hr style={global.hr} />
                    <Row style={menu.tel}>
                        <Column>
                            <Row>
                                <Column style={{ width: '16px' }}>
                                    <Img
                                        src={`${baseUrl}/static/nike-phone.png`}
                                        alt="Nike Phone"
                                        width="16px"
                                        height="26px"
                                        style={{ paddingRight: '14px' }}
                                    />
                                </Column>
                                <Column>
                                    <Text style={{ ...menu.text, marginBottom: '0' }}>
                                        1-800-806-6453
                                    </Text>
                                </Column>
                            </Row>
                        </Column>
                        <Column>
                            <Text
                                style={{
                                    ...menu.text,
                                    marginBottom: '0',
                                }}
                            >
                                4 am - 11 pm PT
                            </Text>
                        </Column>
                    </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={paddingY}>
                    <Row>
                        <Text style={global.heading}>Nike.com</Text>
                    </Row>
                    <Row style={categories.container}>
                        <Column align="center">
                            <Link href="https://www.nike.com/" style={categories.text}>
                                Men
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://www.nike.com/" style={categories.text}>
                                Women
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://www.nike.com/" style={categories.text}>
                                Kids
                            </Link>
                        </Column>
                        <Column align="center">
                            <Link href="https://www.nike.com/" style={categories.text}>
                                Customize
                            </Link>
                        </Column>
                    </Row>
                </Section>
                <Hr style={{ ...global.hr, marginTop: '12px' }} />
                <Section style={paddingY}>
                    <Row style={footer.policy}>
                        <Column>
                            <Text style={footer.text}>Web Version</Text>
                        </Column>
                        <Column>
                            <Text style={footer.text}>Privacy Policy</Text>
                        </Column>
                    </Row>
                    <Row>
                        <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                            Please contact us if you have any questions. (If you reply to this
                            email, we won't be able to see it.)
                        </Text>
                    </Row>
                    <Row>
                        <Text style={footer.text}>
                            © 2022 Nike, Inc. All Rights Reserved.
                        </Text>
                    </Row>
                    <Row>
                        <Text style={footer.text}>
                            NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.
                        </Text>
                    </Row>
                </Section> */}
            </Container>
        </Body>
    </Html>
);

const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
};

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
};

const paragraph = {
    margin: '0',
    lineHeight: '2',
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    } as React.CSSProperties,
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '10px auto',
    width: '600px',
    maxWidth: '100%',
    border: '1px solid #E5E5E5',
};

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center',
} as React.CSSProperties;

const adressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
};

const recomendationsText = {
    margin: '0',
    fontSize: '15px',
    lineHeight: '1',
    paddingLeft: '10px',
    paddingRight: '10px',
};

const recomendations = {
    container: {
        padding: '20px 0',
    },
    product: {
        verticalAlign: 'top',
        textAlign: 'left' as const,
        paddingLeft: '2px',
        paddingRight: '2px',
    },
    title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
    text: {
        ...recomendationsText,
        paddingTop: '4px',
        color: '#747474',
    },
};

const menu = {
    container: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        backgroundColor: '#F7F7F7',
    },
    content: {
        ...paddingY,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    title: {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
    },
    text: {
        fontSize: '13.5px',
        marginTop: 0,
        fontWeight: 500,
        color: '#000',
    },
    tel: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '32px',
        paddingBottom: '22px',
    },
};

const categories = {
    container: {
        width: '370px',
        margin: 'auto',
        paddingTop: '12px',
    },
    text: {
        fontWeight: '500',
        color: '#000',
    },
};

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    } as React.CSSProperties,
};
