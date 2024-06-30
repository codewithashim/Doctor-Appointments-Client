import { useEffect, useState } from 'react';
import { useAppSelector } from "@/Store";
import { useRouter } from 'next/router';

const useAuth = () => {
    const router = useRouter();
    const isLogin = useAppSelector((state) => state.auth.authState);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const hydrationTimeout = setTimeout(() => {
            if (typeof isLogin !== 'undefined') {
                setIsHydrated(true);
                if (!isLogin) {
                    router.push('/auth/login');
                }
            }
        }, 3000);  

        return () => clearTimeout(hydrationTimeout);
    }, [isLogin, router]);

    return { isLogin, isHydrated };
};

export default useAuth;
