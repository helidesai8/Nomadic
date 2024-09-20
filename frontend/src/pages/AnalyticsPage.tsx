// Author: Meer Patel

import Analytics from '../components/analytics/Analytics'
import Header from '../components/ui/Header'
import Footer from './Manger_Dashboard/Footer'

const AnalyticsPage = () => {
    return (
        <div>
            <Header />
            <div style={{ width: "50%", margin: "auto" }}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Analytics />
                <br />
                <br />
            </div>
            <Footer />
        </div>
    )
}

export default AnalyticsPage