'use client'
import React, { useState, useEffect } from 'react'
import styles from './styles/page.module.scss'
import { Layout, Row, Col, Button } from 'antd'
import { Header, Content, Footer } from 'antd/es/layout/layout'
import Image from 'next/image'
import MyImg from '../public/trip.jpg'
import { fetchCities } from './api/getCities'
import PlannerDialog from './components/PlannerDialog'

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (searchText: string) => {
        if (searchText.length >= 2) {
            const filteredCities = cities.filter(city =>
                city.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 10);

            setOptions(filteredCities.map(city => ({ value: city })));
        } else {
            setOptions([]);
        }
    };

    useEffect(() => {
        const storedCities = localStorage.getItem('cities');
        if (!storedCities) {
            fetchCities().then(() => {
                const updatedCities = localStorage.getItem('cities');
                if (updatedCities) {
                    setCities(JSON.parse(updatedCities));
                }
            });
        } else {
            setCities(JSON.parse(storedCities));
        }
    }, []);

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <h1>
                    Trip Planner
                </h1>
            </Header>

            <Content className={styles.content}>
                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '86vh' }}>
                    <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
                        <h2>
                            Welcome to Trip Planner!<br /> Let's make a plan for you!
                        </h2>
                        <Button onClick={showModal}>
                            Let's Start!
                        </Button>
                    </Col>

                    <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image src={MyImg} alt='Trip Image' width={450} height={450} style={{ border: '3px solid #000', borderRadius: '30% 70% 70% 30% / 40% 60% 40% 60%' }} />
                    </Col>
                </Row>

                <PlannerDialog
                    isModalVisible={isModalVisible}
                    handleOk={handleOk}
                    handleSearch={handleSearch}
                    options={options}
                />
            </Content>

            <Footer className={styles.footer}>
                <p>Copyright © Footer</p>
            </Footer>
        </Layout>
    );
}

export default App;
