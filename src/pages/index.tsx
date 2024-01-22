import Head from 'next/head';
import { useEffect } from 'react';

import { FilterDesktop, FilterMobile } from '@/features/Filter';
import { Layout } from '@/shared/components/Layout';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';
import { Events } from '@/widgets/Events';

import cls from './index.module.less';

export default function Home() {
    const { mediaQueryMaxWidth960px } = useQueries();
    const { filterFunctions } = useFilter();
    const { getFilterValues } = filterFunctions;

    const { authorizationFunction } = useAuthorization();
    const { checkAuthorization } = authorizationFunction;

    useEffect(() => {
        async function fetchData() {
            await getFilterValues();
        }

        fetchData();
    }, [getFilterValues]);

    useEffect(() => {
        async function fetchData() {
            await checkAuthorization();
        }

        fetchData();
    }, [checkAuthorization]);

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/logo.png" />
                <title>Eventorro</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={cls.main}>
                {
                    mediaQueryMaxWidth960px ? (
                        <Layout className={cls.mobileApp}>
                            <FilterMobile />
                            <Events />
                        </Layout>
                    ) : (
                        <Layout className={cls.appLayout}>
                            <div className={cls.sidebarContent}>
                                <FilterDesktop />
                            </div>
                            <div className={cls.appContent}>
                                <Events />
                            </div>
                        </Layout>
                    )
                }
            </main>
        </>
    );
}
