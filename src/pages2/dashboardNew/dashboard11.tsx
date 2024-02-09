import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import HyperDatepicker from '../../components/Datepicker';

import Statistics from '../../pages/dashboard/Dashboard1/Statistics';
import RevenueChart from '../../pages/dashboard/Dashboard1/RevenueChart';
import SalesAnalyticsChart from '../../pages/dashboard/Dashboard1/SalesAnalyticsChart';
import UsersBalances from '../../pages/dashboard/Dashboard1/UsersBalances';
import RevenueHistory from '../../pages/dashboard/Dashboard1/RevenueHistory';

import { balances, revenueHistory } from '../../pages/dashboard/Dashboard1/data';

const Dashboard11 = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    /*
     * handle date change
     */
    const onDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex align-items-center mb-3">
                                <div className="input-group input-group-sm">
                                    <HyperDatepicker
                                        value={selectedDate}
                                        inputClass="border"
                                        onChange={(date) => {
                                            onDateChange(date);
                                        }}
                                    />
                                </div>
                                <button className="btn btn-blue btn-sm ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </button>
                                <button className="btn btn-blue btn-sm ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </button>
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row>

            <Statistics />

            <Row>
                <Col lg={4}>
                    <RevenueChart />
                </Col>
                <Col lg={8}>
                    <SalesAnalyticsChart />
                </Col>
            </Row>

            <Row>
                <Col xl={6}>
                    <UsersBalances balances={balances} />
                </Col>
                <Col xl={6}>
                    <RevenueHistory revenueHistory={revenueHistory} />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard11;
