import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

function ManagemenMissions() {

    return (
        <>
        <Helmet>
            <title>Manage missions - Applications</title>
        </Helmet>
        <PageTitleWrapper>
            <PageHeader />
        </PageTitleWrapper>
        <Footer />
        </>
    )
    
}

export default ManagemenMissions;